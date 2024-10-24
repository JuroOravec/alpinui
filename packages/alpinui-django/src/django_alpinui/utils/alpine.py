import json
from typing import Any, Dict, Generic, Mapping

from django.template import Context, Template
from django_components.component import Component, ArgsType, KwargsType, SlotsType, DataType, JsDataType, CssDataType

from django_alpinui.utils.types import PropMeta


class AlpineComponent(
    Component[ArgsType, KwargsType, SlotsType, DataType, JsDataType, CssDataType],
    Generic[ArgsType, KwargsType, SlotsType, DataType, JsDataType, CssDataType],
):
    def on_render_before(self, context: Context, template: Template) -> None:
        super().on_render_before(context, template)

        kwargs = {**self.input.kwargs}
        attrs = kwargs.pop("attrs", {})

        maybe_inputs = self._get_types()
        if not maybe_inputs:
            raise ValueError(f"Failed to obtain type annotation for AlpineComponent '${self.__class__.__name__}'")

        args_type, kwargs_type, slots_type, data_type, js_data_type, css_data_type = maybe_inputs

        props = gen_alpine_props(kwargs_type, kwargs)

        attrs = {
            **attrs,
            "x-data": self.__class__.__name__,
            "x-props": props,
            "data-x-init": json.dumps({"slots": self.is_filled}),
        }

        context["attrs"] = attrs
        context["self"] = self


def gen_alpine_props(prop_type: Any, kwargs: Mapping) -> str:
    kwargs = {**kwargs}
    js: Dict = kwargs.pop("js", {})
    js = js.copy()

    all_keys = set([*kwargs.keys(), *js.keys()])

    merged = {}
    props_str = ""
    for key in all_keys:
        if key in ("attrs", "spread"):
            continue

        if key in kwargs and key in js:
            raise ValueError(f"Key '{key}' is defined in both kwargs and js")
        elif key in kwargs:
            merged[key] = kwargs[key]
            props_str += f"{key}: {json.dumps(kwargs[key])}, "
        else:
            val = js[key]
            merged["js"] = merged.get("js", {})
            merged["js"][key] = val
            props_str += f"{key}: {val}, "
    
    if "js" in kwargs and "spread" in kwargs["js"]:
        props_str += f'...{kwargs["js"]["spread"]}, '

    props_str = "{" + props_str + "}"

    # Each fields is `NotRequired[Annotated[<actual_type>, PropMeta(required=bool)]]`
    for key, field in prop_type.__annotations__.items():
        prop_meta: PropMeta = field.__args__[0].__metadata__[0]

        if (key not in merged or not merged[key]) and prop_meta.required:
            raise ValueError(f"Required key '{key}' is missing")

    return props_str
