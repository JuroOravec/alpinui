from typing import Any, Dict

from django_components import types, register, EmptyDict, EmptyTuple

from django_alpinui.utils.alpine import AlpineComponent
from django_alpinui.utils.types import Annotated, JS, NotRequired, PropMeta, TypedDict
from django_alpinui.templatetags.alpinui import alpinui_registry


class AOverlaysJsProps(TypedDict):
    is_clickable: NotRequired[JS]
    name: NotRequired[JS]


class AOverlaysProps(TypedDict):
    is_clickable: NotRequired[Annotated[bool, PropMeta(required=True)]]
    name: NotRequired[Annotated[str, PropMeta(required=True)]]

    attrs: Dict
    js: AOverlaysJsProps


@register("_AOverlays", registry=alpinui_registry)
class _AOverlays(AlpineComponent[EmptyTuple, AOverlaysProps, EmptyDict, Any, Any, Any]):
    template: types.django_html = """
        {% load alpinui %}

        {% if is_clickable %}
          <span key="overlay" class="{{ name }}__overlay"></span>
        {% endif %}

        <span key="underlay" class="{{ name }}__underlay"></span>
    """
