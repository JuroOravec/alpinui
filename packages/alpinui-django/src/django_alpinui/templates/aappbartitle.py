from django.template import Context, Template
from django_components import SlotResult, merge_attrs, register

from django_alpinui.gen.alpinui_types import AAppBarTitleAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("AAppBarTitle", registry=alpinui_registry)
class AAppBarTitle(AAppBarTitleAlpineCls):
    def on_render(self, context: Context, template: Template) -> SlotResult:
        attrs = context.get("attrs", {})
        attrs = merge_attrs(attrs, None, {"class": "v-app-bar-title"})

        return VToolbarTitle.render(
            kwargs={
                **self.input.kwargs,
                "attrs": attrs,
            },
            slots=self.input.slots,
            render_dependencies=False,
        )
