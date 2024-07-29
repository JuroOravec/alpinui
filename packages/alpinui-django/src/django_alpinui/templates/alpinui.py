from typing import Any, Dict, Optional

from django_components import component, types

from django_alpinui.templatetags.alpinui import alpine_obj


@component.register("Alpinui")
class Alpinui(component.Component):
    def get_context_data(
        self,
        *args,
        # JS variable or inlined object for AlpinuiOptions
        options: Optional[Any] = None,
        attrs: Optional[Dict] = None,
    ):
        props = alpine_obj({"options": options})
        attrs = {
            **(attrs or {}),
            "x-data": "Alpinui",
            "x-props": props,
        }
        return {
            "attrs": attrs,
        }

    template: types.django_html = """
        <div {% html_attrs attrs %}>
            {% slot "default" default %}{% endslot %}
        </div>
    """
