from typing import Any

from django_components import types, register, EmptyDict, EmptyTuple

from django_alpinui.utils.alpine import AlpineComponent
from django_alpinui.utils.types import Annotated, JS, NotRequired, PropMeta, TypedDict
from django_alpinui.templatetags.alpinui import alpinui_registry


class AIfProps(TypedDict):
    py: NotRequired[Annotated[Any, PropMeta(required=True)]]
    """Python condition which, if truthy, will render the component."""
    js: NotRequired[Annotated[JS, PropMeta(required=True)]]
    """AlpineJS condition which, if truthy, will render the component."""


@register("_AIf", registry=alpinui_registry)
class _AIf(AlpineComponent[EmptyTuple, AIfProps, EmptyDict, Any, Any, Any]):
    template: types.django_html = """
        {% if py %}
          <template x-if="{{ js }}">
            {% slot "if" default / %}
          </template>
          
          {% if self.is_filled.else_js %}
            <template x-if="!({{ js }})">
              {% slot "else_js" default / %}
            </template>
          {% endif %}
        {% else %}
          {% slot "else_py" / %}
        {% endif }
    """
