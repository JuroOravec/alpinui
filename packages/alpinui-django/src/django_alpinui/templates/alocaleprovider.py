from django_components import types, register

from django_alpinui.gen.alpinui_types import ALocaleProviderAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("ALocaleProvider", registry=alpinui_registry)
class ALocaleProvider(ALocaleProviderAlpineCls):
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name="localeprovider" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}

        <div
            {% html_attrs attrs
                class="v-locale-provider"
                x-bind="genAttrs(() => ({
                    class: rootClasses.value,
                    style: rootStyles.value,
                }))"
            %}
        >
            {% _ASlotTarget name="localeprovider" slot="default" id=self.component_id / %}
        </div>
    """
