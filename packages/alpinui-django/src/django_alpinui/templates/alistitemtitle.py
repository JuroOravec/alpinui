from django_alpinui.gen.alpinui_types import AListItemTitleAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

AListItemTitle = create_simple_functional(
    name="AListItemTitle",
    cls=AListItemTitleAlpineCls,
    path=__name__,
    slot_name="list-item-title",
    css_class="v-list-item-title",
    tag="div",
)

alpinui_registry.register("AListItemTitle", AListItemTitle)
