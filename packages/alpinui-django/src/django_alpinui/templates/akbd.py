from django_alpinui.gen.alpinui_types import AKbdAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

AKbd = create_simple_functional(
    name="AKbd",
    cls=AKbdAlpineCls,
    path=__name__,
    slot_name="kbd",
    css_class="v-kbd",
    tag="div",
)

alpinui_registry.register("AKbd", AKbd)
