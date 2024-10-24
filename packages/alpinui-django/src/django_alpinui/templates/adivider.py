from typing import Dict, Optional

from django.template import Context, Template
from django_components import Component, SlotResult, types, register

from django_alpinui.gen.alpinui_types import ADividerAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


class ADividerRuler(Component):
    def get_context_data(self, /, attrs: Optional[Dict] = None) -> Dict:
        return {
            "attrs": attrs,
        }

    template: types.django_html = """
        <hr
            {% html_attrs attrs
                class="v-divider"
                x-bind="genAttrs(hrProps)"
            %}
        />
    """


class ADividerWrapper(Component):
    def get_context_data(self, /, attrs: Optional[Dict] = None) -> Dict:
        return {
            "attrs": attrs,
        }

    template: types.django_html = """
        {% load alpinui %}

        {% _ASlot name="divider" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}

        <div
          {% html_attrs attrs
            class="v-divider__wrapper"
            x-bind="genAttrs(wrapperProps)"
          %}
        >
          {% slot "divider" / %}

          <div class="v-divider__content">
            {% _ASlotTarget name="divider" slot="default" id=self.component_id / %}
          </div>

          {% slot "divider" / %}
        </div>
    """


@register("ADivider", registry=alpinui_registry)
class ADivider(ADividerAlpineCls):
    def on_render(self, context: Context, template: Template) -> SlotResult:
        if not self.input.slots.get("default"):
            return ADividerRuler.render(
                kwargs={"attrs": context["attrs"]},
                slots=self.input.slots,
                render_dependencies=False,
            )
        else:
            return ADividerWrapper.render(
                kwargs={"attrs": context["attrs"]},
                slots=self.input.slots,
                render_dependencies=False,
            )
