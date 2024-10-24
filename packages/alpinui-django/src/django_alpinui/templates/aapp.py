from django_components import types, register

from django_alpinui.gen.alpinui_types import AAppAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("AApp", registry=alpinui_registry)
class AApp(AAppAlpineCls):
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name="app" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}

        {# TODO: DOES THE layoutRef WORK????? #}
        <div
          {% html_attrs attrs
            class="v-application"
            x-bind="genAttrs(() => ({
              ref: layoutRef,
              class: rootClasses.value,
              style: styles.value,
            }))"
          %}
        >
          <div class="v-application__wrap">
            {% _ASlotTarget name="app" slot="default" id=self.component_id / %}
          </div>
        </div>
    """
