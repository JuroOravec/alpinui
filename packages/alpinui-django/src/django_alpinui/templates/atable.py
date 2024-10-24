from django_components import types, register

from django_alpinui.gen.alpinui_types import ATableAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("ATable", registry=alpinui_registry)
class ATable(ATableAlpineCls):
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name="table" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}
        {% _ASlot name="table" slot="top" id=self.component_id data="{}" %}
            {% slot "top" default / %}
        {% /_ASlot %}
        {% _ASlot name="table" slot="bottom" id=self.component_id data="{}" %}
            {% slot "bottom" default / %}
        {% /_ASlot %}
        {% _ASlot name="table" slot="wrapper" id=self.component_id data="{}" %}
            {% slot "wrapper" default / %}
        {% /_ASlot %}

      <{{ tag }}
        {% html_attrs attrs
            class="v-table"
            x-bind="genAttrs(() => ({
              class: rootClasses.value,
              style: rootStyles.value,
            }))"
        %}
      >
        {% _ASlotTarget name="top" slot="default" id=self.component_id / %}
        
        {% if self.is_filled.default %}
          <div
            {% html_attrs
                class="v-table__wrapper"
                x-bind="genAttrs(() => ({
                  style: rootStyles.value,
                }))"
            %}
          >
            <table>
              {% _ASlotTarget name="default" slot="default" id=self.component_id / %}
            </table>
          </div>
        {% else %}
          {% _ASlotTarget name="wrapper" slot="default" id=self.component_id / %}
        {% endif %}

        {% _ASlotTarget name="bottom" slot="default" id=self.component_id / %}
      </{{ tag }}>
    """
