from django.template import Context, Template
from django_components import SlotResult, merge_attrs, register

from django_alpinui.gen.alpinui_types import AAppBarAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("AAppBar", registry=alpinui_registry)
class AAppBar(AAppBarAlpineCls):
    def on_render(self, context: Context, template: Template) -> SlotResult:
        attrs = context.get("attrs", {})
        attrs = merge_attrs(attrs, None, {"class": "v-app-bar"})
        return AToolbar.render(
            kwargs={
                "js:collapse": "isCollapsed.value",
                "js:flat": "isFlat.value",
                "attrs": {
                    **attrs,
                    "ref": "vToolbarRef",
                    "x-bind": """genAttrs(() => ({
                        class: toolbarClasses.value,
                        style: toolbarStyles.value,
                        ...toolbarProps.value,
                    }))""",
                },
            },
            slots=self.input.slots,
            render_dependencies=False,
        )
