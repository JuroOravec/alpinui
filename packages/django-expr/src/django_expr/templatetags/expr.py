from typing import Any, Optional

import django.template
from django.template import Context
from django.utils.safestring import mark_safe

from django_expr.expression import compile_expression


# NOTE: Variable name `register` is required by Django to recognize this as a template tag library
# See https://docs.djangoproject.com/en/dev/howto/custom-template-tags
register = django.template.Library()


@register.filter(name="expr")
def expr_filter(expr_or_value: Any, maybe_expr: Optional[str] = None) -> Any:
    # Case: Expression chained after a value
    # `{{ my_value|expr:"lambda x: <expression>" }}`
    if maybe_expr is not None:
        expr = maybe_expr
        value = expr_or_value
        has_value = True
    # Case: Expression without a value
    # `{{ "<expression>"|expr }}`
    else:
        expr = expr_or_value
        value = None
        has_value = False

    expr_fn = compile_expression(expr)

    # Case `{{ my_value|expr:"lambda x: <expression>" }}`
    # The expr_fn should return a lambda fn, so we pass the
    # value to the lambda fn.
    if has_value:
        lambda_fn = expr_fn({})
        result = lambda_fn(value) if lambda_fn is not None else None
        
    # Case `{{ "<expression>"|expr }}`
    # Pass an empty context.
    else:
        result = expr_fn({})

    return result


@register.simple_tag(name="expr", takes_context=True)
def expr_tag(context: Context, expr: str, safe: bool = False) -> Any:
    expr_fn = compile_expression(expr)
    result = expr_fn(context)
    if safe:
        result = mark_safe(str(result))
    return result
