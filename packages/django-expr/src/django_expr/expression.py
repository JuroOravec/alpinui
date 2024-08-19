import ast
from itertools import chain
from functools import lru_cache
from typing import Any, Callable, Dict, List, Mapping, Set, Type

from django.conf import settings
from django.template import Context


DYNAMIC_EXPR_ALLOWED_NODES: Set[Type[ast.AST]] = {
    # Literals - https://docs.python.org/3/library/ast.html#literals
    ast.Constant,
    ast.FormattedValue,
    ast.FormattedValue,
    ast.List,
    ast.Tuple,
    ast.Set,
    ast.Dict,
    # Variables - https://docs.python.org/3/library/ast.html#variables
    ast.Name,
    # Variable types
    ast.Load,
    ast.Store,
    ast.Del,
    # Variable types END
    ast.Starred,
    # Expressions - https://docs.python.org/3/library/ast.html#expressions
    ast.Expr,
    ast.UnaryOp,
    # Unary Types
    ast.UAdd,
    ast.USub,
    ast.Not,
    ast.Invert,
    # Unary Types END
    ast.BinOp,
    # BinOpTypes
    ast.Add,
    ast.Sub,
    ast.Mult,
    ast.Div,
    ast.FloorDiv,
    ast.Mod,
    ast.Pow,
    ast.LShift,
    ast.RShift,
    ast.BitOr,
    ast.BitXor,
    ast.BitAnd,
    ast.MatMult,
    # BinOpTypes END
    ast.BoolOp,
    # Bool Types
    ast.And,
    ast.Or,
    # Bool Types END
    ast.Compare,
    # Compare Types
    ast.Eq,
    ast.NotEq,
    ast.Lt,
    ast.LtE,
    ast.Gt,
    ast.GtE,
    ast.Is,
    ast.IsNot,
    ast.In,
    ast.NotIn,
    # Compare Types END
    ast.Call,
    ast.keyword,
    ast.IfExp,
    ast.Attribute,
    # ast.NamedExpr -> NOPE, it's an assignment
    ast.Subscript,
    ast.Slice,
    ast.ListComp,
    ast.SetComp,
    ast.GeneratorExp,
    ast.DictComp,
    # Comprehension Types
    ast.comprehension,
    # Comprehension Types END
    ast.Lambda,
    # Function Types
    ast.arguments,
    ast.arg,
    # Function Types END
}


@lru_cache(maxsize=None)
def _get_allowed_nodes(allow_funcs: bool) -> Set[Type[ast.AST]]:
    nodes = DYNAMIC_EXPR_ALLOWED_NODES.copy()
    if not allow_funcs:
        nodes.remove(ast.Call)
    return nodes


def _collect_vars_from_expression(expression: str, allow_func_calls: bool) -> List[str]:
    # Convert expression to AST
    # NOTE: To print out the parsed expressions for debugging, use `ast.dump(expr, indent=2)`, e.g.:
    # `print(ast.dump(ast.parse("(a for a in [1, 2, 3])"), indent=2))`
    statements = ast.parse(expression).body

    # Make sure that it contains only a single expression (single line of code)
    if not len(statements):
        return []
    if len(statements) > 1:
        raise ValueError(f"Invalid expression '{expression}'")

    # And disallow assignments, control flow, etc... allowing only a single expression
    stmt = statements[0]
    if not isinstance(stmt, ast.Expr):
        raise ValueError(f"Invalid expression '{stmt}'")

    # Now, walk down the nodes, and record any variables we come across
    variables: Set[str] = set()

    allowed_nodes = _get_allowed_nodes(allow_func_calls)

    # NOTE: There's an edge case that, when using variables defined within
    # a comprehension or lambdas, then this simple algo cannot distinguish
    # if a variable comes from within the expression (comprehensiono or lambda)
    # or from the context.
    #
    # As a simple solution, if a variable is found as part of ANY comprehension
    # or lambda within the entire expression, we DO NOT take the variable from
    # the context.
    #
    # While this should work fine for 99% of the cases, it's good to be aware of this.
    local_vars: Set[str] = set()
    for node in ast.walk(stmt):
        if node.__class__ not in allowed_nodes:
            raise ValueError(f"Forbidden syntax '{node}'")

        if isinstance(node, ast.Name) and node not in local_vars:
            variables.add(node.id)
        elif isinstance(node, ast.comprehension):
            # Comprehension with a single value, e.g the 'x' in `for x in [1, 2, 3]`
            if isinstance(node.target, ast.Name):
                local_vars.add(node.target.id)
            # Comprehension with multiple items, e.g the 'x, y' in `for x, y in enumerate([1, 2, 3])`
            # In this case `node.target` should be ast.Tuple of ast.Names
            elif isinstance(node.target, ast.Tuple):
                for target in node.target.elts:
                    if not isinstance(target, ast.Name):
                        raise ValueError(f"Received {type(target)} while expected ast.Name")
                    local_vars.add(target.id)
        elif isinstance(node, ast.Lambda):
            # We came across a lambda, e.g. `lambda x, *y, z=None, **w: ...`
            # Collect all places on a function definition that define
            # some variables.
            # See https://docs.python.org/3/library/ast.html#ast.arguments
            all_args = chain(
                node.args.posonlyargs,
                node.args.args,
                node.args.kwonlyargs,
                [node.args.kwarg] if node.args.kwarg else [],
                [node.args.vararg] if node.args.vararg else [],
            )
            for arg in all_args:
                local_vars.add(arg.arg)
            # Lambda regular args a single value, e.g the 'x' in `for x in [1, 2, 3]`

    return [v for v in variables if v not in local_vars]


@lru_cache(maxsize=None)
def _compile_expression(
    expression: str,
    allow_func_calls: bool,
) -> Callable[[Mapping[str, Any]], Any]:
    expression = expression.strip()

    # NOTE: By running through `collect_vars_from_expression`, we also
    # makes sure that the expression is safe to evaluate, because it is
    # confirmed to include only safe syntax.
    expr_vars = _collect_vars_from_expression(expression, allow_func_calls)

    # Construct a function that assigns the variables and evals the expression, e.g.:
    # ```py
    # def eval_expr(ctx):
    #     x = ctx["x"]
    #     a = ctx["a"]
    #     return (a for a in [1, 2, *(1 > 2 and ~x)])
    # ```
    INDENT = "    "
    script = ""

    for expr_var in expr_vars:
        script += f'\n{INDENT}{expr_var} = ctx["{expr_var}"]'
    script = "def eval_expr(ctx):" + script + f"\n{INDENT}return {expression}"

    # Prepare the context
    script_globals: Dict = {}

    # Local scope is where the function will be generated
    script_locals: Dict = {}

    # Executing the script generates the function
    exec(script, script_globals, script_locals)
    eval_expr: Callable[[Context], Any] = script_locals["eval_expr"]

    return eval_expr


def compile_expression(expression: str) -> Callable[[Mapping[str, Any]], Any]:
    allow_func_calls = getattr(settings, "EXPR_ALLOW_FUNC_CALLS", False)
    return _compile_expression(expression, allow_func_calls)
