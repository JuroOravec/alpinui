from typing import Any, Callable, Type, Protocol, Union

from django.template import Context, Template
from django_components.component import Component, SlotResult, ArgsType, KwargsType, SlotsType, DataType, register


class ComponentFn(Protocol):
    def __call__(
        self,
        context: Context,
        *args: Any,
        **kwargs: Any,
    ) -> Union[SlotResult, Template]: ...


def component_func(
    comp_cls: Type[Component[ArgsType, KwargsType, SlotsType, DataType]] = Component
) -> Callable[[ComponentFn], Type[Component[ArgsType, KwargsType, SlotsType, DataType]]]:
    def decorator(fn: ComponentFn) -> Type[Component[ArgsType, KwargsType, SlotsType, DataType]]:
        def get_context_data(self: Component, *args: Any, **kwargs: Any) -> Any:
            self.template = lambda ctx: fn(ctx, *args, **kwargs)

        # See https://stackoverflow.com/a/3915434/9788634
        subclass = type(
            fn.__name__,  # type: ignore[attr-defined]
            (comp_cls, object),
            {"get_context_data": get_context_data}
        )

        return subclass
    
    return decorator


# TODO REMOVE
# TODO2: For this to make sense, there are couple of changes needed:
#        - This component should define the `on_render()` hook, not `get_template()`
#        - Args type defined based on ARGS_ONLY args of the function
#        - Kwargs type defined based on ARG_OR_KWARGS + KWARGS_ONLY args of the function
@register("my_comp")
@component_func()
def my_comp(context: Context, one: int, two: str, three: int = 1) -> Template:
    # NOTE:
    # - IF returns str or SafeString, assume it's rendered
    # - IF returns Template or CachedTemplate, render it with given context

    # VARIANT A: Let the rendering happing in the background
    context["abc"] = one
    return Template("""
        {{ one }}
    """)

    # VARIANT B: Explicit rendering
    context["abc"] = 123
    return Template("""
        {{ one }}
    """).render(context)

