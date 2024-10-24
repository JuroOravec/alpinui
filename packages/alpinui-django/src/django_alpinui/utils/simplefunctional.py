from types import new_class
from typing import Dict, Optional, Type, TypeVar, cast

from django_components import Component, types


TComp = TypeVar("TComp", bound=Type[Component])


def create_simple_functional(
    name: str,
    cls: TComp,
    path: str,
    slot_name: str,
    css_class: str,
    tag: str = "div",
) -> TComp:
    """
    Use this for components that were created with Vuetify's `createSimpleFunctionalVue()`
    """
    def get_context_data(self: Component, /, attrs: Optional[Dict] = None) -> Dict:
        return {
            "attrs": attrs,
            "slot_name": slot_name,
            "css_class": css_class,
            "tag": tag,
        }
    
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name=slot_name slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}

        <{{ tag }}
            {% html_attrs attrs
                class=css_class
                x-bind="genAttrs(() => ({
                    class: classes.value,
                    style: style.value,
                }))"
            %}
        >
            {% _ASlotTarget name=slot_name slot="default" id=self.component_id / %}
        </{{ tag }}>
    """
        
    subcls = new_class(
        name,
        bases=(cls,),
        exec_body=lambda ns: ns.update({
            "get_context_data": get_context_data,
            "template": template,
            "__qualname__": name,
            "__module__": path,
        }),
    )

    return cast(TComp, subcls)
