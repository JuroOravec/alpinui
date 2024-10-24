from typing import Dict, Optional

from django_components import Component, register, types

from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.types import JS


def gen_slot_id(comp_name: str, slot_name: str, id: str) -> str:
    return f"slot-{comp_name}-{slot_name}-{id}"


@register("_ASlot", registry=alpinui_registry)
class _Slot(Component):
    def get_context_data(
        self,
        /,
        name: str,
        slot: str,
        id: str,
        data: JS,
        tag: str = "div",
        attrs: Optional[Dict] = None,
    ) -> Dict:
        slot_id = gen_slot_id(name, slot, id)
        return {
            "attrs": attrs,
            "data": data,
            "slot_id": slot_id,
            "tag": tag,
        }

    template: types.django_html = """
        <template x-teleport="#{{ slot_id }}">
            <{{ tag }} x-data="{ $slot: {{ data }} }" {% html_attrs attrs %}>
                {% slot "default" default / %}
            </{{ tag }}>
        </template>
    """


@register("_ASlotTarget", registry=alpinui_registry)
class _ASlotTarget(Component):
    def get_context_data(
        self,
        /,
        name: str,
        slot: str,
        id: str,
        tag: str = "div",
        attrs: Optional[Dict] = None,
    ) -> Dict:
        slot_id = gen_slot_id(name, slot, id)
        return {
            "attrs": attrs,
            "slot_id": slot_id,
            "tag": tag,
        }

    template: types.django_html = """
        <{{ tag }} id="{{ slot_id }}" {% html_attrs attrs %}>
            {% slot "default" default / %}
        </{{ tag }}>
    """
