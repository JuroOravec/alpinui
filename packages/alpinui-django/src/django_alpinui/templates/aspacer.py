from django_alpinui.gen.alpinui_types import ASpacerAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

ASpacer = create_simple_functional(
    name="ASpacer",
    cls=ASpacerAlpineCls,
    path=__name__,
    slot_name="spacer",
    css_class="v-spacer",
    tag="div",
)

alpinui_registry.register("ASpacer", ASpacer)
