from django_components import types, register

from django_alpinui.gen.alpinui_types import ALabelAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("ALabel", registry=alpinui_registry)
class ALabel(ALabelAlpineCls):
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name="divider" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}

      <label
        {# TODO TEST IF `$props` WORKS #}
        {% html_attrs attrs
            class="v-divider__wrapper"
            x-bind="genAttrs(() => ({
              class: rootClasses,
              style: rootStyles.value,
              '@click': $props.onClick,
            }))"
        %}
      >
        <span x-text="text"></span>

        {% _ASlotTarget name="label" slot="default" id=self.component_id / %}
      </label>
    """
