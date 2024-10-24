from django_alpinui.gen.alpinui_types import APickerTitleAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

APickerTitle = create_simple_functional(
    name="APickerTitle",
    cls=APickerTitleAlpineCls,
    path=__name__,
    slot_name="picker-title",
    css_class="v-picker-title",
    tag="div",
)

alpinui_registry.register("APickerTitle", APickerTitle)
