from django_components import types, register

from django_alpinui.gen.alpinui_types import ANoSsrAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("ANoSsr", registry=alpinui_registry)
class ANoSsr(ANoSsrAlpineCls):
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name="nossr" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}

        {% _AIf py=True js="show" %}
          {% _ASlotTarget name="divider" slot="default" id=self.component_id / %}
        {% /_AIf %}
    """
