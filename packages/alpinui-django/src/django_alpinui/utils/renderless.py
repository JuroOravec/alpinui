from types import new_class
from typing import Type, TypeVar, cast

from django_components import Component, types

TComp = TypeVar("TComp", bound=Type[Component])


def create_simple_renderless(
    name: str,
    cls: TComp,
    path: str,
) -> TComp:
    """
    Use this for components that don't render any HTML by themselves, and only render the default slot.
    Inspired by Vuetify's `createSimpleFunctional()`
    """
    template: types.django_html = """
        {% load alpinui %}
        {% slot "default" default / %}
    """

    subcls = new_class(
        name,
        bases=(cls,),
        exec_body=lambda ns: ns.update({
            "template": template,
            "__qualname__": name,
            "__module__": path,
        }),
    )

    return cast(TComp, subcls)
