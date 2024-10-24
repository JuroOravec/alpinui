from django_alpinui.gen.alpinui_types import AStepperHeaderAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

AStepperHeader = create_simple_functional(
    name="AStepperHeader",
    cls=AStepperHeaderAlpineCls,
    path=__name__,
    slot_name="stepper-header",
    css_class="v-stepper-header",
    tag="div",
)

alpinui_registry.register("AStepperHeader", AStepperHeader)
