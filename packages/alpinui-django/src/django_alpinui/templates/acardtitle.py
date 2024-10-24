from django_alpinui.gen.alpinui_types import ACardTitleAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

ACardTitle = create_simple_functional(
    name="ACardTitle",
    cls=ACardTitleAlpineCls,
    path=__name__,
    slot_name="card-title",
    css_class="v-card-title",
    tag="div",
)

alpinui_registry.register("ACardTitle", ACardTitle)
