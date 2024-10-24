from typing import Any, Dict, List, Union

from django_components import Component, EmptyTuple, SlotContent

from django_alpinui.utils.alpine import AlpineComponent
from django_alpinui.utils.types import Annotated, NotRequired, TypedDict, JS, PropMeta


class AAlertSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    text: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    close: NotRequired[SlotContent]


class AAlertJsProps(TypedDict):
    border: NotRequired[JS]
    border_color: NotRequired[JS]  # Mapped from 'borderColor'
    closable: NotRequired[JS]
    close_icon: NotRequired[JS]  # Mapped from 'closeIcon'
    close_label: NotRequired[JS]  # Mapped from 'closeLabel'
    icon: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    prominent: NotRequired[JS]
    title: NotRequired[JS]
    text: NotRequired[JS]
    type: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AAlertProps(TypedDict):
    border: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    border_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'borderColor'
    closable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    close_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'closeIcon'
    close_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'closeLabel'
    icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    prominent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAlertJsProps, PropMeta(required=False)]]


AAlertCls = Component[EmptyTuple, AAlertProps, AAlertSlots, Any, Any, Any]

AAlertAlpineCls = AlpineComponent[EmptyTuple, AAlertProps, AAlertSlots, Any, Any, Any]


class AAlertTitleSlots(TypedDict):
    default: NotRequired[SlotContent]


class AAlertTitleJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AAlertTitleProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAlertTitleJsProps, PropMeta(required=False)]]


AAlertTitleCls = Component[EmptyTuple, AAlertTitleProps, AAlertTitleSlots, Any, Any, Any]

AAlertTitleAlpineCls = AlpineComponent[EmptyTuple, AAlertTitleProps, AAlertTitleSlots, Any, Any, Any]


class AAppSlots(TypedDict):
    default: NotRequired[SlotContent]


class AAppJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    overlaps: NotRequired[JS]
    full_height: NotRequired[JS]  # Mapped from 'fullHeight'
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AAppProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    overlaps: NotRequired[Annotated[List, PropMeta(required=False)]]
    full_height: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fullHeight'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAppJsProps, PropMeta(required=False)]]


AAppCls = Component[EmptyTuple, AAppProps, AAppSlots, Any, Any, Any]

AAppAlpineCls = AlpineComponent[EmptyTuple, AAppProps, AAppSlots, Any, Any, Any]


class AAppBarSlots(TypedDict):
    default: NotRequired[SlotContent]
    image: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    extension: NotRequired[SlotContent]


class AAppBarJsProps(TypedDict):
    scroll_behavior: NotRequired[JS]  # Mapped from 'scrollBehavior'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    location: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    absolute: NotRequired[JS]
    collapse: NotRequired[JS]
    color: NotRequired[JS]
    density: NotRequired[JS]
    extended: NotRequired[JS]
    extension_height: NotRequired[JS]  # Mapped from 'extensionHeight'
    flat: NotRequired[JS]
    floating: NotRequired[JS]
    height: NotRequired[JS]
    image: NotRequired[JS]
    title: NotRequired[JS]
    border: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    scroll_target: NotRequired[JS]  # Mapped from 'scrollTarget'
    scroll_threshold: NotRequired[JS]  # Mapped from 'scrollThreshold'
    spread: NotRequired[JS]


class AAppBarProps(TypedDict):
    scroll_behavior: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollBehavior'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    collapse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    extended: NotRequired[Annotated[bool, PropMeta(required=False)]]
    extension_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'extensionHeight'
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    floating: NotRequired[Annotated[bool, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    image: NotRequired[Annotated[str, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    scroll_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollTarget'
    scroll_threshold: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'scrollThreshold'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAppBarJsProps, PropMeta(required=False)]]


AAppBarCls = Component[EmptyTuple, AAppBarProps, AAppBarSlots, Any, Any, Any]

AAppBarAlpineCls = AlpineComponent[EmptyTuple, AAppBarProps, AAppBarSlots, Any, Any, Any]


class AAppBarNavIconSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class AAppBarNavIconJsProps(TypedDict):
    active: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    symbol: NotRequired[JS]
    flat: NotRequired[JS]
    icon: NotRequired[JS]
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    block: NotRequired[JS]
    readonly: NotRequired[JS]
    slim: NotRequired[JS]
    stacked: NotRequired[JS]
    ripple: NotRequired[JS]
    text: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    loading: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AAppBarNavIconProps(TypedDict):
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    symbol: NotRequired[Annotated[Any, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    block: NotRequired[Annotated[bool, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    slim: NotRequired[Annotated[bool, PropMeta(required=False)]]
    stacked: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAppBarNavIconJsProps, PropMeta(required=False)]]


AAppBarNavIconCls = Component[EmptyTuple, AAppBarNavIconProps, AAppBarNavIconSlots, Any, Any, Any]

AAppBarNavIconAlpineCls = AlpineComponent[EmptyTuple, AAppBarNavIconProps, AAppBarNavIconSlots, Any, Any, Any]


class AAppBarTitleSlots(TypedDict):
    default: NotRequired[SlotContent]
    text: NotRequired[SlotContent]


class AAppBarTitleJsProps(TypedDict):
    text: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AAppBarTitleProps(TypedDict):
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAppBarTitleJsProps, PropMeta(required=False)]]


AAppBarTitleCls = Component[EmptyTuple, AAppBarTitleProps, AAppBarTitleSlots, Any, Any, Any]

AAppBarTitleAlpineCls = AlpineComponent[EmptyTuple, AAppBarTitleProps, AAppBarTitleSlots, Any, Any, Any]


class AAutocompleteSlots(TypedDict):
    item: NotRequired[SlotContent]
    chip: NotRequired[SlotContent]
    selection: NotRequired[SlotContent]
    prepend_item: NotRequired[SlotContent]  # Mapped from 'prepend-item'
    append_item: NotRequired[SlotContent]  # Mapped from 'append-item'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class AAutocompleteJsProps(TypedDict):
    auto_select_first: NotRequired[JS]  # Mapped from 'autoSelectFirst'
    clear_on_select: NotRequired[JS]  # Mapped from 'clearOnSelect'
    search: NotRequired[JS]
    custom_filter: NotRequired[JS]  # Mapped from 'customFilter'
    custom_key_filter: NotRequired[JS]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[JS]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[JS]  # Mapped from 'filterMode'
    no_filter: NotRequired[JS]  # Mapped from 'noFilter'
    chips: NotRequired[JS]
    closable_chips: NotRequired[JS]  # Mapped from 'closableChips'
    close_text: NotRequired[JS]  # Mapped from 'closeText'
    open_text: NotRequired[JS]  # Mapped from 'openText'
    eager: NotRequired[JS]
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    hide_selected: NotRequired[JS]  # Mapped from 'hideSelected'
    list_props: NotRequired[JS]  # Mapped from 'listProps'
    menu: NotRequired[JS]
    menu_icon: NotRequired[JS]  # Mapped from 'menuIcon'
    menu_props: NotRequired[JS]  # Mapped from 'menuProps'
    multiple: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    open_on_clear: NotRequired[JS]  # Mapped from 'openOnClear'
    item_color: NotRequired[JS]  # Mapped from 'itemColor'
    items: NotRequired[JS]
    item_title: NotRequired[JS]  # Mapped from 'itemTitle'
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_children: NotRequired[JS]  # Mapped from 'itemChildren'
    item_props: NotRequired[JS]  # Mapped from 'itemProps'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    autofocus: NotRequired[JS]
    counter: NotRequired[JS]
    counter_value: NotRequired[JS]  # Mapped from 'counterValue'
    prefix: NotRequired[JS]
    placeholder: NotRequired[JS]
    persistent_placeholder: NotRequired[JS]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[JS]  # Mapped from 'persistentCounter'
    suffix: NotRequired[JS]
    role: NotRequired[JS]
    type: NotRequired[JS]
    model_modifiers: NotRequired[JS]  # Mapped from 'modelModifiers'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    flat: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    transition: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AAutocompleteProps(TypedDict):
    auto_select_first: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'autoSelectFirst'
    clear_on_select: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'clearOnSelect'
    search: NotRequired[Annotated[str, PropMeta(required=False)]]
    custom_key_filter: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'filterMode'
    no_filter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noFilter'
    chips: NotRequired[Annotated[bool, PropMeta(required=False)]]
    closable_chips: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closableChips'
    close_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'closeText'
    open_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'openText'
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    hide_selected: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSelected'
    list_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'listProps'
    menu: NotRequired[Annotated[bool, PropMeta(required=False)]]
    menu_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'menuIcon'
    menu_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'menuProps'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    open_on_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClear'
    item_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemColor'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_title: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemTitle'
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_children: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemChildren'
    item_props: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemProps'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    autofocus: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    counter_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'counterValue'
    prefix: NotRequired[Annotated[str, PropMeta(required=False)]]
    placeholder: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_placeholder: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentCounter'
    suffix: NotRequired[Annotated[str, PropMeta(required=False)]]
    role: NotRequired[Annotated[str, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_modifiers: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'modelModifiers'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAutocompleteJsProps, PropMeta(required=False)]]


AAutocompleteCls = Component[EmptyTuple, AAutocompleteProps, AAutocompleteSlots, Any, Any, Any]

AAutocompleteAlpineCls = AlpineComponent[EmptyTuple, AAutocompleteProps, AAutocompleteSlots, Any, Any, Any]


class AAvatarSlots(TypedDict):
    default: NotRequired[SlotContent]


class AAvatarJsProps(TypedDict):
    start: NotRequired[JS]
    end: NotRequired[JS]
    icon: NotRequired[JS]
    image: NotRequired[JS]
    text: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AAvatarProps(TypedDict):
    start: NotRequired[Annotated[bool, PropMeta(required=False)]]
    end: NotRequired[Annotated[bool, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    image: NotRequired[Annotated[str, PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AAvatarJsProps, PropMeta(required=False)]]


AAvatarCls = Component[EmptyTuple, AAvatarProps, AAvatarSlots, Any, Any, Any]

AAvatarAlpineCls = AlpineComponent[EmptyTuple, AAvatarProps, AAvatarSlots, Any, Any, Any]


class ABadgeSlots(TypedDict):
    default: NotRequired[SlotContent]
    badge: NotRequired[SlotContent]


class ABadgeJsProps(TypedDict):
    bordered: NotRequired[JS]
    color: NotRequired[JS]
    content: NotRequired[JS]
    dot: NotRequired[JS]
    floating: NotRequired[JS]
    icon: NotRequired[JS]
    inline: NotRequired[JS]
    label: NotRequired[JS]
    max: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    offset_x: NotRequired[JS]  # Mapped from 'offsetX'
    offset_y: NotRequired[JS]  # Mapped from 'offsetY'
    text_color: NotRequired[JS]  # Mapped from 'textColor'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    location: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ABadgeProps(TypedDict):
    bordered: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    content: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    dot: NotRequired[Annotated[bool, PropMeta(required=False)]]
    floating: NotRequired[Annotated[bool, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    offset_x: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'offsetX'
    offset_y: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'offsetY'
    text_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'textColor'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABadgeJsProps, PropMeta(required=False)]]


ABadgeCls = Component[EmptyTuple, ABadgeProps, ABadgeSlots, Any, Any, Any]

ABadgeAlpineCls = AlpineComponent[EmptyTuple, ABadgeProps, ABadgeSlots, Any, Any, Any]


class ABannerSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    text: NotRequired[SlotContent]
    actions: NotRequired[SlotContent]


class ABannerJsProps(TypedDict):
    avatar: NotRequired[JS]
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    color: NotRequired[JS]
    icon: NotRequired[JS]
    lines: NotRequired[JS]
    stacked: NotRequired[JS]
    sticky: NotRequired[JS]
    text: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    elevation: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ABannerProps(TypedDict):
    avatar: NotRequired[Annotated[str, PropMeta(required=False)]]
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    lines: NotRequired[Annotated[str, PropMeta(required=False)]]
    stacked: NotRequired[Annotated[bool, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABannerJsProps, PropMeta(required=False)]]


ABannerCls = Component[EmptyTuple, ABannerProps, ABannerSlots, Any, Any, Any]

ABannerAlpineCls = AlpineComponent[EmptyTuple, ABannerProps, ABannerSlots, Any, Any, Any]


class ABannerActionsSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABannerActionsJsProps(TypedDict):
    color: NotRequired[JS]
    density: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ABannerActionsProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABannerActionsJsProps, PropMeta(required=False)]]


ABannerActionsCls = Component[EmptyTuple, ABannerActionsProps, ABannerActionsSlots, Any, Any, Any]

ABannerActionsAlpineCls = AlpineComponent[EmptyTuple, ABannerActionsProps, ABannerActionsSlots, Any, Any, Any]


class ABannerTextSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABannerTextJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ABannerTextProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABannerTextJsProps, PropMeta(required=False)]]


ABannerTextCls = Component[EmptyTuple, ABannerTextProps, ABannerTextSlots, Any, Any, Any]

ABannerTextAlpineCls = AlpineComponent[EmptyTuple, ABannerTextProps, ABannerTextSlots, Any, Any, Any]


class ABarlineSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]


class ABarlineJsProps(TypedDict):
    auto_line_width: NotRequired[JS]  # Mapped from 'autoLineWidth'
    auto_draw: NotRequired[JS]  # Mapped from 'autoDraw'
    auto_draw_duration: NotRequired[JS]  # Mapped from 'autoDrawDuration'
    auto_draw_easing: NotRequired[JS]  # Mapped from 'autoDrawEasing'
    color: NotRequired[JS]
    gradient: NotRequired[JS]
    gradient_direction: NotRequired[JS]  # Mapped from 'gradientDirection'
    height: NotRequired[JS]
    labels: NotRequired[JS]
    label_size: NotRequired[JS]  # Mapped from 'labelSize'
    line_width: NotRequired[JS]  # Mapped from 'lineWidth'
    id: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    min: NotRequired[JS]
    max: NotRequired[JS]
    padding: NotRequired[JS]
    show_labels: NotRequired[JS]  # Mapped from 'showLabels'
    smooth: NotRequired[JS]
    width: NotRequired[JS]
    spread: NotRequired[JS]


class ABarlineProps(TypedDict):
    auto_line_width: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'autoLineWidth'
    auto_draw: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'autoDraw'
    auto_draw_duration: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'autoDrawDuration'
    auto_draw_easing: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'autoDrawEasing'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    gradient: NotRequired[Annotated[List, PropMeta(required=False)]]
    gradient_direction: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'gradientDirection'
    height: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    labels: NotRequired[Annotated[List, PropMeta(required=False)]]
    label_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'labelSize'
    line_width: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'lineWidth'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemValue'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    min: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    padding: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    show_labels: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showLabels'
    smooth: NotRequired[Annotated[bool, PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABarlineJsProps, PropMeta(required=False)]]


ABarlineCls = Component[EmptyTuple, ABarlineProps, ABarlineSlots, Any, Any, Any]

ABarlineAlpineCls = AlpineComponent[EmptyTuple, ABarlineProps, ABarlineSlots, Any, Any, Any]


class ABottomNavigationSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABottomNavigationJsProps(TypedDict):
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    color: NotRequired[JS]
    grow: NotRequired[JS]
    mode: NotRequired[JS]
    height: NotRequired[JS]
    active: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    absolute: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ABottomNavigationProps(TypedDict):
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    grow: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mode: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABottomNavigationJsProps, PropMeta(required=False)]]


ABottomNavigationCls = Component[EmptyTuple, ABottomNavigationProps, ABottomNavigationSlots, Any, Any, Any]

ABottomNavigationAlpineCls = AlpineComponent[EmptyTuple, ABottomNavigationProps, ABottomNavigationSlots, Any, Any, Any]


class ABottomSheetSlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class ABottomSheetJsProps(TypedDict):
    inset: NotRequired[JS]
    fullscreen: NotRequired[JS]
    retain_focus: NotRequired[JS]  # Mapped from 'retainFocus'
    scrollable: NotRequired[JS]
    absolute: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    no_click_animation: NotRequired[JS]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    persistent: NotRequired[JS]
    scrim: NotRequired[JS]
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    location: NotRequired[JS]
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    scroll_strategy: NotRequired[JS]  # Mapped from 'scrollStrategy'
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ABottomSheetProps(TypedDict):
    inset: NotRequired[Annotated[bool, PropMeta(required=False)]]
    fullscreen: NotRequired[Annotated[bool, PropMeta(required=False)]]
    retain_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'retainFocus'
    scrollable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    no_click_animation: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    persistent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    scroll_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollStrategy'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABottomSheetJsProps, PropMeta(required=False)]]


ABottomSheetCls = Component[EmptyTuple, ABottomSheetProps, ABottomSheetSlots, Any, Any, Any]

ABottomSheetAlpineCls = AlpineComponent[EmptyTuple, ABottomSheetProps, ABottomSheetSlots, Any, Any, Any]


class ABreadcrumbsSlots(TypedDict):
    prepend: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    divider: NotRequired[SlotContent]
    item: NotRequired[SlotContent]
    default: NotRequired[SlotContent]


class ABreadcrumbsJsProps(TypedDict):
    active_class: NotRequired[JS]  # Mapped from 'activeClass'
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    divider: NotRequired[JS]
    icon: NotRequired[JS]
    items: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    spread: NotRequired[JS]


class ABreadcrumbsProps(TypedDict):
    active_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeClass'
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    divider: NotRequired[Annotated[str, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABreadcrumbsJsProps, PropMeta(required=False)]]


ABreadcrumbsCls = Component[EmptyTuple, ABreadcrumbsProps, ABreadcrumbsSlots, Any, Any, Any]

ABreadcrumbsAlpineCls = AlpineComponent[EmptyTuple, ABreadcrumbsProps, ABreadcrumbsSlots, Any, Any, Any]


class ABreadcrumbsDividerSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABreadcrumbsDividerJsProps(TypedDict):
    divider: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ABreadcrumbsDividerProps(TypedDict):
    divider: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABreadcrumbsDividerJsProps, PropMeta(required=False)]]


ABreadcrumbsDividerCls = Component[EmptyTuple, ABreadcrumbsDividerProps, ABreadcrumbsDividerSlots, Any, Any, Any]

ABreadcrumbsDividerAlpineCls = AlpineComponent[EmptyTuple, ABreadcrumbsDividerProps, ABreadcrumbsDividerSlots, Any, Any, Any]


class ABreadcrumbsItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABreadcrumbsItemJsProps(TypedDict):
    active: NotRequired[JS]
    active_class: NotRequired[JS]  # Mapped from 'activeClass'
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    title: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    spread: NotRequired[JS]


class ABreadcrumbsItemProps(TypedDict):
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    active_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeClass'
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABreadcrumbsItemJsProps, PropMeta(required=False)]]


ABreadcrumbsItemCls = Component[EmptyTuple, ABreadcrumbsItemProps, ABreadcrumbsItemSlots, Any, Any, Any]

ABreadcrumbsItemAlpineCls = AlpineComponent[EmptyTuple, ABreadcrumbsItemProps, ABreadcrumbsItemSlots, Any, Any, Any]


class ABtnSlots(TypedDict):
    default: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class ABtnJsProps(TypedDict):
    active: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    symbol: NotRequired[JS]
    flat: NotRequired[JS]
    icon: NotRequired[JS]
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    block: NotRequired[JS]
    readonly: NotRequired[JS]
    slim: NotRequired[JS]
    stacked: NotRequired[JS]
    ripple: NotRequired[JS]
    text: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    loading: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class ABtnProps(TypedDict):
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    symbol: NotRequired[Annotated[Any, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    block: NotRequired[Annotated[bool, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    slim: NotRequired[Annotated[bool, PropMeta(required=False)]]
    stacked: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABtnJsProps, PropMeta(required=False)]]


ABtnCls = Component[EmptyTuple, ABtnProps, ABtnSlots, Any, Any, Any]

ABtnAlpineCls = AlpineComponent[EmptyTuple, ABtnProps, ABtnSlots, Any, Any, Any]


class ABtnGroupSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABtnGroupJsProps(TypedDict):
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    divided: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class ABtnGroupProps(TypedDict):
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    divided: NotRequired[Annotated[bool, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABtnGroupJsProps, PropMeta(required=False)]]


ABtnGroupCls = Component[EmptyTuple, ABtnGroupProps, ABtnGroupSlots, Any, Any, Any]

ABtnGroupAlpineCls = AlpineComponent[EmptyTuple, ABtnGroupProps, ABtnGroupSlots, Any, Any, Any]


class ABtnToggleSlots(TypedDict):
    default: NotRequired[SlotContent]


class ABtnToggleJsProps(TypedDict):
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    divided: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    spread: NotRequired[JS]


class ABtnToggleProps(TypedDict):
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    divided: NotRequired[Annotated[bool, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ABtnToggleJsProps, PropMeta(required=False)]]


ABtnToggleCls = Component[EmptyTuple, ABtnToggleProps, ABtnToggleSlots, Any, Any, Any]

ABtnToggleAlpineCls = AlpineComponent[EmptyTuple, ABtnToggleProps, ABtnToggleSlots, Any, Any, Any]


class ACardSlots(TypedDict):
    default: NotRequired[SlotContent]
    actions: NotRequired[SlotContent]
    text: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    image: NotRequired[SlotContent]
    item: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]


class ACardJsProps(TypedDict):
    append_avatar: NotRequired[JS]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    disabled: NotRequired[JS]
    flat: NotRequired[JS]
    hover: NotRequired[JS]
    image: NotRequired[JS]
    link: NotRequired[JS]
    prepend_avatar: NotRequired[JS]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    ripple: NotRequired[JS]
    subtitle: NotRequired[JS]
    text: NotRequired[JS]
    title: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    loading: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class ACardProps(TypedDict):
    append_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    hover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    image: NotRequired[Annotated[str, PropMeta(required=False)]]
    link: NotRequired[Annotated[bool, PropMeta(required=False)]]
    prepend_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    subtitle: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    text: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    title: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACardJsProps, PropMeta(required=False)]]


ACardCls = Component[EmptyTuple, ACardProps, ACardSlots, Any, Any, Any]

ACardAlpineCls = AlpineComponent[EmptyTuple, ACardProps, ACardSlots, Any, Any, Any]


class ACardActionsSlots(TypedDict):
    default: NotRequired[SlotContent]


class ACardActionsJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ACardActionsProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACardActionsJsProps, PropMeta(required=False)]]


ACardActionsCls = Component[EmptyTuple, ACardActionsProps, ACardActionsSlots, Any, Any, Any]

ACardActionsAlpineCls = AlpineComponent[EmptyTuple, ACardActionsProps, ACardActionsSlots, Any, Any, Any]


class ACardItemSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]


class ACardItemJsProps(TypedDict):
    append_avatar: NotRequired[JS]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    prepend_avatar: NotRequired[JS]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    subtitle: NotRequired[JS]
    title: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    spread: NotRequired[JS]


class ACardItemProps(TypedDict):
    append_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    prepend_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    subtitle: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    title: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACardItemJsProps, PropMeta(required=False)]]


ACardItemCls = Component[EmptyTuple, ACardItemProps, ACardItemSlots, Any, Any, Any]

ACardItemAlpineCls = AlpineComponent[EmptyTuple, ACardItemProps, ACardItemSlots, Any, Any, Any]


class ACardSubtitleSlots(TypedDict):
    default: NotRequired[SlotContent]


class ACardSubtitleJsProps(TypedDict):
    opacity: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ACardSubtitleProps(TypedDict):
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACardSubtitleJsProps, PropMeta(required=False)]]


ACardSubtitleCls = Component[EmptyTuple, ACardSubtitleProps, ACardSubtitleSlots, Any, Any, Any]

ACardSubtitleAlpineCls = AlpineComponent[EmptyTuple, ACardSubtitleProps, ACardSubtitleSlots, Any, Any, Any]


class ACardTextSlots(TypedDict):
    default: NotRequired[SlotContent]


class ACardTextJsProps(TypedDict):
    opacity: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ACardTextProps(TypedDict):
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACardTextJsProps, PropMeta(required=False)]]


ACardTextCls = Component[EmptyTuple, ACardTextProps, ACardTextSlots, Any, Any, Any]

ACardTextAlpineCls = AlpineComponent[EmptyTuple, ACardTextProps, ACardTextSlots, Any, Any, Any]


class ACardTitleSlots(TypedDict):
    default: NotRequired[SlotContent]


class ACardTitleJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ACardTitleProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACardTitleJsProps, PropMeta(required=False)]]


ACardTitleCls = Component[EmptyTuple, ACardTitleProps, ACardTitleSlots, Any, Any, Any]

ACardTitleAlpineCls = AlpineComponent[EmptyTuple, ACardTitleProps, ACardTitleSlots, Any, Any, Any]


class ACarouselSlots(TypedDict):
    item: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    additional: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]


class ACarouselJsProps(TypedDict):
    color: NotRequired[JS]
    cycle: NotRequired[JS]
    delimiter_icon: NotRequired[JS]  # Mapped from 'delimiterIcon'
    height: NotRequired[JS]
    hide_delimiters: NotRequired[JS]  # Mapped from 'hideDelimiters'
    hide_delimiter_background: NotRequired[JS]  # Mapped from 'hideDelimiterBackground'
    interval: NotRequired[JS]
    progress: NotRequired[JS]
    vertical_delimiters: NotRequired[JS]  # Mapped from 'verticalDelimiters'
    continuous: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    reverse: NotRequired[JS]
    show_arrows: NotRequired[JS]  # Mapped from 'showArrows'
    touch: NotRequired[JS]
    direction: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    mandatory: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ACarouselProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    cycle: NotRequired[Annotated[bool, PropMeta(required=False)]]
    delimiter_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'delimiterIcon'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    hide_delimiters: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDelimiters'
    hide_delimiter_background: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDelimiterBackground'
    interval: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    progress: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    vertical_delimiters: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'verticalDelimiters'
    continuous: NotRequired[Annotated[bool, PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    show_arrows: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showArrows'
    touch: NotRequired[Annotated[Union[Dict, bool], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACarouselJsProps, PropMeta(required=False)]]


ACarouselCls = Component[EmptyTuple, ACarouselProps, ACarouselSlots, Any, Any, Any]

ACarouselAlpineCls = AlpineComponent[EmptyTuple, ACarouselProps, ACarouselSlots, Any, Any, Any]


class ACarouselControlsSlots(TypedDict):
    item: NotRequired[SlotContent]


class ACarouselControlsJsProps(TypedDict):
    color: NotRequired[JS]
    delimiter_icon: NotRequired[JS]  # Mapped from 'delimiterIcon'
    group: NotRequired[JS]
    hide_delimiters: NotRequired[JS]  # Mapped from 'hideDelimiters'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    progress: NotRequired[JS]
    vertical_delimiters: NotRequired[JS]  # Mapped from 'verticalDelimiters'
    spread: NotRequired[JS]


class ACarouselControlsProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    delimiter_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'delimiterIcon'
    group: NotRequired[Annotated[Dict, PropMeta(required=True)]]
    hide_delimiters: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDelimiters'
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    progress: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    vertical_delimiters: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'verticalDelimiters'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACarouselControlsJsProps, PropMeta(required=False)]]


ACarouselControlsCls = Component[EmptyTuple, ACarouselControlsProps, ACarouselControlsSlots, Any, Any, Any]

ACarouselControlsAlpineCls = AlpineComponent[EmptyTuple, ACarouselControlsProps, ACarouselControlsSlots, Any, Any, Any]


class ACarouselItemSlots(TypedDict):
    default: NotRequired[SlotContent]
    placeholder: NotRequired[SlotContent]
    error: NotRequired[SlotContent]
    sources: NotRequired[SlotContent]


class ACarouselItemJsProps(TypedDict):
    alt: NotRequired[JS]
    cover: NotRequired[JS]
    color: NotRequired[JS]
    draggable: NotRequired[JS]
    eager: NotRequired[JS]
    gradient: NotRequired[JS]
    lazy_src: NotRequired[JS]  # Mapped from 'lazySrc'
    options: NotRequired[JS]
    sizes: NotRequired[JS]
    src: NotRequired[JS]
    crossorigin: NotRequired[JS]
    referrerpolicy: NotRequired[JS]
    srcset: NotRequired[JS]
    position: NotRequired[JS]
    aspect_ratio: NotRequired[JS]  # Mapped from 'aspectRatio'
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    inline: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    reverse_transition: NotRequired[JS]  # Mapped from 'reverseTransition'
    value: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    spread: NotRequired[JS]


class ACarouselItemProps(TypedDict):
    alt: NotRequired[Annotated[str, PropMeta(required=False)]]
    cover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    draggable: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    gradient: NotRequired[Annotated[str, PropMeta(required=False)]]
    lazy_src: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lazySrc'
    options: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    sizes: NotRequired[Annotated[str, PropMeta(required=False)]]
    src: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    crossorigin: NotRequired[Annotated[str, PropMeta(required=False)]]
    referrerpolicy: NotRequired[Annotated[str, PropMeta(required=False)]]
    srcset: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    aspect_ratio: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'aspectRatio'
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    reverse_transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'reverseTransition'
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACarouselItemJsProps, PropMeta(required=False)]]


ACarouselItemCls = Component[EmptyTuple, ACarouselItemProps, ACarouselItemSlots, Any, Any, Any]

ACarouselItemAlpineCls = AlpineComponent[EmptyTuple, ACarouselItemProps, ACarouselItemSlots, Any, Any, Any]


class ACheckboxSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    input: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]


class ACheckboxJsProps(TypedDict):
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    indeterminate: NotRequired[JS]
    indeterminate_icon: NotRequired[JS]  # Mapped from 'indeterminateIcon'
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    true_value: NotRequired[JS]  # Mapped from 'trueValue'
    false_value: NotRequired[JS]  # Mapped from 'falseValue'
    value: NotRequired[JS]
    color: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    multiple: NotRequired[JS]
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    spread: NotRequired[JS]


class ACheckboxProps(TypedDict):
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    indeterminate: NotRequired[Annotated[bool, PropMeta(required=False)]]
    indeterminate_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'indeterminateIcon'
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    true_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'trueValue'
    false_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'falseValue'
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACheckboxJsProps, PropMeta(required=False)]]


ACheckboxCls = Component[EmptyTuple, ACheckboxProps, ACheckboxSlots, Any, Any, Any]

ACheckboxAlpineCls = AlpineComponent[EmptyTuple, ACheckboxProps, ACheckboxSlots, Any, Any, Any]


class ACheckboxBtnSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    input: NotRequired[SlotContent]


class ACheckboxBtnJsProps(TypedDict):
    indeterminate: NotRequired[JS]
    indeterminate_icon: NotRequired[JS]  # Mapped from 'indeterminateIcon'
    label: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    true_value: NotRequired[JS]  # Mapped from 'trueValue'
    false_value: NotRequired[JS]  # Mapped from 'falseValue'
    value: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    error: NotRequired[JS]
    id: NotRequired[JS]
    inline: NotRequired[JS]
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    multiple: NotRequired[JS]
    name: NotRequired[JS]
    readonly: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    density: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ACheckboxBtnProps(TypedDict):
    indeterminate: NotRequired[Annotated[bool, PropMeta(required=False)]]
    indeterminate_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'indeterminateIcon'
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    true_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'trueValue'
    false_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'falseValue'
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACheckboxBtnJsProps, PropMeta(required=False)]]


ACheckboxBtnCls = Component[EmptyTuple, ACheckboxBtnProps, ACheckboxBtnSlots, Any, Any, Any]

ACheckboxBtnAlpineCls = AlpineComponent[EmptyTuple, ACheckboxBtnProps, ACheckboxBtnSlots, Any, Any, Any]


class AChipSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    close: NotRequired[SlotContent]
    filter: NotRequired[SlotContent]


class AChipJsProps(TypedDict):
    active_class: NotRequired[JS]  # Mapped from 'activeClass'
    append_avatar: NotRequired[JS]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    closable: NotRequired[JS]
    close_icon: NotRequired[JS]  # Mapped from 'closeIcon'
    close_label: NotRequired[JS]  # Mapped from 'closeLabel'
    draggable: NotRequired[JS]
    filter: NotRequired[JS]
    filter_icon: NotRequired[JS]  # Mapped from 'filterIcon'
    label: NotRequired[JS]
    link: NotRequired[JS]
    pill: NotRequired[JS]
    prepend_avatar: NotRequired[JS]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    ripple: NotRequired[JS]
    text: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    on_click: NotRequired[JS]  # Mapped from 'onClick'
    on_click_once: NotRequired[JS]  # Mapped from 'onClickOnce'
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    elevation: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AChipProps(TypedDict):
    active_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeClass'
    append_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    closable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    close_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'closeIcon'
    close_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'closeLabel'
    draggable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    filter: NotRequired[Annotated[bool, PropMeta(required=False)]]
    filter_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'filterIcon'
    label: NotRequired[Annotated[bool, PropMeta(required=False)]]
    link: NotRequired[Annotated[bool, PropMeta(required=False)]]
    pill: NotRequired[Annotated[bool, PropMeta(required=False)]]
    prepend_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    on_click: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick'
    on_click_once: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClickOnce'
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AChipJsProps, PropMeta(required=False)]]


AChipCls = Component[EmptyTuple, AChipProps, AChipSlots, Any, Any, Any]

AChipAlpineCls = AlpineComponent[EmptyTuple, AChipProps, AChipSlots, Any, Any, Any]


class AChipGroupSlots(TypedDict):
    default: NotRequired[SlotContent]


class AChipGroupJsProps(TypedDict):
    column: NotRequired[JS]
    filter: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    center_active: NotRequired[JS]  # Mapped from 'centerActive'
    direction: NotRequired[JS]
    symbol: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    show_arrows: NotRequired[JS]  # Mapped from 'showArrows'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AChipGroupProps(TypedDict):
    column: NotRequired[Annotated[bool, PropMeta(required=False)]]
    filter: NotRequired[Annotated[bool, PropMeta(required=False)]]
    center_active: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerActive'
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    symbol: NotRequired[Annotated[Any, PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    show_arrows: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showArrows'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AChipGroupJsProps, PropMeta(required=False)]]


AChipGroupCls = Component[EmptyTuple, AChipGroupProps, AChipGroupSlots, Any, Any, Any]

AChipGroupAlpineCls = AlpineComponent[EmptyTuple, AChipGroupProps, AChipGroupSlots, Any, Any, Any]


class AClassIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class AClassIconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class AClassIconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AClassIconJsProps, PropMeta(required=False)]]


AClassIconCls = Component[EmptyTuple, AClassIconProps, AClassIconSlots, Any, Any, Any]

AClassIconAlpineCls = AlpineComponent[EmptyTuple, AClassIconProps, AClassIconSlots, Any, Any, Any]


class ACodeSlots(TypedDict):
    default: NotRequired[SlotContent]


class ACodeJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ACodeProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACodeJsProps, PropMeta(required=False)]]


ACodeCls = Component[EmptyTuple, ACodeProps, ACodeSlots, Any, Any, Any]

ACodeAlpineCls = AlpineComponent[EmptyTuple, ACodeProps, ACodeSlots, Any, Any, Any]


class AColSlots(TypedDict):
    default: NotRequired[SlotContent]


class AColJsProps(TypedDict):
    cols: NotRequired[JS]
    sm: NotRequired[JS]
    md: NotRequired[JS]
    lg: NotRequired[JS]
    xl: NotRequired[JS]
    xxl: NotRequired[JS]
    offset: NotRequired[JS]
    offset_sm: NotRequired[JS]  # Mapped from 'offsetSm'
    offset_md: NotRequired[JS]  # Mapped from 'offsetMd'
    offset_lg: NotRequired[JS]  # Mapped from 'offsetLg'
    offset_xl: NotRequired[JS]  # Mapped from 'offsetXl'
    offset_xxl: NotRequired[JS]  # Mapped from 'offsetXxl'
    order: NotRequired[JS]
    order_sm: NotRequired[JS]  # Mapped from 'orderSm'
    order_md: NotRequired[JS]  # Mapped from 'orderMd'
    order_lg: NotRequired[JS]  # Mapped from 'orderLg'
    order_xl: NotRequired[JS]  # Mapped from 'orderXl'
    order_xxl: NotRequired[JS]  # Mapped from 'orderXxl'
    align_self: NotRequired[JS]  # Mapped from 'alignSelf'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AColProps(TypedDict):
    cols: NotRequired[Annotated[Union[bool, str, int, float], PropMeta(required=False)]]
    sm: NotRequired[Annotated[Union[bool, str, int, float], PropMeta(required=False)]]
    md: NotRequired[Annotated[Union[bool, str, int, float], PropMeta(required=False)]]
    lg: NotRequired[Annotated[Union[bool, str, int, float], PropMeta(required=False)]]
    xl: NotRequired[Annotated[Union[bool, str, int, float], PropMeta(required=False)]]
    xxl: NotRequired[Annotated[Union[bool, str, int, float], PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    offset_sm: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'offsetSm'
    offset_md: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'offsetMd'
    offset_lg: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'offsetLg'
    offset_xl: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'offsetXl'
    offset_xxl: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'offsetXxl'
    order: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    order_sm: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'orderSm'
    order_md: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'orderMd'
    order_lg: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'orderLg'
    order_xl: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'orderXl'
    order_xxl: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'orderXxl'
    align_self: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignSelf'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AColJsProps, PropMeta(required=False)]]


AColCls = Component[EmptyTuple, AColProps, AColSlots, Any, Any, Any]

AColAlpineCls = AlpineComponent[EmptyTuple, AColProps, AColSlots, Any, Any, Any]


class AColorPickerSlots(TypedDict):
    pass


class AColorPickerJsProps(TypedDict):
    canvas_height: NotRequired[JS]  # Mapped from 'canvasHeight'
    disabled: NotRequired[JS]
    dot_size: NotRequired[JS]  # Mapped from 'dotSize'
    hide_canvas: NotRequired[JS]  # Mapped from 'hideCanvas'
    hide_sliders: NotRequired[JS]  # Mapped from 'hideSliders'
    hide_inputs: NotRequired[JS]  # Mapped from 'hideInputs'
    mode: NotRequired[JS]
    modes: NotRequired[JS]
    show_swatches: NotRequired[JS]  # Mapped from 'showSwatches'
    swatches: NotRequired[JS]
    swatches_max_height: NotRequired[JS]  # Mapped from 'swatchesMaxHeight'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    color: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AColorPickerProps(TypedDict):
    canvas_height: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'canvasHeight'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    dot_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'dotSize'
    hide_canvas: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideCanvas'
    hide_sliders: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSliders'
    hide_inputs: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideInputs'
    mode: NotRequired[Annotated[str, PropMeta(required=False)]]
    modes: NotRequired[Annotated[List, PropMeta(required=False)]]
    show_swatches: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showSwatches'
    swatches: NotRequired[Annotated[List, PropMeta(required=False)]]
    swatches_max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'swatchesMaxHeight'
    model_value: NotRequired[Annotated[Union[Dict, str], PropMeta(required=False)]]  # Mapped from 'modelValue'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AColorPickerJsProps, PropMeta(required=False)]]


AColorPickerCls = Component[EmptyTuple, AColorPickerProps, AColorPickerSlots, Any, Any, Any]

AColorPickerAlpineCls = AlpineComponent[EmptyTuple, AColorPickerProps, AColorPickerSlots, Any, Any, Any]


class AColorPickerCanvasSlots(TypedDict):
    pass


class AColorPickerCanvasJsProps(TypedDict):
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    dot_size: NotRequired[JS]  # Mapped from 'dotSize'
    height: NotRequired[JS]
    width: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AColorPickerCanvasProps(TypedDict):
    color: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    dot_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'dotSize'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AColorPickerCanvasJsProps, PropMeta(required=False)]]


AColorPickerCanvasCls = Component[EmptyTuple, AColorPickerCanvasProps, AColorPickerCanvasSlots, Any, Any, Any]

AColorPickerCanvasAlpineCls = AlpineComponent[EmptyTuple, AColorPickerCanvasProps, AColorPickerCanvasSlots, Any, Any, Any]


class AColorPickerEditSlots(TypedDict):
    pass


class AColorPickerEditJsProps(TypedDict):
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    mode: NotRequired[JS]
    modes: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AColorPickerEditProps(TypedDict):
    color: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mode: NotRequired[Annotated[str, PropMeta(required=False)]]
    modes: NotRequired[Annotated[List, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AColorPickerEditJsProps, PropMeta(required=False)]]


AColorPickerEditCls = Component[EmptyTuple, AColorPickerEditProps, AColorPickerEditSlots, Any, Any, Any]

AColorPickerEditAlpineCls = AlpineComponent[EmptyTuple, AColorPickerEditProps, AColorPickerEditSlots, Any, Any, Any]


class AColorPickerPreviewSlots(TypedDict):
    pass


class AColorPickerPreviewJsProps(TypedDict):
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    hide_alpha: NotRequired[JS]  # Mapped from 'hideAlpha'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AColorPickerPreviewProps(TypedDict):
    color: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    hide_alpha: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideAlpha'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AColorPickerPreviewJsProps, PropMeta(required=False)]]


AColorPickerPreviewCls = Component[EmptyTuple, AColorPickerPreviewProps, AColorPickerPreviewSlots, Any, Any, Any]

AColorPickerPreviewAlpineCls = AlpineComponent[EmptyTuple, AColorPickerPreviewProps, AColorPickerPreviewSlots, Any, Any, Any]


class AColorPickerSwatchesSlots(TypedDict):
    pass


class AColorPickerSwatchesJsProps(TypedDict):
    swatches: NotRequired[JS]
    disabled: NotRequired[JS]
    color: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AColorPickerSwatchesProps(TypedDict):
    swatches: NotRequired[Annotated[List, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AColorPickerSwatchesJsProps, PropMeta(required=False)]]


AColorPickerSwatchesCls = Component[EmptyTuple, AColorPickerSwatchesProps, AColorPickerSwatchesSlots, Any, Any, Any]

AColorPickerSwatchesAlpineCls = AlpineComponent[EmptyTuple, AColorPickerSwatchesProps, AColorPickerSwatchesSlots, Any, Any, Any]


class AComboboxSlots(TypedDict):
    item: NotRequired[SlotContent]
    chip: NotRequired[SlotContent]
    selection: NotRequired[SlotContent]
    prepend_item: NotRequired[SlotContent]  # Mapped from 'prepend-item'
    append_item: NotRequired[SlotContent]  # Mapped from 'append-item'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class AComboboxJsProps(TypedDict):
    auto_select_first: NotRequired[JS]  # Mapped from 'autoSelectFirst'
    clear_on_select: NotRequired[JS]  # Mapped from 'clearOnSelect'
    delimiters: NotRequired[JS]
    custom_filter: NotRequired[JS]  # Mapped from 'customFilter'
    custom_key_filter: NotRequired[JS]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[JS]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[JS]  # Mapped from 'filterMode'
    no_filter: NotRequired[JS]  # Mapped from 'noFilter'
    chips: NotRequired[JS]
    closable_chips: NotRequired[JS]  # Mapped from 'closableChips'
    close_text: NotRequired[JS]  # Mapped from 'closeText'
    open_text: NotRequired[JS]  # Mapped from 'openText'
    eager: NotRequired[JS]
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    hide_selected: NotRequired[JS]  # Mapped from 'hideSelected'
    list_props: NotRequired[JS]  # Mapped from 'listProps'
    menu: NotRequired[JS]
    menu_icon: NotRequired[JS]  # Mapped from 'menuIcon'
    menu_props: NotRequired[JS]  # Mapped from 'menuProps'
    multiple: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    open_on_clear: NotRequired[JS]  # Mapped from 'openOnClear'
    item_color: NotRequired[JS]  # Mapped from 'itemColor'
    items: NotRequired[JS]
    item_title: NotRequired[JS]  # Mapped from 'itemTitle'
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_children: NotRequired[JS]  # Mapped from 'itemChildren'
    item_props: NotRequired[JS]  # Mapped from 'itemProps'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    autofocus: NotRequired[JS]
    counter: NotRequired[JS]
    counter_value: NotRequired[JS]  # Mapped from 'counterValue'
    prefix: NotRequired[JS]
    placeholder: NotRequired[JS]
    persistent_placeholder: NotRequired[JS]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[JS]  # Mapped from 'persistentCounter'
    suffix: NotRequired[JS]
    role: NotRequired[JS]
    type: NotRequired[JS]
    model_modifiers: NotRequired[JS]  # Mapped from 'modelModifiers'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    flat: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    transition: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AComboboxProps(TypedDict):
    auto_select_first: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'autoSelectFirst'
    clear_on_select: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'clearOnSelect'
    delimiters: NotRequired[Annotated[List, PropMeta(required=False)]]
    custom_key_filter: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'filterMode'
    no_filter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noFilter'
    chips: NotRequired[Annotated[bool, PropMeta(required=False)]]
    closable_chips: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closableChips'
    close_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'closeText'
    open_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'openText'
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    hide_selected: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSelected'
    list_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'listProps'
    menu: NotRequired[Annotated[bool, PropMeta(required=False)]]
    menu_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'menuIcon'
    menu_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'menuProps'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    open_on_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClear'
    item_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemColor'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_title: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemTitle'
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_children: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemChildren'
    item_props: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemProps'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    autofocus: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    counter_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'counterValue'
    prefix: NotRequired[Annotated[str, PropMeta(required=False)]]
    placeholder: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_placeholder: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentCounter'
    suffix: NotRequired[Annotated[str, PropMeta(required=False)]]
    role: NotRequired[Annotated[str, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_modifiers: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'modelModifiers'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AComboboxJsProps, PropMeta(required=False)]]


AComboboxCls = Component[EmptyTuple, AComboboxProps, AComboboxSlots, Any, Any, Any]

AComboboxAlpineCls = AlpineComponent[EmptyTuple, AComboboxProps, AComboboxSlots, Any, Any, Any]


class AComponentIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class AComponentIconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class AComponentIconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AComponentIconJsProps, PropMeta(required=False)]]


AComponentIconCls = Component[EmptyTuple, AComponentIconProps, AComponentIconSlots, Any, Any, Any]

AComponentIconAlpineCls = AlpineComponent[EmptyTuple, AComponentIconProps, AComponentIconSlots, Any, Any, Any]


class AConfirmEditSlots(TypedDict):
    default: NotRequired[SlotContent]


class AConfirmEditJsProps(TypedDict):
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    color: NotRequired[JS]
    cancel_text: NotRequired[JS]  # Mapped from 'cancelText'
    ok_text: NotRequired[JS]  # Mapped from 'okText'
    spread: NotRequired[JS]


class AConfirmEditProps(TypedDict):
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    cancel_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'cancelText'
    ok_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'okText'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AConfirmEditJsProps, PropMeta(required=False)]]


AConfirmEditCls = Component[EmptyTuple, AConfirmEditProps, AConfirmEditSlots, Any, Any, Any]

AConfirmEditAlpineCls = AlpineComponent[EmptyTuple, AConfirmEditProps, AConfirmEditSlots, Any, Any, Any]


class AContainerSlots(TypedDict):
    default: NotRequired[SlotContent]


class AContainerJsProps(TypedDict):
    fluid: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AContainerProps(TypedDict):
    fluid: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AContainerJsProps, PropMeta(required=False)]]


AContainerCls = Component[EmptyTuple, AContainerProps, AContainerSlots, Any, Any, Any]

AContainerAlpineCls = AlpineComponent[EmptyTuple, AContainerProps, AContainerSlots, Any, Any, Any]


class ACounterSlots(TypedDict):
    default: NotRequired[SlotContent]


class ACounterJsProps(TypedDict):
    active: NotRequired[JS]
    max: NotRequired[JS]
    value: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ACounterProps(TypedDict):
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ACounterJsProps, PropMeta(required=False)]]


ACounterCls = Component[EmptyTuple, ACounterProps, ACounterSlots, Any, Any, Any]

ACounterAlpineCls = AlpineComponent[EmptyTuple, ACounterProps, ACounterSlots, Any, Any, Any]


class ADataIteratorSlots(TypedDict):
    default: NotRequired[SlotContent]
    header: NotRequired[SlotContent]
    footer: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'


class ADataIteratorJsProps(TypedDict):
    search: NotRequired[JS]
    loading: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    items: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_selectable: NotRequired[JS]  # Mapped from 'itemSelectable'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    show_select: NotRequired[JS]  # Mapped from 'showSelect'
    select_strategy: NotRequired[JS]  # Mapped from 'selectStrategy'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    sort_by: NotRequired[JS]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[JS]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[JS]  # Mapped from 'multiSort'
    must_sort: NotRequired[JS]  # Mapped from 'mustSort'
    page: NotRequired[JS]
    items_per_page: NotRequired[JS]  # Mapped from 'itemsPerPage'
    expand_on_click: NotRequired[JS]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[JS]  # Mapped from 'showExpand'
    expanded: NotRequired[JS]
    group_by: NotRequired[JS]  # Mapped from 'groupBy'
    custom_filter: NotRequired[JS]  # Mapped from 'customFilter'
    custom_key_filter: NotRequired[JS]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[JS]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[JS]  # Mapped from 'filterMode'
    no_filter: NotRequired[JS]  # Mapped from 'noFilter'
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ADataIteratorProps(TypedDict):
    search: NotRequired[Annotated[str, PropMeta(required=False)]]
    loading: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_selectable: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemSelectable'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    show_select: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showSelect'
    select_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'selectStrategy'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    sort_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'multiSort'
    must_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'mustSort'
    page: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    items_per_page: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'itemsPerPage'
    expand_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showExpand'
    expanded: NotRequired[Annotated[List, PropMeta(required=False)]]
    group_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'groupBy'
    custom_key_filter: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'filterMode'
    no_filter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noFilter'
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataIteratorJsProps, PropMeta(required=False)]]


ADataIteratorCls = Component[EmptyTuple, ADataIteratorProps, ADataIteratorSlots, Any, Any, Any]

ADataIteratorAlpineCls = AlpineComponent[EmptyTuple, ADataIteratorProps, ADataIteratorSlots, Any, Any, Any]


class ADataTableSlots(TypedDict):
    default: NotRequired[SlotContent]
    colgroup: NotRequired[SlotContent]
    top: NotRequired[SlotContent]
    body: NotRequired[SlotContent]
    tbody: NotRequired[SlotContent]
    thead: NotRequired[SlotContent]
    tfoot: NotRequired[SlotContent]
    bottom: NotRequired[SlotContent]
    body_prepend: NotRequired[SlotContent]  # Mapped from 'body.prepend'
    body_append: NotRequired[SlotContent]  # Mapped from 'body.append'
    footer_prepend: NotRequired[SlotContent]  # Mapped from 'footer.prepend'
    item: NotRequired[SlotContent]
    loading: NotRequired[SlotContent]
    group_header: NotRequired[SlotContent]  # Mapped from 'group-header'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    expanded_row: NotRequired[SlotContent]  # Mapped from 'expanded-row'
    data_table_group: NotRequired[SlotContent]  # Mapped from 'data-table-group'
    data_table_select: NotRequired[SlotContent]  # Mapped from 'data-table-select'
    item_data_table_select: NotRequired[SlotContent]  # Mapped from 'item.data-table-select'
    item_data_table_expand: NotRequired[SlotContent]  # Mapped from 'item.data-table-expand'
    header_data_table_select: NotRequired[SlotContent]  # Mapped from 'header.data-table-select'
    header_data_table_expand: NotRequired[SlotContent]  # Mapped from 'header.data-table-expand'
    headers: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    # header_<name>: NotRequired[SlotContent]  # Mapped from 'header.<name>' # TODO
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO


class ADataTableJsProps(TypedDict):
    page: NotRequired[JS]
    items_per_page: NotRequired[JS]  # Mapped from 'itemsPerPage'
    loading: NotRequired[JS]
    loading_text: NotRequired[JS]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    items: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    row_props: NotRequired[JS]  # Mapped from 'rowProps'
    cell_props: NotRequired[JS]  # Mapped from 'cellProps'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    hide_default_body: NotRequired[JS]  # Mapped from 'hideDefaultBody'
    hide_default_footer: NotRequired[JS]  # Mapped from 'hideDefaultFooter'
    hide_default_header: NotRequired[JS]  # Mapped from 'hideDefaultHeader'
    width: NotRequired[JS]
    search: NotRequired[JS]
    expand_on_click: NotRequired[JS]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[JS]  # Mapped from 'showExpand'
    expanded: NotRequired[JS]
    group_by: NotRequired[JS]  # Mapped from 'groupBy'
    headers: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_selectable: NotRequired[JS]  # Mapped from 'itemSelectable'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    show_select: NotRequired[JS]  # Mapped from 'showSelect'
    select_strategy: NotRequired[JS]  # Mapped from 'selectStrategy'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    sort_by: NotRequired[JS]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[JS]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[JS]  # Mapped from 'multiSort'
    must_sort: NotRequired[JS]  # Mapped from 'mustSort'
    color: NotRequired[JS]
    sticky: NotRequired[JS]
    disable_sort: NotRequired[JS]  # Mapped from 'disableSort'
    sort_asc_icon: NotRequired[JS]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[JS]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[JS]  # Mapped from 'headerProps'
    fixed_header: NotRequired[JS]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[JS]  # Mapped from 'fixedFooter'
    height: NotRequired[JS]
    hover: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    theme: NotRequired[JS]
    custom_filter: NotRequired[JS]  # Mapped from 'customFilter'
    custom_key_filter: NotRequired[JS]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[JS]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[JS]  # Mapped from 'filterMode'
    no_filter: NotRequired[JS]  # Mapped from 'noFilter'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    first_icon: NotRequired[JS]  # Mapped from 'firstIcon'
    last_icon: NotRequired[JS]  # Mapped from 'lastIcon'
    items_per_page_text: NotRequired[JS]  # Mapped from 'itemsPerPageText'
    page_text: NotRequired[JS]  # Mapped from 'pageText'
    first_page_label: NotRequired[JS]  # Mapped from 'firstPageLabel'
    prev_page_label: NotRequired[JS]  # Mapped from 'prevPageLabel'
    next_page_label: NotRequired[JS]  # Mapped from 'nextPageLabel'
    last_page_label: NotRequired[JS]  # Mapped from 'lastPageLabel'
    items_per_page_options: NotRequired[JS]  # Mapped from 'itemsPerPageOptions'
    show_current_page: NotRequired[JS]  # Mapped from 'showCurrentPage'
    spread: NotRequired[JS]


class ADataTableProps(TypedDict):
    page: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    items_per_page: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'itemsPerPage'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    loading_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    row_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'rowProps'
    cell_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'cellProps'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    hide_default_body: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultBody'
    hide_default_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultFooter'
    hide_default_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultHeader'
    width: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    search: NotRequired[Annotated[str, PropMeta(required=False)]]
    expand_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showExpand'
    expanded: NotRequired[Annotated[List, PropMeta(required=False)]]
    group_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'groupBy'
    headers: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_selectable: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemSelectable'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    show_select: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showSelect'
    select_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'selectStrategy'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    sort_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'multiSort'
    must_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'mustSort'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    disable_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'disableSort'
    sort_asc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'headerProps'
    fixed_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedFooter'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    hover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    custom_key_filter: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'filterMode'
    no_filter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noFilter'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    first_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'firstIcon'
    last_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'lastIcon'
    items_per_page_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemsPerPageText'
    page_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'pageText'
    first_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'firstPageLabel'
    prev_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prevPageLabel'
    next_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'nextPageLabel'
    last_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lastPageLabel'
    items_per_page_options: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'itemsPerPageOptions'
    show_current_page: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showCurrentPage'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableJsProps, PropMeta(required=False)]]


ADataTableCls = Component[EmptyTuple, ADataTableProps, ADataTableSlots, Any, Any, Any]

ADataTableAlpineCls = AlpineComponent[EmptyTuple, ADataTableProps, ADataTableSlots, Any, Any, Any]


class ADataTableColumnSlots(TypedDict):
    default: NotRequired[SlotContent]


class ADataTableColumnJsProps(TypedDict):
    align: NotRequired[JS]
    fixed: NotRequired[JS]
    fixed_offset: NotRequired[JS]  # Mapped from 'fixedOffset'
    height: NotRequired[JS]
    last_fixed: NotRequired[JS]  # Mapped from 'lastFixed'
    no_padding: NotRequired[JS]  # Mapped from 'noPadding'
    width: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    nowrap: NotRequired[JS]
    spread: NotRequired[JS]


class ADataTableColumnProps(TypedDict):
    align: NotRequired[Annotated[str, PropMeta(required=False)]]
    fixed: NotRequired[Annotated[bool, PropMeta(required=False)]]
    fixed_offset: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'fixedOffset'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    last_fixed: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'lastFixed'
    no_padding: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noPadding'
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    nowrap: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableColumnJsProps, PropMeta(required=False)]]


ADataTableColumnCls = Component[EmptyTuple, ADataTableColumnProps, ADataTableColumnSlots, Any, Any, Any]

ADataTableColumnAlpineCls = AlpineComponent[EmptyTuple, ADataTableColumnProps, ADataTableColumnSlots, Any, Any, Any]


class ADataTableFooterSlots(TypedDict):
    prepend: NotRequired[SlotContent]


class ADataTableFooterJsProps(TypedDict):
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    first_icon: NotRequired[JS]  # Mapped from 'firstIcon'
    last_icon: NotRequired[JS]  # Mapped from 'lastIcon'
    items_per_page_text: NotRequired[JS]  # Mapped from 'itemsPerPageText'
    page_text: NotRequired[JS]  # Mapped from 'pageText'
    first_page_label: NotRequired[JS]  # Mapped from 'firstPageLabel'
    prev_page_label: NotRequired[JS]  # Mapped from 'prevPageLabel'
    next_page_label: NotRequired[JS]  # Mapped from 'nextPageLabel'
    last_page_label: NotRequired[JS]  # Mapped from 'lastPageLabel'
    items_per_page_options: NotRequired[JS]  # Mapped from 'itemsPerPageOptions'
    show_current_page: NotRequired[JS]  # Mapped from 'showCurrentPage'
    spread: NotRequired[JS]


class ADataTableFooterProps(TypedDict):
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    first_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'firstIcon'
    last_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'lastIcon'
    items_per_page_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemsPerPageText'
    page_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'pageText'
    first_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'firstPageLabel'
    prev_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prevPageLabel'
    next_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'nextPageLabel'
    last_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lastPageLabel'
    items_per_page_options: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'itemsPerPageOptions'
    show_current_page: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showCurrentPage'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableFooterJsProps, PropMeta(required=False)]]


ADataTableFooterCls = Component[EmptyTuple, ADataTableFooterProps, ADataTableFooterSlots, Any, Any, Any]

ADataTableFooterAlpineCls = AlpineComponent[EmptyTuple, ADataTableFooterProps, ADataTableFooterSlots, Any, Any, Any]


class ADataTableGroupHeaderRowSlots(TypedDict):
    data_table_group: NotRequired[SlotContent]  # Mapped from 'data-table-group'
    data_table_select: NotRequired[SlotContent]  # Mapped from 'data-table-select'


class ADataTableGroupHeaderRowJsProps(TypedDict):
    item: NotRequired[JS]
    spread: NotRequired[JS]


class ADataTableGroupHeaderRowProps(TypedDict):
    item: NotRequired[Annotated[Dict, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableGroupHeaderRowJsProps, PropMeta(required=False)]]


ADataTableGroupHeaderRowCls = Component[EmptyTuple, ADataTableGroupHeaderRowProps, ADataTableGroupHeaderRowSlots, Any, Any, Any]

ADataTableGroupHeaderRowAlpineCls = AlpineComponent[EmptyTuple, ADataTableGroupHeaderRowProps, ADataTableGroupHeaderRowSlots, Any, Any, Any]


class ADataTableHeadersSlots(TypedDict):
    headers: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    header_data_table_select: NotRequired[SlotContent]  # Mapped from 'header.data-table-select'
    header_data_table_expand: NotRequired[SlotContent]  # Mapped from 'header.data-table-expand'
    # header_<name>: NotRequired[SlotContent]  # Mapped from 'header.<name>' # TODO


class ADataTableHeadersJsProps(TypedDict):
    color: NotRequired[JS]
    sticky: NotRequired[JS]
    disable_sort: NotRequired[JS]  # Mapped from 'disableSort'
    multi_sort: NotRequired[JS]  # Mapped from 'multiSort'
    sort_asc_icon: NotRequired[JS]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[JS]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[JS]  # Mapped from 'headerProps'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    loading: NotRequired[JS]
    spread: NotRequired[JS]


class ADataTableHeadersProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    disable_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'disableSort'
    multi_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'multiSort'
    sort_asc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'headerProps'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableHeadersJsProps, PropMeta(required=False)]]


ADataTableHeadersCls = Component[EmptyTuple, ADataTableHeadersProps, ADataTableHeadersSlots, Any, Any, Any]

ADataTableHeadersAlpineCls = AlpineComponent[EmptyTuple, ADataTableHeadersProps, ADataTableHeadersSlots, Any, Any, Any]


class ADataTableRowSlots(TypedDict):
    item_data_table_select: NotRequired[SlotContent]  # Mapped from 'item.data-table-select'
    item_data_table_expand: NotRequired[SlotContent]  # Mapped from 'item.data-table-expand'
    header_data_table_select: NotRequired[SlotContent]  # Mapped from 'header.data-table-select'
    header_data_table_expand: NotRequired[SlotContent]  # Mapped from 'header.data-table-expand'
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO
    # header_<name>: NotRequired[SlotContent]  # Mapped from 'header.<name>' # TODO


class ADataTableRowJsProps(TypedDict):
    index: NotRequired[JS]
    item: NotRequired[JS]
    cell_props: NotRequired[JS]  # Mapped from 'cellProps'
    on_click: NotRequired[JS]  # Mapped from 'onClick'
    on_contextmenu: NotRequired[JS]  # Mapped from 'onContextmenu'
    on_dblclick: NotRequired[JS]  # Mapped from 'onDblclick'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    spread: NotRequired[JS]


class ADataTableRowProps(TypedDict):
    index: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    item: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    cell_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'cellProps'
    on_click: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick'
    on_contextmenu: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onContextmenu'
    on_dblclick: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onDblclick'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableRowJsProps, PropMeta(required=False)]]


ADataTableRowCls = Component[EmptyTuple, ADataTableRowProps, ADataTableRowSlots, Any, Any, Any]

ADataTableRowAlpineCls = AlpineComponent[EmptyTuple, ADataTableRowProps, ADataTableRowSlots, Any, Any, Any]


class ADataTableRowsSlots(TypedDict):
    data_table_group: NotRequired[SlotContent]  # Mapped from 'data-table-group'
    data_table_select: NotRequired[SlotContent]  # Mapped from 'data-table-select'
    item_data_table_select: NotRequired[SlotContent]  # Mapped from 'item.data-table-select'
    item_data_table_expand: NotRequired[SlotContent]  # Mapped from 'item.data-table-expand'
    header_data_table_select: NotRequired[SlotContent]  # Mapped from 'header.data-table-select'
    header_data_table_expand: NotRequired[SlotContent]  # Mapped from 'header.data-table-expand'
    item: NotRequired[SlotContent]
    loading: NotRequired[SlotContent]
    group_header: NotRequired[SlotContent]  # Mapped from 'group-header'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    expanded_row: NotRequired[SlotContent]  # Mapped from 'expanded-row'
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO
    # header_<name>: NotRequired[SlotContent]  # Mapped from 'header.<name>' # TODO


class ADataTableRowsJsProps(TypedDict):
    loading: NotRequired[JS]
    loading_text: NotRequired[JS]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    items: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    row_props: NotRequired[JS]  # Mapped from 'rowProps'
    cell_props: NotRequired[JS]  # Mapped from 'cellProps'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    spread: NotRequired[JS]


class ADataTableRowsProps(TypedDict):
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    loading_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    row_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'rowProps'
    cell_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'cellProps'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableRowsJsProps, PropMeta(required=False)]]


ADataTableRowsCls = Component[EmptyTuple, ADataTableRowsProps, ADataTableRowsSlots, Any, Any, Any]

ADataTableRowsAlpineCls = AlpineComponent[EmptyTuple, ADataTableRowsProps, ADataTableRowsSlots, Any, Any, Any]


class ADataTableServerSlots(TypedDict):
    default: NotRequired[SlotContent]
    colgroup: NotRequired[SlotContent]
    top: NotRequired[SlotContent]
    body: NotRequired[SlotContent]
    tbody: NotRequired[SlotContent]
    thead: NotRequired[SlotContent]
    tfoot: NotRequired[SlotContent]
    bottom: NotRequired[SlotContent]
    body_prepend: NotRequired[SlotContent]  # Mapped from 'body.prepend'
    body_append: NotRequired[SlotContent]  # Mapped from 'body.append'
    footer_prepend: NotRequired[SlotContent]  # Mapped from 'footer.prepend'
    item: NotRequired[SlotContent]
    loading: NotRequired[SlotContent]
    group_header: NotRequired[SlotContent]  # Mapped from 'group-header'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    expanded_row: NotRequired[SlotContent]  # Mapped from 'expanded-row'
    data_table_group: NotRequired[SlotContent]  # Mapped from 'data-table-group'
    data_table_select: NotRequired[SlotContent]  # Mapped from 'data-table-select'
    item_data_table_select: NotRequired[SlotContent]  # Mapped from 'item.data-table-select'
    item_data_table_expand: NotRequired[SlotContent]  # Mapped from 'item.data-table-expand'
    header_data_table_select: NotRequired[SlotContent]  # Mapped from 'header.data-table-select'
    header_data_table_expand: NotRequired[SlotContent]  # Mapped from 'header.data-table-expand'
    headers: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    # header_<name>: NotRequired[SlotContent]  # Mapped from 'header.<name>' # TODO
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO


class ADataTableServerJsProps(TypedDict):
    items_length: NotRequired[JS]  # Mapped from 'itemsLength'
    page: NotRequired[JS]
    items_per_page: NotRequired[JS]  # Mapped from 'itemsPerPage'
    loading: NotRequired[JS]
    loading_text: NotRequired[JS]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    items: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    row_props: NotRequired[JS]  # Mapped from 'rowProps'
    cell_props: NotRequired[JS]  # Mapped from 'cellProps'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    hide_default_body: NotRequired[JS]  # Mapped from 'hideDefaultBody'
    hide_default_footer: NotRequired[JS]  # Mapped from 'hideDefaultFooter'
    hide_default_header: NotRequired[JS]  # Mapped from 'hideDefaultHeader'
    width: NotRequired[JS]
    search: NotRequired[JS]
    expand_on_click: NotRequired[JS]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[JS]  # Mapped from 'showExpand'
    expanded: NotRequired[JS]
    group_by: NotRequired[JS]  # Mapped from 'groupBy'
    headers: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_selectable: NotRequired[JS]  # Mapped from 'itemSelectable'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    show_select: NotRequired[JS]  # Mapped from 'showSelect'
    select_strategy: NotRequired[JS]  # Mapped from 'selectStrategy'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    sort_by: NotRequired[JS]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[JS]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[JS]  # Mapped from 'multiSort'
    must_sort: NotRequired[JS]  # Mapped from 'mustSort'
    color: NotRequired[JS]
    sticky: NotRequired[JS]
    disable_sort: NotRequired[JS]  # Mapped from 'disableSort'
    sort_asc_icon: NotRequired[JS]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[JS]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[JS]  # Mapped from 'headerProps'
    fixed_header: NotRequired[JS]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[JS]  # Mapped from 'fixedFooter'
    height: NotRequired[JS]
    hover: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    theme: NotRequired[JS]
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    first_icon: NotRequired[JS]  # Mapped from 'firstIcon'
    last_icon: NotRequired[JS]  # Mapped from 'lastIcon'
    items_per_page_text: NotRequired[JS]  # Mapped from 'itemsPerPageText'
    page_text: NotRequired[JS]  # Mapped from 'pageText'
    first_page_label: NotRequired[JS]  # Mapped from 'firstPageLabel'
    prev_page_label: NotRequired[JS]  # Mapped from 'prevPageLabel'
    next_page_label: NotRequired[JS]  # Mapped from 'nextPageLabel'
    last_page_label: NotRequired[JS]  # Mapped from 'lastPageLabel'
    items_per_page_options: NotRequired[JS]  # Mapped from 'itemsPerPageOptions'
    show_current_page: NotRequired[JS]  # Mapped from 'showCurrentPage'
    spread: NotRequired[JS]


class ADataTableServerProps(TypedDict):
    items_length: NotRequired[Annotated[Union[int, float, str], PropMeta(required=True)]]  # Mapped from 'itemsLength'
    page: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    items_per_page: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'itemsPerPage'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    loading_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    row_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'rowProps'
    cell_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'cellProps'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    hide_default_body: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultBody'
    hide_default_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultFooter'
    hide_default_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultHeader'
    width: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    search: NotRequired[Annotated[str, PropMeta(required=False)]]
    expand_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showExpand'
    expanded: NotRequired[Annotated[List, PropMeta(required=False)]]
    group_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'groupBy'
    headers: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_selectable: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemSelectable'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    show_select: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showSelect'
    select_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'selectStrategy'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    sort_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'multiSort'
    must_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'mustSort'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    disable_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'disableSort'
    sort_asc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'headerProps'
    fixed_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedFooter'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    hover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    first_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'firstIcon'
    last_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'lastIcon'
    items_per_page_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemsPerPageText'
    page_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'pageText'
    first_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'firstPageLabel'
    prev_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prevPageLabel'
    next_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'nextPageLabel'
    last_page_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lastPageLabel'
    items_per_page_options: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'itemsPerPageOptions'
    show_current_page: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showCurrentPage'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableServerJsProps, PropMeta(required=False)]]


ADataTableServerCls = Component[EmptyTuple, ADataTableServerProps, ADataTableServerSlots, Any, Any, Any]

ADataTableServerAlpineCls = AlpineComponent[EmptyTuple, ADataTableServerProps, ADataTableServerSlots, Any, Any, Any]


class ADataTableVirtualSlots(TypedDict):
    colgroup: NotRequired[SlotContent]
    top: NotRequired[SlotContent]
    headers: NotRequired[SlotContent]
    bottom: NotRequired[SlotContent]
    body_prepend: NotRequired[SlotContent]  # Mapped from 'body.prepend'
    body_append: NotRequired[SlotContent]  # Mapped from 'body.append'
    item: NotRequired[SlotContent]
    loading: NotRequired[SlotContent]
    group_header: NotRequired[SlotContent]  # Mapped from 'group-header'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    expanded_row: NotRequired[SlotContent]  # Mapped from 'expanded-row'
    data_table_group: NotRequired[SlotContent]  # Mapped from 'data-table-group'
    data_table_select: NotRequired[SlotContent]  # Mapped from 'data-table-select'
    item_data_table_select: NotRequired[SlotContent]  # Mapped from 'item.data-table-select'
    item_data_table_expand: NotRequired[SlotContent]  # Mapped from 'item.data-table-expand'
    header_data_table_select: NotRequired[SlotContent]  # Mapped from 'header.data-table-select'
    header_data_table_expand: NotRequired[SlotContent]  # Mapped from 'header.data-table-expand'
    loader: NotRequired[SlotContent]
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO
    # header_<name>: NotRequired[SlotContent]  # Mapped from 'header.<name>' # TODO


class ADataTableVirtualJsProps(TypedDict):
    loading: NotRequired[JS]
    loading_text: NotRequired[JS]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    items: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    row_props: NotRequired[JS]  # Mapped from 'rowProps'
    cell_props: NotRequired[JS]  # Mapped from 'cellProps'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    hide_default_body: NotRequired[JS]  # Mapped from 'hideDefaultBody'
    hide_default_footer: NotRequired[JS]  # Mapped from 'hideDefaultFooter'
    hide_default_header: NotRequired[JS]  # Mapped from 'hideDefaultHeader'
    width: NotRequired[JS]
    search: NotRequired[JS]
    expand_on_click: NotRequired[JS]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[JS]  # Mapped from 'showExpand'
    expanded: NotRequired[JS]
    group_by: NotRequired[JS]  # Mapped from 'groupBy'
    headers: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_selectable: NotRequired[JS]  # Mapped from 'itemSelectable'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    show_select: NotRequired[JS]  # Mapped from 'showSelect'
    select_strategy: NotRequired[JS]  # Mapped from 'selectStrategy'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    sort_by: NotRequired[JS]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[JS]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[JS]  # Mapped from 'multiSort'
    must_sort: NotRequired[JS]  # Mapped from 'mustSort'
    color: NotRequired[JS]
    sticky: NotRequired[JS]
    disable_sort: NotRequired[JS]  # Mapped from 'disableSort'
    sort_asc_icon: NotRequired[JS]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[JS]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[JS]  # Mapped from 'headerProps'
    fixed_header: NotRequired[JS]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[JS]  # Mapped from 'fixedFooter'
    height: NotRequired[JS]
    hover: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    theme: NotRequired[JS]
    item_height: NotRequired[JS]  # Mapped from 'itemHeight'
    custom_filter: NotRequired[JS]  # Mapped from 'customFilter'
    custom_key_filter: NotRequired[JS]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[JS]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[JS]  # Mapped from 'filterMode'
    no_filter: NotRequired[JS]  # Mapped from 'noFilter'
    spread: NotRequired[JS]


class ADataTableVirtualProps(TypedDict):
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    loading_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'loadingText'
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    row_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'rowProps'
    cell_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'cellProps'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    hide_default_body: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultBody'
    hide_default_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultFooter'
    hide_default_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDefaultHeader'
    width: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    search: NotRequired[Annotated[str, PropMeta(required=False)]]
    expand_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'expandOnClick'
    show_expand: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showExpand'
    expanded: NotRequired[Annotated[List, PropMeta(required=False)]]
    group_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'groupBy'
    headers: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_selectable: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemSelectable'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    show_select: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showSelect'
    select_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'selectStrategy'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    sort_by: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'sortBy'
    custom_key_sort: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeySort'
    multi_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'multiSort'
    must_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'mustSort'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    disable_sort: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'disableSort'
    sort_asc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortAscIcon'
    sort_desc_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'sortDescIcon'
    header_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'headerProps'
    fixed_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedFooter'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    hover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    item_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'itemHeight'
    custom_key_filter: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'customKeyFilter'
    filter_keys: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'filterKeys'
    filter_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'filterMode'
    no_filter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noFilter'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADataTableVirtualJsProps, PropMeta(required=False)]]


ADataTableVirtualCls = Component[EmptyTuple, ADataTableVirtualProps, ADataTableVirtualSlots, Any, Any, Any]

ADataTableVirtualAlpineCls = AlpineComponent[EmptyTuple, ADataTableVirtualProps, ADataTableVirtualSlots, Any, Any, Any]


class ADatePickerSlots(TypedDict):
    header: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    actions: NotRequired[SlotContent]
    title: NotRequired[SlotContent]


class ADatePickerJsProps(TypedDict):
    header: NotRequired[JS]
    active: NotRequired[JS]
    disabled: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    mode_icon: NotRequired[JS]  # Mapped from 'modeIcon'
    text: NotRequired[JS]
    view_mode: NotRequired[JS]  # Mapped from 'viewMode'
    color: NotRequired[JS]
    hide_weekdays: NotRequired[JS]  # Mapped from 'hideWeekdays'
    multiple: NotRequired[JS]
    show_week: NotRequired[JS]  # Mapped from 'showWeek'
    transition: NotRequired[JS]
    reverse_transition: NotRequired[JS]  # Mapped from 'reverseTransition'
    allowed_dates: NotRequired[JS]  # Mapped from 'allowedDates'
    display_value: NotRequired[JS]  # Mapped from 'displayValue'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    month: NotRequired[JS]
    max: NotRequired[JS]
    min: NotRequired[JS]
    show_adjacent_months: NotRequired[JS]  # Mapped from 'showAdjacentMonths'
    year: NotRequired[JS]
    weekdays: NotRequired[JS]
    weeks_in_month: NotRequired[JS]  # Mapped from 'weeksInMonth'
    first_day_of_week: NotRequired[JS]  # Mapped from 'firstDayOfWeek'
    height: NotRequired[JS]
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    landscape: NotRequired[JS]
    title: NotRequired[JS]
    hide_header: NotRequired[JS]  # Mapped from 'hideHeader'
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ADatePickerProps(TypedDict):
    header: NotRequired[Annotated[str, PropMeta(required=False)]]
    active: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    mode_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'modeIcon'
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    view_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'viewMode'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    hide_weekdays: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideWeekdays'
    multiple: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    show_week: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showWeek'
    transition: NotRequired[Annotated[str, PropMeta(required=False)]]
    reverse_transition: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'reverseTransition'
    allowed_dates: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'allowedDates'
    display_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'displayValue'
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    month: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Any, PropMeta(required=False)]]
    min: NotRequired[Annotated[Any, PropMeta(required=False)]]
    show_adjacent_months: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showAdjacentMonths'
    year: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    weekdays: NotRequired[Annotated[List, PropMeta(required=False)]]
    weeks_in_month: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'weeksInMonth'
    first_day_of_week: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'firstDayOfWeek'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    landscape: NotRequired[Annotated[bool, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    hide_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideHeader'
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADatePickerJsProps, PropMeta(required=False)]]


ADatePickerCls = Component[EmptyTuple, ADatePickerProps, ADatePickerSlots, Any, Any, Any]

ADatePickerAlpineCls = AlpineComponent[EmptyTuple, ADatePickerProps, ADatePickerSlots, Any, Any, Any]


class ADatePickerControlsSlots(TypedDict):
    default: NotRequired[SlotContent]


class ADatePickerControlsJsProps(TypedDict):
    active: NotRequired[JS]
    disabled: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    mode_icon: NotRequired[JS]  # Mapped from 'modeIcon'
    text: NotRequired[JS]
    view_mode: NotRequired[JS]  # Mapped from 'viewMode'
    spread: NotRequired[JS]


class ADatePickerControlsProps(TypedDict):
    active: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    mode_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'modeIcon'
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    view_mode: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'viewMode'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADatePickerControlsJsProps, PropMeta(required=False)]]


ADatePickerControlsCls = Component[EmptyTuple, ADatePickerControlsProps, ADatePickerControlsSlots, Any, Any, Any]

ADatePickerControlsAlpineCls = AlpineComponent[EmptyTuple, ADatePickerControlsProps, ADatePickerControlsSlots, Any, Any, Any]


class ADatePickerHeaderSlots(TypedDict):
    prepend: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    append: NotRequired[SlotContent]


class ADatePickerHeaderJsProps(TypedDict):
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    color: NotRequired[JS]
    header: NotRequired[JS]
    transition: NotRequired[JS]
    on_click: NotRequired[JS]  # Mapped from 'onClick'
    spread: NotRequired[JS]


class ADatePickerHeaderProps(TypedDict):
    append_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'appendIcon'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    header: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADatePickerHeaderJsProps, PropMeta(required=False)]]


ADatePickerHeaderCls = Component[EmptyTuple, ADatePickerHeaderProps, ADatePickerHeaderSlots, Any, Any, Any]

ADatePickerHeaderAlpineCls = AlpineComponent[EmptyTuple, ADatePickerHeaderProps, ADatePickerHeaderSlots, Any, Any, Any]


class ADatePickerMonthSlots(TypedDict):
    day: NotRequired[SlotContent]


class ADatePickerMonthJsProps(TypedDict):
    color: NotRequired[JS]
    hide_weekdays: NotRequired[JS]  # Mapped from 'hideWeekdays'
    multiple: NotRequired[JS]
    show_week: NotRequired[JS]  # Mapped from 'showWeek'
    transition: NotRequired[JS]
    reverse_transition: NotRequired[JS]  # Mapped from 'reverseTransition'
    allowed_dates: NotRequired[JS]  # Mapped from 'allowedDates'
    disabled: NotRequired[JS]
    display_value: NotRequired[JS]  # Mapped from 'displayValue'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    month: NotRequired[JS]
    max: NotRequired[JS]
    min: NotRequired[JS]
    show_adjacent_months: NotRequired[JS]  # Mapped from 'showAdjacentMonths'
    year: NotRequired[JS]
    weekdays: NotRequired[JS]
    weeks_in_month: NotRequired[JS]  # Mapped from 'weeksInMonth'
    first_day_of_week: NotRequired[JS]  # Mapped from 'firstDayOfWeek'
    spread: NotRequired[JS]


class ADatePickerMonthProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    hide_weekdays: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideWeekdays'
    multiple: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    show_week: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showWeek'
    transition: NotRequired[Annotated[str, PropMeta(required=False)]]
    reverse_transition: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'reverseTransition'
    allowed_dates: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'allowedDates'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    display_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'displayValue'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    month: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Any, PropMeta(required=False)]]
    min: NotRequired[Annotated[Any, PropMeta(required=False)]]
    show_adjacent_months: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showAdjacentMonths'
    year: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    weekdays: NotRequired[Annotated[List, PropMeta(required=False)]]
    weeks_in_month: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'weeksInMonth'
    first_day_of_week: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'firstDayOfWeek'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADatePickerMonthJsProps, PropMeta(required=False)]]


ADatePickerMonthCls = Component[EmptyTuple, ADatePickerMonthProps, ADatePickerMonthSlots, Any, Any, Any]

ADatePickerMonthAlpineCls = AlpineComponent[EmptyTuple, ADatePickerMonthProps, ADatePickerMonthSlots, Any, Any, Any]


class ADatePickerMonthsSlots(TypedDict):
    month: NotRequired[SlotContent]


class ADatePickerMonthsJsProps(TypedDict):
    color: NotRequired[JS]
    height: NotRequired[JS]
    min: NotRequired[JS]
    max: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    year: NotRequired[JS]
    spread: NotRequired[JS]


class ADatePickerMonthsProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    min: NotRequired[Annotated[Any, PropMeta(required=False)]]
    max: NotRequired[Annotated[Any, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'modelValue'
    year: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADatePickerMonthsJsProps, PropMeta(required=False)]]


ADatePickerMonthsCls = Component[EmptyTuple, ADatePickerMonthsProps, ADatePickerMonthsSlots, Any, Any, Any]

ADatePickerMonthsAlpineCls = AlpineComponent[EmptyTuple, ADatePickerMonthsProps, ADatePickerMonthsSlots, Any, Any, Any]


class ADatePickerYearsSlots(TypedDict):
    year: NotRequired[SlotContent]


class ADatePickerYearsJsProps(TypedDict):
    color: NotRequired[JS]
    height: NotRequired[JS]
    min: NotRequired[JS]
    max: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    spread: NotRequired[JS]


class ADatePickerYearsProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    min: NotRequired[Annotated[Any, PropMeta(required=False)]]
    max: NotRequired[Annotated[Any, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'modelValue'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADatePickerYearsJsProps, PropMeta(required=False)]]


ADatePickerYearsCls = Component[EmptyTuple, ADatePickerYearsProps, ADatePickerYearsSlots, Any, Any, Any]

ADatePickerYearsAlpineCls = AlpineComponent[EmptyTuple, ADatePickerYearsProps, ADatePickerYearsSlots, Any, Any, Any]


class ADefaultsProviderSlots(TypedDict):
    default: NotRequired[SlotContent]


class ADefaultsProviderJsProps(TypedDict):
    defaults: NotRequired[JS]
    disabled: NotRequired[JS]
    reset: NotRequired[JS]
    root: NotRequired[JS]
    scoped: NotRequired[JS]
    spread: NotRequired[JS]


class ADefaultsProviderProps(TypedDict):
    defaults: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    reset: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    root: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    scoped: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADefaultsProviderJsProps, PropMeta(required=False)]]


ADefaultsProviderCls = Component[EmptyTuple, ADefaultsProviderProps, ADefaultsProviderSlots, Any, Any, Any]

ADefaultsProviderAlpineCls = AlpineComponent[EmptyTuple, ADefaultsProviderProps, ADefaultsProviderSlots, Any, Any, Any]


class ADialogSlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class ADialogJsProps(TypedDict):
    fullscreen: NotRequired[JS]
    retain_focus: NotRequired[JS]  # Mapped from 'retainFocus'
    scrollable: NotRequired[JS]
    absolute: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    no_click_animation: NotRequired[JS]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    persistent: NotRequired[JS]
    scrim: NotRequired[JS]
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    location: NotRequired[JS]
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    scroll_strategy: NotRequired[JS]  # Mapped from 'scrollStrategy'
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ADialogProps(TypedDict):
    fullscreen: NotRequired[Annotated[bool, PropMeta(required=False)]]
    retain_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'retainFocus'
    scrollable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    no_click_animation: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    persistent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    scroll_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollStrategy'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADialogJsProps, PropMeta(required=False)]]


ADialogCls = Component[EmptyTuple, ADialogProps, ADialogSlots, Any, Any, Any]

ADialogAlpineCls = AlpineComponent[EmptyTuple, ADialogProps, ADialogSlots, Any, Any, Any]


class ADividerSlots(TypedDict):
    default: NotRequired[SlotContent]


class ADividerJsProps(TypedDict):
    color: NotRequired[JS]
    inset: NotRequired[JS]
    length: NotRequired[JS]
    opacity: NotRequired[JS]
    thickness: NotRequired[JS]
    vertical: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ADividerProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    inset: NotRequired[Annotated[bool, PropMeta(required=False)]]
    length: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    thickness: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    vertical: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ADividerJsProps, PropMeta(required=False)]]


ADividerCls = Component[EmptyTuple, ADividerProps, ADividerSlots, Any, Any, Any]

ADividerAlpineCls = AlpineComponent[EmptyTuple, ADividerProps, ADividerSlots, Any, Any, Any]


class AEmptyStateSlots(TypedDict):
    actions: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    headline: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    media: NotRequired[SlotContent]
    text: NotRequired[SlotContent]


class AEmptyStateJsProps(TypedDict):
    action_text: NotRequired[JS]  # Mapped from 'actionText'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    color: NotRequired[JS]
    icon: NotRequired[JS]
    image: NotRequired[JS]
    justify: NotRequired[JS]
    headline: NotRequired[JS]
    title: NotRequired[JS]
    text: NotRequired[JS]
    text_width: NotRequired[JS]  # Mapped from 'textWidth'
    href: NotRequired[JS]
    to: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AEmptyStateProps(TypedDict):
    action_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'actionText'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    image: NotRequired[Annotated[str, PropMeta(required=False)]]
    justify: NotRequired[Annotated[str, PropMeta(required=False)]]
    headline: NotRequired[Annotated[str, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    text_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'textWidth'
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    to: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AEmptyStateJsProps, PropMeta(required=False)]]


AEmptyStateCls = Component[EmptyTuple, AEmptyStateProps, AEmptyStateSlots, Any, Any, Any]

AEmptyStateAlpineCls = AlpineComponent[EmptyTuple, AEmptyStateProps, AEmptyStateSlots, Any, Any, Any]


class AExpansionPanelSlots(TypedDict):
    default: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    text: NotRequired[SlotContent]


class AExpansionPanelJsProps(TypedDict):
    title: NotRequired[JS]
    text: NotRequired[JS]
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    elevation: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    color: NotRequired[JS]
    expand_icon: NotRequired[JS]  # Mapped from 'expandIcon'
    collapse_icon: NotRequired[JS]  # Mapped from 'collapseIcon'
    hide_actions: NotRequired[JS]  # Mapped from 'hideActions'
    focusable: NotRequired[JS]
    static: NotRequired[JS]
    ripple: NotRequired[JS]
    readonly: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    eager: NotRequired[JS]
    spread: NotRequired[JS]


class AExpansionPanelProps(TypedDict):
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    expand_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'expandIcon'
    collapse_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'collapseIcon'
    hide_actions: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideActions'
    focusable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    static: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AExpansionPanelJsProps, PropMeta(required=False)]]


AExpansionPanelCls = Component[EmptyTuple, AExpansionPanelProps, AExpansionPanelSlots, Any, Any, Any]

AExpansionPanelAlpineCls = AlpineComponent[EmptyTuple, AExpansionPanelProps, AExpansionPanelSlots, Any, Any, Any]


class AExpansionPanelTextSlots(TypedDict):
    default: NotRequired[SlotContent]


class AExpansionPanelTextJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    eager: NotRequired[JS]
    spread: NotRequired[JS]


class AExpansionPanelTextProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AExpansionPanelTextJsProps, PropMeta(required=False)]]


AExpansionPanelTextCls = Component[EmptyTuple, AExpansionPanelTextProps, AExpansionPanelTextSlots, Any, Any, Any]

AExpansionPanelTextAlpineCls = AlpineComponent[EmptyTuple, AExpansionPanelTextProps, AExpansionPanelTextSlots, Any, Any, Any]


class AExpansionPanelTitleSlots(TypedDict):
    default: NotRequired[SlotContent]
    actions: NotRequired[SlotContent]


class AExpansionPanelTitleJsProps(TypedDict):
    color: NotRequired[JS]
    expand_icon: NotRequired[JS]  # Mapped from 'expandIcon'
    collapse_icon: NotRequired[JS]  # Mapped from 'collapseIcon'
    hide_actions: NotRequired[JS]  # Mapped from 'hideActions'
    focusable: NotRequired[JS]
    static: NotRequired[JS]
    ripple: NotRequired[JS]
    readonly: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AExpansionPanelTitleProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    expand_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'expandIcon'
    collapse_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'collapseIcon'
    hide_actions: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideActions'
    focusable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    static: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AExpansionPanelTitleJsProps, PropMeta(required=False)]]


AExpansionPanelTitleCls = Component[EmptyTuple, AExpansionPanelTitleProps, AExpansionPanelTitleSlots, Any, Any, Any]

AExpansionPanelTitleAlpineCls = AlpineComponent[EmptyTuple, AExpansionPanelTitleProps, AExpansionPanelTitleSlots, Any, Any, Any]


class AExpansionPanelsSlots(TypedDict):
    default: NotRequired[SlotContent]


class AExpansionPanelsJsProps(TypedDict):
    flat: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    collapse_icon: NotRequired[JS]  # Mapped from 'collapseIcon'
    color: NotRequired[JS]
    eager: NotRequired[JS]
    elevation: NotRequired[JS]
    expand_icon: NotRequired[JS]  # Mapped from 'expandIcon'
    focusable: NotRequired[JS]
    hide_actions: NotRequired[JS]  # Mapped from 'hideActions'
    readonly: NotRequired[JS]
    ripple: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    static: NotRequired[JS]
    theme: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AExpansionPanelsProps(TypedDict):
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    collapse_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'collapseIcon'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    expand_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'expandIcon'
    focusable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    hide_actions: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideActions'
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    static: NotRequired[Annotated[bool, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AExpansionPanelsJsProps, PropMeta(required=False)]]


AExpansionPanelsCls = Component[EmptyTuple, AExpansionPanelsProps, AExpansionPanelsSlots, Any, Any, Any]

AExpansionPanelsAlpineCls = AlpineComponent[EmptyTuple, AExpansionPanelsProps, AExpansionPanelsSlots, Any, Any, Any]


class AFa4IconSlots(TypedDict):
    default: NotRequired[SlotContent]


class AFa4IconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class AFa4IconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFa4IconJsProps, PropMeta(required=False)]]


AFa4IconCls = Component[EmptyTuple, AFa4IconProps, AFa4IconSlots, Any, Any, Any]

AFa4IconAlpineCls = AlpineComponent[EmptyTuple, AFa4IconProps, AFa4IconSlots, Any, Any, Any]


class AFabSlots(TypedDict):
    default: NotRequired[SlotContent]


class AFabJsProps(TypedDict):
    app: NotRequired[JS]
    appear: NotRequired[JS]
    extended: NotRequired[JS]
    layout: NotRequired[JS]
    offset: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    active: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    symbol: NotRequired[JS]
    flat: NotRequired[JS]
    icon: NotRequired[JS]
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    block: NotRequired[JS]
    readonly: NotRequired[JS]
    slim: NotRequired[JS]
    stacked: NotRequired[JS]
    ripple: NotRequired[JS]
    text: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    loading: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    absolute: NotRequired[JS]
    location: NotRequired[JS]
    transition: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AFabProps(TypedDict):
    app: NotRequired[Annotated[bool, PropMeta(required=False)]]
    appear: NotRequired[Annotated[bool, PropMeta(required=False)]]
    extended: NotRequired[Annotated[bool, PropMeta(required=False)]]
    layout: NotRequired[Annotated[bool, PropMeta(required=False)]]
    offset: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    symbol: NotRequired[Annotated[Any, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    block: NotRequired[Annotated[bool, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    slim: NotRequired[Annotated[bool, PropMeta(required=False)]]
    stacked: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFabJsProps, PropMeta(required=False)]]


AFabCls = Component[EmptyTuple, AFabProps, AFabSlots, Any, Any, Any]

AFabAlpineCls = AlpineComponent[EmptyTuple, AFabProps, AFabSlots, Any, Any, Any]


class AFieldSlots(TypedDict):
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    default: NotRequired[SlotContent]


class AFieldJsProps(TypedDict):
    id: NotRequired[JS]
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[JS]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    dirty: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    flat: NotRequired[JS]
    label: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AFieldProps(TypedDict):
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    dirty: NotRequired[Annotated[bool, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFieldJsProps, PropMeta(required=False)]]


AFieldCls = Component[EmptyTuple, AFieldProps, AFieldSlots, Any, Any, Any]

AFieldAlpineCls = AlpineComponent[EmptyTuple, AFieldProps, AFieldSlots, Any, Any, Any]


class AFieldLabelSlots(TypedDict):
    default: NotRequired[SlotContent]


class AFieldLabelJsProps(TypedDict):
    floating: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AFieldLabelProps(TypedDict):
    floating: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFieldLabelJsProps, PropMeta(required=False)]]


AFieldLabelCls = Component[EmptyTuple, AFieldLabelProps, AFieldLabelSlots, Any, Any, Any]

AFieldLabelAlpineCls = AlpineComponent[EmptyTuple, AFieldLabelProps, AFieldLabelSlots, Any, Any, Any]


class AFileInputSlots(TypedDict):
    counter: NotRequired[SlotContent]
    selection: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class AFileInputJsProps(TypedDict):
    chips: NotRequired[JS]
    counter: NotRequired[JS]
    counter_size_string: NotRequired[JS]  # Mapped from 'counterSizeString'
    counter_string: NotRequired[JS]  # Mapped from 'counterString'
    hide_input: NotRequired[JS]  # Mapped from 'hideInput'
    multiple: NotRequired[JS]
    show_size: NotRequired[JS]  # Mapped from 'showSize'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[JS]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    dirty: NotRequired[JS]
    flat: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    spread: NotRequired[JS]


class AFileInputProps(TypedDict):
    chips: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter_size_string: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'counterSizeString'
    counter_string: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'counterString'
    hide_input: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideInput'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    show_size: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]  # Mapped from 'showSize'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[List, Dict], PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    dirty: NotRequired[Annotated[bool, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFileInputJsProps, PropMeta(required=False)]]


AFileInputCls = Component[EmptyTuple, AFileInputProps, AFileInputSlots, Any, Any, Any]

AFileInputAlpineCls = AlpineComponent[EmptyTuple, AFileInputProps, AFileInputSlots, Any, Any, Any]


class AFooterSlots(TypedDict):
    default: NotRequired[SlotContent]


class AFooterJsProps(TypedDict):
    app: NotRequired[JS]
    color: NotRequired[JS]
    height: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    elevation: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    absolute: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AFooterProps(TypedDict):
    app: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFooterJsProps, PropMeta(required=False)]]


AFooterCls = Component[EmptyTuple, AFooterProps, AFooterSlots, Any, Any, Any]

AFooterAlpineCls = AlpineComponent[EmptyTuple, AFooterProps, AFooterSlots, Any, Any, Any]


class AFormSlots(TypedDict):
    default: NotRequired[SlotContent]


class AFormJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    disabled: NotRequired[JS]
    fast_fail: NotRequired[JS]  # Mapped from 'fastFail'
    readonly: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    spread: NotRequired[JS]


class AFormProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    fast_fail: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fastFail'
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AFormJsProps, PropMeta(required=False)]]


AFormCls = Component[EmptyTuple, AFormProps, AFormSlots, Any, Any, Any]

AFormAlpineCls = AlpineComponent[EmptyTuple, AFormProps, AFormSlots, Any, Any, Any]


class AHoverSlots(TypedDict):
    default: NotRequired[SlotContent]


class AHoverJsProps(TypedDict):
    disabled: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    spread: NotRequired[JS]


class AHoverProps(TypedDict):
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AHoverJsProps, PropMeta(required=False)]]


AHoverCls = Component[EmptyTuple, AHoverProps, AHoverSlots, Any, Any, Any]

AHoverAlpineCls = AlpineComponent[EmptyTuple, AHoverProps, AHoverSlots, Any, Any, Any]


class AIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class AIconJsProps(TypedDict):
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    start: NotRequired[JS]
    end: NotRequired[JS]
    icon: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AIconProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    start: NotRequired[Annotated[bool, PropMeta(required=False)]]
    end: NotRequired[Annotated[bool, PropMeta(required=False)]]
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AIconJsProps, PropMeta(required=False)]]


AIconCls = Component[EmptyTuple, AIconProps, AIconSlots, Any, Any, Any]

AIconAlpineCls = AlpineComponent[EmptyTuple, AIconProps, AIconSlots, Any, Any, Any]


class AImgSlots(TypedDict):
    default: NotRequired[SlotContent]
    placeholder: NotRequired[SlotContent]
    error: NotRequired[SlotContent]
    sources: NotRequired[SlotContent]


class AImgJsProps(TypedDict):
    alt: NotRequired[JS]
    cover: NotRequired[JS]
    color: NotRequired[JS]
    draggable: NotRequired[JS]
    eager: NotRequired[JS]
    gradient: NotRequired[JS]
    lazy_src: NotRequired[JS]  # Mapped from 'lazySrc'
    options: NotRequired[JS]
    sizes: NotRequired[JS]
    src: NotRequired[JS]
    crossorigin: NotRequired[JS]
    referrerpolicy: NotRequired[JS]
    srcset: NotRequired[JS]
    position: NotRequired[JS]
    aspect_ratio: NotRequired[JS]  # Mapped from 'aspectRatio'
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    inline: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AImgProps(TypedDict):
    alt: NotRequired[Annotated[str, PropMeta(required=False)]]
    cover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    draggable: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    gradient: NotRequired[Annotated[str, PropMeta(required=False)]]
    lazy_src: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lazySrc'
    options: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    sizes: NotRequired[Annotated[str, PropMeta(required=False)]]
    src: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    crossorigin: NotRequired[Annotated[str, PropMeta(required=False)]]
    referrerpolicy: NotRequired[Annotated[str, PropMeta(required=False)]]
    srcset: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    aspect_ratio: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'aspectRatio'
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AImgJsProps, PropMeta(required=False)]]


AImgCls = Component[EmptyTuple, AImgProps, AImgSlots, Any, Any, Any]

AImgAlpineCls = AlpineComponent[EmptyTuple, AImgProps, AImgSlots, Any, Any, Any]


class AInfiniteScrollSlots(TypedDict):
    default: NotRequired[SlotContent]
    loading: NotRequired[SlotContent]
    error: NotRequired[SlotContent]
    empty: NotRequired[SlotContent]
    load_more: NotRequired[SlotContent]  # Mapped from 'load-more'


class AInfiniteScrollJsProps(TypedDict):
    color: NotRequired[JS]
    direction: NotRequired[JS]
    side: NotRequired[JS]
    mode: NotRequired[JS]
    margin: NotRequired[JS]
    load_more_text: NotRequired[JS]  # Mapped from 'loadMoreText'
    empty_text: NotRequired[JS]  # Mapped from 'emptyText'
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    spread: NotRequired[JS]


class AInfiniteScrollProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    side: NotRequired[Annotated[str, PropMeta(required=False)]]
    mode: NotRequired[Annotated[str, PropMeta(required=False)]]
    margin: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    load_more_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'loadMoreText'
    empty_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'emptyText'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AInfiniteScrollJsProps, PropMeta(required=False)]]


AInfiniteScrollCls = Component[EmptyTuple, AInfiniteScrollProps, AInfiniteScrollSlots, Any, Any, Any]

AInfiniteScrollAlpineCls = AlpineComponent[EmptyTuple, AInfiniteScrollProps, AInfiniteScrollSlots, Any, Any, Any]


class AInputSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]


class AInputJsProps(TypedDict):
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    spread: NotRequired[JS]


class AInputProps(TypedDict):
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AInputJsProps, PropMeta(required=False)]]


AInputCls = Component[EmptyTuple, AInputProps, AInputSlots, Any, Any, Any]

AInputAlpineCls = AlpineComponent[EmptyTuple, AInputProps, AInputSlots, Any, Any, Any]


class AItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class AItemJsProps(TypedDict):
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    spread: NotRequired[JS]


class AItemProps(TypedDict):
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AItemJsProps, PropMeta(required=False)]]


AItemCls = Component[EmptyTuple, AItemProps, AItemSlots, Any, Any, Any]

AItemAlpineCls = AlpineComponent[EmptyTuple, AItemProps, AItemSlots, Any, Any, Any]


class AItemGroupSlots(TypedDict):
    default: NotRequired[SlotContent]


class AItemGroupJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AItemGroupProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AItemGroupJsProps, PropMeta(required=False)]]


AItemGroupCls = Component[EmptyTuple, AItemGroupProps, AItemGroupSlots, Any, Any, Any]

AItemGroupAlpineCls = AlpineComponent[EmptyTuple, AItemGroupProps, AItemGroupSlots, Any, Any, Any]


class AKbdSlots(TypedDict):
    default: NotRequired[SlotContent]


class AKbdJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AKbdProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AKbdJsProps, PropMeta(required=False)]]


AKbdCls = Component[EmptyTuple, AKbdProps, AKbdSlots, Any, Any, Any]

AKbdAlpineCls = AlpineComponent[EmptyTuple, AKbdProps, AKbdSlots, Any, Any, Any]


class ALabelSlots(TypedDict):
    default: NotRequired[SlotContent]


class ALabelJsProps(TypedDict):
    text: NotRequired[JS]
    on_click: NotRequired[JS]  # Mapped from 'onClick'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ALabelProps(TypedDict):
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALabelJsProps, PropMeta(required=False)]]


ALabelCls = Component[EmptyTuple, ALabelProps, ALabelSlots, Any, Any, Any]

ALabelAlpineCls = AlpineComponent[EmptyTuple, ALabelProps, ALabelSlots, Any, Any, Any]


class ALayoutSlots(TypedDict):
    default: NotRequired[SlotContent]


class ALayoutJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    overlaps: NotRequired[JS]
    full_height: NotRequired[JS]  # Mapped from 'fullHeight'
    spread: NotRequired[JS]


class ALayoutProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    overlaps: NotRequired[Annotated[List, PropMeta(required=False)]]
    full_height: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fullHeight'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALayoutJsProps, PropMeta(required=False)]]


ALayoutCls = Component[EmptyTuple, ALayoutProps, ALayoutSlots, Any, Any, Any]

ALayoutAlpineCls = AlpineComponent[EmptyTuple, ALayoutProps, ALayoutSlots, Any, Any, Any]


class ALayoutItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class ALayoutItemJsProps(TypedDict):
    position: NotRequired[JS]
    size: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    absolute: NotRequired[JS]
    spread: NotRequired[JS]


class ALayoutItemProps(TypedDict):
    position: NotRequired[Annotated[str, PropMeta(required=True)]]
    size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALayoutItemJsProps, PropMeta(required=False)]]


ALayoutItemCls = Component[EmptyTuple, ALayoutItemProps, ALayoutItemSlots, Any, Any, Any]

ALayoutItemAlpineCls = AlpineComponent[EmptyTuple, ALayoutItemProps, ALayoutItemSlots, Any, Any, Any]


class ALazySlots(TypedDict):
    default: NotRequired[SlotContent]


class ALazyJsProps(TypedDict):
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    options: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ALazyProps(TypedDict):
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    options: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALazyJsProps, PropMeta(required=False)]]


ALazyCls = Component[EmptyTuple, ALazyProps, ALazySlots, Any, Any, Any]

ALazyAlpineCls = AlpineComponent[EmptyTuple, ALazyProps, ALazySlots, Any, Any, Any]


class ALigatureIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class ALigatureIconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class ALigatureIconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALigatureIconJsProps, PropMeta(required=False)]]


ALigatureIconCls = Component[EmptyTuple, ALigatureIconProps, ALigatureIconSlots, Any, Any, Any]

ALigatureIconAlpineCls = AlpineComponent[EmptyTuple, ALigatureIconProps, ALigatureIconSlots, Any, Any, Any]


class AListSlots(TypedDict):
    default: NotRequired[SlotContent]
    item: NotRequired[SlotContent]
    divider: NotRequired[SlotContent]
    subheader: NotRequired[SlotContent]
    header: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]


class AListJsProps(TypedDict):
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    active_class: NotRequired[JS]  # Mapped from 'activeClass'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    disabled: NotRequired[JS]
    expand_icon: NotRequired[JS]  # Mapped from 'expandIcon'
    collapse_icon: NotRequired[JS]  # Mapped from 'collapseIcon'
    lines: NotRequired[JS]
    slim: NotRequired[JS]
    nav: NotRequired[JS]
    on_click_open: NotRequired[JS]  # Mapped from 'onClick:open'
    on_click_select: NotRequired[JS]  # Mapped from 'onClick:select'
    on_update_opened: NotRequired[JS]  # Mapped from 'onUpdate:opened'
    activatable: NotRequired[JS]
    selectable: NotRequired[JS]
    active_strategy: NotRequired[JS]  # Mapped from 'activeStrategy'
    select_strategy: NotRequired[JS]  # Mapped from 'selectStrategy'
    open_strategy: NotRequired[JS]  # Mapped from 'openStrategy'
    opened: NotRequired[JS]
    activated: NotRequired[JS]
    selected: NotRequired[JS]
    mandatory: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    item_type: NotRequired[JS]  # Mapped from 'itemType'
    items: NotRequired[JS]
    item_title: NotRequired[JS]  # Mapped from 'itemTitle'
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_children: NotRequired[JS]  # Mapped from 'itemChildren'
    item_props: NotRequired[JS]  # Mapped from 'itemProps'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AListProps(TypedDict):
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    active_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeClass'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    expand_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'expandIcon'
    collapse_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'collapseIcon'
    lines: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    slim: NotRequired[Annotated[bool, PropMeta(required=False)]]
    nav: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_click_open: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:open'
    on_click_select: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:select'
    on_update_opened: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:opened'
    activatable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selectable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    active_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'activeStrategy'
    select_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'selectStrategy'
    open_strategy: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]  # Mapped from 'openStrategy'
    opened: NotRequired[Annotated[Any, PropMeta(required=False)]]
    activated: NotRequired[Annotated[Any, PropMeta(required=False)]]
    selected: NotRequired[Annotated[Any, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[bool, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    item_type: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemType'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_title: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemTitle'
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_children: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemChildren'
    item_props: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemProps'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListJsProps, PropMeta(required=False)]]


AListCls = Component[EmptyTuple, AListProps, AListSlots, Any, Any, Any]

AListAlpineCls = AlpineComponent[EmptyTuple, AListProps, AListSlots, Any, Any, Any]


class AListChildrenSlots(TypedDict):
    default: NotRequired[SlotContent]
    item: NotRequired[SlotContent]
    divider: NotRequired[SlotContent]
    subheader: NotRequired[SlotContent]
    header: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]


class AListChildrenJsProps(TypedDict):
    items: NotRequired[JS]
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    spread: NotRequired[JS]


class AListChildrenProps(TypedDict):
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListChildrenJsProps, PropMeta(required=False)]]


AListChildrenCls = Component[EmptyTuple, AListChildrenProps, AListChildrenSlots, Any, Any, Any]

AListChildrenAlpineCls = AlpineComponent[EmptyTuple, AListChildrenProps, AListChildrenSlots, Any, Any, Any]


class AListGroupSlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class AListGroupJsProps(TypedDict):
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    color: NotRequired[JS]
    collapse_icon: NotRequired[JS]  # Mapped from 'collapseIcon'
    expand_icon: NotRequired[JS]  # Mapped from 'expandIcon'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    fluid: NotRequired[JS]
    subgroup: NotRequired[JS]
    title: NotRequired[JS]
    value: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListGroupProps(TypedDict):
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    collapse_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'collapseIcon'
    expand_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'expandIcon'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    fluid: NotRequired[Annotated[bool, PropMeta(required=False)]]
    subgroup: NotRequired[Annotated[bool, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListGroupJsProps, PropMeta(required=False)]]


AListGroupCls = Component[EmptyTuple, AListGroupProps, AListGroupSlots, Any, Any, Any]

AListGroupAlpineCls = AlpineComponent[EmptyTuple, AListGroupProps, AListGroupSlots, Any, Any, Any]


class AListGroupActivatorSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListGroupActivatorJsProps(TypedDict):
    spread: NotRequired[JS]


class AListGroupActivatorProps(TypedDict):
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListGroupActivatorJsProps, PropMeta(required=False)]]


AListGroupActivatorCls = Component[EmptyTuple, AListGroupActivatorProps, AListGroupActivatorSlots, Any, Any, Any]

AListGroupActivatorAlpineCls = AlpineComponent[EmptyTuple, AListGroupActivatorProps, AListGroupActivatorSlots, Any, Any, Any]


class AListImgSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListImgJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListImgProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListImgJsProps, PropMeta(required=False)]]


AListImgCls = Component[EmptyTuple, AListImgProps, AListImgSlots, Any, Any, Any]

AListImgAlpineCls = AlpineComponent[EmptyTuple, AListImgProps, AListImgSlots, Any, Any, Any]


class AListItemSlots(TypedDict):
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]


class AListItemJsProps(TypedDict):
    active: NotRequired[JS]
    active_class: NotRequired[JS]  # Mapped from 'activeClass'
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    append_avatar: NotRequired[JS]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    disabled: NotRequired[JS]
    lines: NotRequired[JS]
    link: NotRequired[JS]
    nav: NotRequired[JS]
    prepend_avatar: NotRequired[JS]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    ripple: NotRequired[JS]
    slim: NotRequired[JS]
    subtitle: NotRequired[JS]
    title: NotRequired[JS]
    value: NotRequired[JS]
    on_click: NotRequired[JS]  # Mapped from 'onClick'
    on_click_once: NotRequired[JS]  # Mapped from 'onClickOnce'
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AListItemProps(TypedDict):
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    active_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeClass'
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    append_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'appendAvatar'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    lines: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    link: NotRequired[Annotated[bool, PropMeta(required=False)]]
    nav: NotRequired[Annotated[bool, PropMeta(required=False)]]
    prepend_avatar: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prependAvatar'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    slim: NotRequired[Annotated[bool, PropMeta(required=False)]]
    subtitle: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    title: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    on_click: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick'
    on_click_once: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClickOnce'
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListItemJsProps, PropMeta(required=False)]]


AListItemCls = Component[EmptyTuple, AListItemProps, AListItemSlots, Any, Any, Any]

AListItemAlpineCls = AlpineComponent[EmptyTuple, AListItemProps, AListItemSlots, Any, Any, Any]


class AListItemActionSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListItemActionJsProps(TypedDict):
    start: NotRequired[JS]
    end: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListItemActionProps(TypedDict):
    start: NotRequired[Annotated[bool, PropMeta(required=False)]]
    end: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListItemActionJsProps, PropMeta(required=False)]]


AListItemActionCls = Component[EmptyTuple, AListItemActionProps, AListItemActionSlots, Any, Any, Any]

AListItemActionAlpineCls = AlpineComponent[EmptyTuple, AListItemActionProps, AListItemActionSlots, Any, Any, Any]


class AListItemMediaSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListItemMediaJsProps(TypedDict):
    start: NotRequired[JS]
    end: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListItemMediaProps(TypedDict):
    start: NotRequired[Annotated[bool, PropMeta(required=False)]]
    end: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListItemMediaJsProps, PropMeta(required=False)]]


AListItemMediaCls = Component[EmptyTuple, AListItemMediaProps, AListItemMediaSlots, Any, Any, Any]

AListItemMediaAlpineCls = AlpineComponent[EmptyTuple, AListItemMediaProps, AListItemMediaSlots, Any, Any, Any]


class AListItemSubtitleSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListItemSubtitleJsProps(TypedDict):
    opacity: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListItemSubtitleProps(TypedDict):
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListItemSubtitleJsProps, PropMeta(required=False)]]


AListItemSubtitleCls = Component[EmptyTuple, AListItemSubtitleProps, AListItemSubtitleSlots, Any, Any, Any]

AListItemSubtitleAlpineCls = AlpineComponent[EmptyTuple, AListItemSubtitleProps, AListItemSubtitleSlots, Any, Any, Any]


class AListItemTitleSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListItemTitleJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListItemTitleProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListItemTitleJsProps, PropMeta(required=False)]]


AListItemTitleCls = Component[EmptyTuple, AListItemTitleProps, AListItemTitleSlots, Any, Any, Any]

AListItemTitleAlpineCls = AlpineComponent[EmptyTuple, AListItemTitleProps, AListItemTitleSlots, Any, Any, Any]


class AListSubheaderSlots(TypedDict):
    default: NotRequired[SlotContent]


class AListSubheaderJsProps(TypedDict):
    color: NotRequired[JS]
    inset: NotRequired[JS]
    sticky: NotRequired[JS]
    title: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AListSubheaderProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    inset: NotRequired[Annotated[bool, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AListSubheaderJsProps, PropMeta(required=False)]]


AListSubheaderCls = Component[EmptyTuple, AListSubheaderProps, AListSubheaderSlots, Any, Any, Any]

AListSubheaderAlpineCls = AlpineComponent[EmptyTuple, AListSubheaderProps, AListSubheaderSlots, Any, Any, Any]


class ALoaderSlotSlots(TypedDict):
    default: NotRequired[SlotContent]


class ALoaderSlotJsProps(TypedDict):
    absolute: NotRequired[JS]
    active: NotRequired[JS]
    name: NotRequired[JS]
    color: NotRequired[JS]
    spread: NotRequired[JS]


class ALoaderSlotProps(TypedDict):
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    active: NotRequired[Annotated[bool, PropMeta(required=True)]]
    name: NotRequired[Annotated[str, PropMeta(required=True)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALoaderSlotJsProps, PropMeta(required=False)]]


ALoaderSlotCls = Component[EmptyTuple, ALoaderSlotProps, ALoaderSlotSlots, Any, Any, Any]

ALoaderSlotAlpineCls = AlpineComponent[EmptyTuple, ALoaderSlotProps, ALoaderSlotSlots, Any, Any, Any]


class ALocaleProviderSlots(TypedDict):
    default: NotRequired[SlotContent]


class ALocaleProviderJsProps(TypedDict):
    locale: NotRequired[JS]
    fallback_locale: NotRequired[JS]  # Mapped from 'fallbackLocale'
    messages: NotRequired[JS]
    rtl: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ALocaleProviderProps(TypedDict):
    locale: NotRequired[Annotated[str, PropMeta(required=False)]]
    fallback_locale: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'fallbackLocale'
    messages: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    rtl: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ALocaleProviderJsProps, PropMeta(required=False)]]


ALocaleProviderCls = Component[EmptyTuple, ALocaleProviderProps, ALocaleProviderSlots, Any, Any, Any]

ALocaleProviderAlpineCls = AlpineComponent[EmptyTuple, ALocaleProviderProps, ALocaleProviderSlots, Any, Any, Any]


class AMainSlots(TypedDict):
    default: NotRequired[SlotContent]


class AMainJsProps(TypedDict):
    scrollable: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    spread: NotRequired[JS]


class AMainProps(TypedDict):
    scrollable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AMainJsProps, PropMeta(required=False)]]


AMainCls = Component[EmptyTuple, AMainProps, AMainSlots, Any, Any, Any]

AMainAlpineCls = AlpineComponent[EmptyTuple, AMainProps, AMainSlots, Any, Any, Any]


class AMdIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class AMdIconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class AMdIconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AMdIconJsProps, PropMeta(required=False)]]


AMdIconCls = Component[EmptyTuple, AMdIconProps, AMdIconSlots, Any, Any, Any]

AMdIconAlpineCls = AlpineComponent[EmptyTuple, AMdIconProps, AMdIconSlots, Any, Any, Any]


class AMdiIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class AMdiIconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class AMdiIconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AMdiIconJsProps, PropMeta(required=False)]]


AMdiIconCls = Component[EmptyTuple, AMdiIconProps, AMdiIconSlots, Any, Any, Any]

AMdiIconAlpineCls = AlpineComponent[EmptyTuple, AMdiIconProps, AMdiIconSlots, Any, Any, Any]


class AMenuSlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class AMenuJsProps(TypedDict):
    id: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    no_click_animation: NotRequired[JS]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    persistent: NotRequired[JS]
    scrim: NotRequired[JS]
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    location: NotRequired[JS]
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    scroll_strategy: NotRequired[JS]  # Mapped from 'scrollStrategy'
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AMenuProps(TypedDict):
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    no_click_animation: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    persistent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    scroll_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollStrategy'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AMenuJsProps, PropMeta(required=False)]]


AMenuCls = Component[EmptyTuple, AMenuProps, AMenuSlots, Any, Any, Any]

AMenuAlpineCls = AlpineComponent[EmptyTuple, AMenuProps, AMenuSlots, Any, Any, Any]


class AMessagesSlots(TypedDict):
    message: NotRequired[SlotContent]


class AMessagesJsProps(TypedDict):
    active: NotRequired[JS]
    color: NotRequired[JS]
    messages: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AMessagesProps(TypedDict):
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AMessagesJsProps, PropMeta(required=False)]]


AMessagesCls = Component[EmptyTuple, AMessagesProps, AMessagesSlots, Any, Any, Any]

AMessagesAlpineCls = AlpineComponent[EmptyTuple, AMessagesProps, AMessagesSlots, Any, Any, Any]


class ANavigationDrawerSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    image: NotRequired[SlotContent]


class ANavigationDrawerJsProps(TypedDict):
    color: NotRequired[JS]
    disable_resize_watcher: NotRequired[JS]  # Mapped from 'disableResizeWatcher'
    disable_route_watcher: NotRequired[JS]  # Mapped from 'disableRouteWatcher'
    expand_on_hover: NotRequired[JS]  # Mapped from 'expandOnHover'
    floating: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    permanent: NotRequired[JS]
    rail: NotRequired[JS]
    rail_width: NotRequired[JS]  # Mapped from 'railWidth'
    scrim: NotRequired[JS]
    image: NotRequired[JS]
    temporary: NotRequired[JS]
    persistent: NotRequired[JS]
    touchless: NotRequired[JS]
    width: NotRequired[JS]
    location: NotRequired[JS]
    sticky: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    elevation: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    absolute: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ANavigationDrawerProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disable_resize_watcher: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'disableResizeWatcher'
    disable_route_watcher: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'disableRouteWatcher'
    expand_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'expandOnHover'
    floating: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    permanent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rail: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rail_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'railWidth'
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    image: NotRequired[Annotated[str, PropMeta(required=False)]]
    temporary: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    touchless: NotRequired[Annotated[bool, PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    sticky: NotRequired[Annotated[bool, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ANavigationDrawerJsProps, PropMeta(required=False)]]


ANavigationDrawerCls = Component[EmptyTuple, ANavigationDrawerProps, ANavigationDrawerSlots, Any, Any, Any]

ANavigationDrawerAlpineCls = AlpineComponent[EmptyTuple, ANavigationDrawerProps, ANavigationDrawerSlots, Any, Any, Any]


class ANoSsrSlots(TypedDict):
    default: NotRequired[SlotContent]


class ANoSsrJsProps(TypedDict):
    spread: NotRequired[JS]


class ANoSsrProps(TypedDict):
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ANoSsrJsProps, PropMeta(required=False)]]


ANoSsrCls = Component[EmptyTuple, ANoSsrProps, ANoSsrSlots, Any, Any, Any]

ANoSsrAlpineCls = AlpineComponent[EmptyTuple, ANoSsrProps, ANoSsrSlots, Any, Any, Any]


class AOtpInputSlots(TypedDict):
    default: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class AOtpInputJsProps(TypedDict):
    autofocus: NotRequired[JS]
    divider: NotRequired[JS]
    focus_all: NotRequired[JS]  # Mapped from 'focusAll'
    label: NotRequired[JS]
    length: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    placeholder: NotRequired[JS]
    type: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    klass: NotRequired[JS]  # Mapped from 'class'
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    style: NotRequired[JS]
    theme: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AOtpInputProps(TypedDict):
    autofocus: NotRequired[Annotated[bool, PropMeta(required=False)]]
    divider: NotRequired[Annotated[str, PropMeta(required=False)]]
    focus_all: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'focusAll'
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    length: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'modelValue'
    placeholder: NotRequired[Annotated[str, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AOtpInputJsProps, PropMeta(required=False)]]


AOtpInputCls = Component[EmptyTuple, AOtpInputProps, AOtpInputSlots, Any, Any, Any]

AOtpInputAlpineCls = AlpineComponent[EmptyTuple, AOtpInputProps, AOtpInputSlots, Any, Any, Any]


class AOverlaySlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class AOverlayJsProps(TypedDict):
    absolute: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    no_click_animation: NotRequired[JS]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    persistent: NotRequired[JS]
    scrim: NotRequired[JS]
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    location: NotRequired[JS]
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    scroll_strategy: NotRequired[JS]  # Mapped from 'scrollStrategy'
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class AOverlayProps(TypedDict):
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    no_click_animation: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    persistent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    scroll_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollStrategy'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AOverlayJsProps, PropMeta(required=False)]]


AOverlayCls = Component[EmptyTuple, AOverlayProps, AOverlaySlots, Any, Any, Any]

AOverlayAlpineCls = AlpineComponent[EmptyTuple, AOverlayProps, AOverlaySlots, Any, Any, Any]


class APaginationSlots(TypedDict):
    item: NotRequired[SlotContent]
    first: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]
    last: NotRequired[SlotContent]


class APaginationJsProps(TypedDict):
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    start: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    disabled: NotRequired[JS]
    length: NotRequired[JS]
    total_visible: NotRequired[JS]  # Mapped from 'totalVisible'
    first_icon: NotRequired[JS]  # Mapped from 'firstIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    last_icon: NotRequired[JS]  # Mapped from 'lastIcon'
    aria_label: NotRequired[JS]  # Mapped from 'ariaLabel'
    page_aria_label: NotRequired[JS]  # Mapped from 'pageAriaLabel'
    current_page_aria_label: NotRequired[JS]  # Mapped from 'currentPageAriaLabel'
    first_aria_label: NotRequired[JS]  # Mapped from 'firstAriaLabel'
    previous_aria_label: NotRequired[JS]  # Mapped from 'previousAriaLabel'
    next_aria_label: NotRequired[JS]  # Mapped from 'nextAriaLabel'
    last_aria_label: NotRequired[JS]  # Mapped from 'lastAriaLabel'
    ellipsis: NotRequired[JS]
    show_first_last_page: NotRequired[JS]  # Mapped from 'showFirstLastPage'
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class APaginationProps(TypedDict):
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    start: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'modelValue'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    length: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    total_visible: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'totalVisible'
    first_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'firstIcon'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    last_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'lastIcon'
    aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'ariaLabel'
    page_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'pageAriaLabel'
    current_page_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'currentPageAriaLabel'
    first_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'firstAriaLabel'
    previous_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'previousAriaLabel'
    next_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'nextAriaLabel'
    last_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lastAriaLabel'
    ellipsis: NotRequired[Annotated[str, PropMeta(required=False)]]
    show_first_last_page: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showFirstLastPage'
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[APaginationJsProps, PropMeta(required=False)]]


APaginationCls = Component[EmptyTuple, APaginationProps, APaginationSlots, Any, Any, Any]

APaginationAlpineCls = AlpineComponent[EmptyTuple, APaginationProps, APaginationSlots, Any, Any, Any]


class AParallaxSlots(TypedDict):
    default: NotRequired[SlotContent]
    placeholder: NotRequired[SlotContent]
    error: NotRequired[SlotContent]
    sources: NotRequired[SlotContent]


class AParallaxJsProps(TypedDict):
    scale: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AParallaxProps(TypedDict):
    scale: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AParallaxJsProps, PropMeta(required=False)]]


AParallaxCls = Component[EmptyTuple, AParallaxProps, AParallaxSlots, Any, Any, Any]

AParallaxAlpineCls = AlpineComponent[EmptyTuple, AParallaxProps, AParallaxSlots, Any, Any, Any]


class APickerSlots(TypedDict):
    header: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    actions: NotRequired[SlotContent]
    title: NotRequired[SlotContent]


class APickerJsProps(TypedDict):
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    landscape: NotRequired[JS]
    title: NotRequired[JS]
    hide_header: NotRequired[JS]  # Mapped from 'hideHeader'
    color: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class APickerProps(TypedDict):
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    landscape: NotRequired[Annotated[bool, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    hide_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideHeader'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[APickerJsProps, PropMeta(required=False)]]


APickerCls = Component[EmptyTuple, APickerProps, APickerSlots, Any, Any, Any]

APickerAlpineCls = AlpineComponent[EmptyTuple, APickerProps, APickerSlots, Any, Any, Any]


class APickerTitleSlots(TypedDict):
    default: NotRequired[SlotContent]


class APickerTitleJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class APickerTitleProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[APickerTitleJsProps, PropMeta(required=False)]]


APickerTitleCls = Component[EmptyTuple, APickerTitleProps, APickerTitleSlots, Any, Any, Any]

APickerTitleAlpineCls = AlpineComponent[EmptyTuple, APickerTitleProps, APickerTitleSlots, Any, Any, Any]


class AProgressCircularSlots(TypedDict):
    default: NotRequired[SlotContent]


class AProgressCircularJsProps(TypedDict):
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    color: NotRequired[JS]
    indeterminate: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    rotate: NotRequired[JS]
    width: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AProgressCircularProps(TypedDict):
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    indeterminate: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'modelValue'
    rotate: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AProgressCircularJsProps, PropMeta(required=False)]]


AProgressCircularCls = Component[EmptyTuple, AProgressCircularProps, AProgressCircularSlots, Any, Any, Any]

AProgressCircularAlpineCls = AlpineComponent[EmptyTuple, AProgressCircularProps, AProgressCircularSlots, Any, Any, Any]


class AProgressLinearSlots(TypedDict):
    default: NotRequired[SlotContent]


class AProgressLinearJsProps(TypedDict):
    absolute: NotRequired[JS]
    active: NotRequired[JS]
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    bg_opacity: NotRequired[JS]  # Mapped from 'bgOpacity'
    buffer_value: NotRequired[JS]  # Mapped from 'bufferValue'
    buffer_color: NotRequired[JS]  # Mapped from 'bufferColor'
    buffer_opacity: NotRequired[JS]  # Mapped from 'bufferOpacity'
    clickable: NotRequired[JS]
    color: NotRequired[JS]
    height: NotRequired[JS]
    indeterminate: NotRequired[JS]
    max: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    opacity: NotRequired[JS]
    reverse: NotRequired[JS]
    stream: NotRequired[JS]
    striped: NotRequired[JS]
    rounded_bar: NotRequired[JS]  # Mapped from 'roundedBar'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    location: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AProgressLinearProps(TypedDict):
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    bg_opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'bgOpacity'
    buffer_value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'bufferValue'
    buffer_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bufferColor'
    buffer_opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'bufferOpacity'
    clickable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    indeterminate: NotRequired[Annotated[bool, PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'modelValue'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    stream: NotRequired[Annotated[bool, PropMeta(required=False)]]
    striped: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rounded_bar: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'roundedBar'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AProgressLinearJsProps, PropMeta(required=False)]]


AProgressLinearCls = Component[EmptyTuple, AProgressLinearProps, AProgressLinearSlots, Any, Any, Any]

AProgressLinearAlpineCls = AlpineComponent[EmptyTuple, AProgressLinearProps, AProgressLinearSlots, Any, Any, Any]


class ARadioSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    input: NotRequired[SlotContent]


class ARadioJsProps(TypedDict):
    label: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    true_value: NotRequired[JS]  # Mapped from 'trueValue'
    false_value: NotRequired[JS]  # Mapped from 'falseValue'
    value: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    error: NotRequired[JS]
    id: NotRequired[JS]
    inline: NotRequired[JS]
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    multiple: NotRequired[JS]
    name: NotRequired[JS]
    readonly: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    density: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ARadioProps(TypedDict):
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    true_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'trueValue'
    false_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'falseValue'
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ARadioJsProps, PropMeta(required=False)]]


ARadioCls = Component[EmptyTuple, ARadioProps, ARadioSlots, Any, Any, Any]

ARadioAlpineCls = AlpineComponent[EmptyTuple, ARadioProps, ARadioSlots, Any, Any, Any]


class ARadioGroupSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]


class ARadioGroupJsProps(TypedDict):
    height: NotRequired[JS]
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    color: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    inline: NotRequired[JS]
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    spread: NotRequired[JS]


class ARadioGroupProps(TypedDict):
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ARadioGroupJsProps, PropMeta(required=False)]]


ARadioGroupCls = Component[EmptyTuple, ARadioGroupProps, ARadioGroupSlots, Any, Any, Any]

ARadioGroupAlpineCls = AlpineComponent[EmptyTuple, ARadioGroupProps, ARadioGroupSlots, Any, Any, Any]


class ARangeSliderSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    thumb_label: NotRequired[SlotContent]  # Mapped from 'thumb-label'
    tick_label: NotRequired[SlotContent]  # Mapped from 'tick-label'


class ARangeSliderJsProps(TypedDict):
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    max: NotRequired[JS]
    min: NotRequired[JS]
    step: NotRequired[JS]
    thumb_color: NotRequired[JS]  # Mapped from 'thumbColor'
    thumb_label: NotRequired[JS]  # Mapped from 'thumbLabel'
    thumb_size: NotRequired[JS]  # Mapped from 'thumbSize'
    show_ticks: NotRequired[JS]  # Mapped from 'showTicks'
    ticks: NotRequired[JS]
    tick_size: NotRequired[JS]  # Mapped from 'tickSize'
    color: NotRequired[JS]
    track_color: NotRequired[JS]  # Mapped from 'trackColor'
    track_fill_color: NotRequired[JS]  # Mapped from 'trackFillColor'
    track_size: NotRequired[JS]  # Mapped from 'trackSize'
    reverse: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    elevation: NotRequired[JS]
    ripple: NotRequired[JS]
    strict: NotRequired[JS]
    spread: NotRequired[JS]


class ARangeSliderProps(TypedDict):
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    max: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    min: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    step: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    thumb_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'thumbColor'
    thumb_label: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'thumbLabel'
    thumb_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'thumbSize'
    show_ticks: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showTicks'
    ticks: NotRequired[Annotated[Union[List, Dict], PropMeta(required=False)]]
    tick_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'tickSize'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    track_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'trackColor'
    track_fill_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'trackFillColor'
    track_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'trackSize'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    ripple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    strict: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ARangeSliderJsProps, PropMeta(required=False)]]


ARangeSliderCls = Component[EmptyTuple, ARangeSliderProps, ARangeSliderSlots, Any, Any, Any]

ARangeSliderAlpineCls = AlpineComponent[EmptyTuple, ARangeSliderProps, ARangeSliderSlots, Any, Any, Any]


class ARatingSlots(TypedDict):
    item: NotRequired[SlotContent]
    item_label: NotRequired[SlotContent]  # Mapped from 'item-label'


class ARatingJsProps(TypedDict):
    name: NotRequired[JS]
    item_aria_label: NotRequired[JS]  # Mapped from 'itemAriaLabel'
    active_color: NotRequired[JS]  # Mapped from 'activeColor'
    color: NotRequired[JS]
    clearable: NotRequired[JS]
    disabled: NotRequired[JS]
    empty_icon: NotRequired[JS]  # Mapped from 'emptyIcon'
    full_icon: NotRequired[JS]  # Mapped from 'fullIcon'
    half_increments: NotRequired[JS]  # Mapped from 'halfIncrements'
    hover: NotRequired[JS]
    length: NotRequired[JS]
    readonly: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    item_labels: NotRequired[JS]  # Mapped from 'itemLabels'
    item_label_position: NotRequired[JS]  # Mapped from 'itemLabelPosition'
    ripple: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ARatingProps(TypedDict):
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    item_aria_label: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemAriaLabel'
    active_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'activeColor'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    empty_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'emptyIcon'
    full_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'fullIcon'
    half_increments: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'halfIncrements'
    hover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    length: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'modelValue'
    item_labels: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'itemLabels'
    item_label_position: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemLabelPosition'
    ripple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ARatingJsProps, PropMeta(required=False)]]


ARatingCls = Component[EmptyTuple, ARatingProps, ARatingSlots, Any, Any, Any]

ARatingAlpineCls = AlpineComponent[EmptyTuple, ARatingProps, ARatingSlots, Any, Any, Any]


class AResponsiveSlots(TypedDict):
    default: NotRequired[SlotContent]
    additional: NotRequired[SlotContent]


class AResponsiveJsProps(TypedDict):
    aspect_ratio: NotRequired[JS]  # Mapped from 'aspectRatio'
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    inline: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    spread: NotRequired[JS]


class AResponsiveProps(TypedDict):
    aspect_ratio: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'aspectRatio'
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AResponsiveJsProps, PropMeta(required=False)]]


AResponsiveCls = Component[EmptyTuple, AResponsiveProps, AResponsiveSlots, Any, Any, Any]

AResponsiveAlpineCls = AlpineComponent[EmptyTuple, AResponsiveProps, AResponsiveSlots, Any, Any, Any]


class ARowSlots(TypedDict):
    default: NotRequired[SlotContent]


class ARowJsProps(TypedDict):
    dense: NotRequired[JS]
    no_gutters: NotRequired[JS]  # Mapped from 'noGutters'
    align: NotRequired[JS]
    align_sm: NotRequired[JS]  # Mapped from 'alignSm'
    align_md: NotRequired[JS]  # Mapped from 'alignMd'
    align_lg: NotRequired[JS]  # Mapped from 'alignLg'
    align_xl: NotRequired[JS]  # Mapped from 'alignXl'
    align_xxl: NotRequired[JS]  # Mapped from 'alignXxl'
    justify: NotRequired[JS]
    justify_sm: NotRequired[JS]  # Mapped from 'justifySm'
    justify_md: NotRequired[JS]  # Mapped from 'justifyMd'
    justify_lg: NotRequired[JS]  # Mapped from 'justifyLg'
    justify_xl: NotRequired[JS]  # Mapped from 'justifyXl'
    justify_xxl: NotRequired[JS]  # Mapped from 'justifyXxl'
    align_content: NotRequired[JS]  # Mapped from 'alignContent'
    align_content_sm: NotRequired[JS]  # Mapped from 'alignContentSm'
    align_content_md: NotRequired[JS]  # Mapped from 'alignContentMd'
    align_content_lg: NotRequired[JS]  # Mapped from 'alignContentLg'
    align_content_xl: NotRequired[JS]  # Mapped from 'alignContentXl'
    align_content_xxl: NotRequired[JS]  # Mapped from 'alignContentXxl'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ARowProps(TypedDict):
    dense: NotRequired[Annotated[bool, PropMeta(required=False)]]
    no_gutters: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noGutters'
    align: NotRequired[Annotated[str, PropMeta(required=False)]]
    align_sm: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignSm'
    align_md: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignMd'
    align_lg: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignLg'
    align_xl: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignXl'
    align_xxl: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignXxl'
    justify: NotRequired[Annotated[str, PropMeta(required=False)]]
    justify_sm: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'justifySm'
    justify_md: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'justifyMd'
    justify_lg: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'justifyLg'
    justify_xl: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'justifyXl'
    justify_xxl: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'justifyXxl'
    align_content: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignContent'
    align_content_sm: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignContentSm'
    align_content_md: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignContentMd'
    align_content_lg: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignContentLg'
    align_content_xl: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignContentXl'
    align_content_xxl: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignContentXxl'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ARowJsProps, PropMeta(required=False)]]


ARowCls = Component[EmptyTuple, ARowProps, ARowSlots, Any, Any, Any]

ARowAlpineCls = AlpineComponent[EmptyTuple, ARowProps, ARowSlots, Any, Any, Any]


class ASelectSlots(TypedDict):
    item: NotRequired[SlotContent]
    chip: NotRequired[SlotContent]
    selection: NotRequired[SlotContent]
    prepend_item: NotRequired[SlotContent]  # Mapped from 'prepend-item'
    append_item: NotRequired[SlotContent]  # Mapped from 'append-item'
    no_data: NotRequired[SlotContent]  # Mapped from 'no-data'
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class ASelectJsProps(TypedDict):
    chips: NotRequired[JS]
    closable_chips: NotRequired[JS]  # Mapped from 'closableChips'
    close_text: NotRequired[JS]  # Mapped from 'closeText'
    open_text: NotRequired[JS]  # Mapped from 'openText'
    eager: NotRequired[JS]
    hide_no_data: NotRequired[JS]  # Mapped from 'hideNoData'
    hide_selected: NotRequired[JS]  # Mapped from 'hideSelected'
    list_props: NotRequired[JS]  # Mapped from 'listProps'
    menu: NotRequired[JS]
    menu_icon: NotRequired[JS]  # Mapped from 'menuIcon'
    menu_props: NotRequired[JS]  # Mapped from 'menuProps'
    multiple: NotRequired[JS]
    no_data_text: NotRequired[JS]  # Mapped from 'noDataText'
    open_on_clear: NotRequired[JS]  # Mapped from 'openOnClear'
    item_color: NotRequired[JS]  # Mapped from 'itemColor'
    items: NotRequired[JS]
    item_title: NotRequired[JS]  # Mapped from 'itemTitle'
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    item_children: NotRequired[JS]  # Mapped from 'itemChildren'
    item_props: NotRequired[JS]  # Mapped from 'itemProps'
    return_object: NotRequired[JS]  # Mapped from 'returnObject'
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    autofocus: NotRequired[JS]
    counter: NotRequired[JS]
    counter_value: NotRequired[JS]  # Mapped from 'counterValue'
    prefix: NotRequired[JS]
    placeholder: NotRequired[JS]
    persistent_placeholder: NotRequired[JS]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[JS]  # Mapped from 'persistentCounter'
    suffix: NotRequired[JS]
    role: NotRequired[JS]
    type: NotRequired[JS]
    model_modifiers: NotRequired[JS]  # Mapped from 'modelModifiers'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    flat: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    transition: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ASelectProps(TypedDict):
    chips: NotRequired[Annotated[bool, PropMeta(required=False)]]
    closable_chips: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closableChips'
    close_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'closeText'
    open_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'openText'
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    hide_no_data: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideNoData'
    hide_selected: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSelected'
    list_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'listProps'
    menu: NotRequired[Annotated[bool, PropMeta(required=False)]]
    menu_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'menuIcon'
    menu_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'menuProps'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    no_data_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'noDataText'
    open_on_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClear'
    item_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemColor'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_title: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemTitle'
    item_value: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]  # Mapped from 'itemValue'
    item_children: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemChildren'
    item_props: NotRequired[Annotated[Union[bool, str, List], PropMeta(required=False)]]  # Mapped from 'itemProps'
    return_object: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'returnObject'
    autofocus: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    counter_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'counterValue'
    prefix: NotRequired[Annotated[str, PropMeta(required=False)]]
    placeholder: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_placeholder: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentCounter'
    suffix: NotRequired[Annotated[str, PropMeta(required=False)]]
    role: NotRequired[Annotated[str, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_modifiers: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'modelModifiers'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASelectJsProps, PropMeta(required=False)]]


ASelectCls = Component[EmptyTuple, ASelectProps, ASelectSlots, Any, Any, Any]

ASelectAlpineCls = AlpineComponent[EmptyTuple, ASelectProps, ASelectSlots, Any, Any, Any]


class ASelectionControlSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    input: NotRequired[SlotContent]


class ASelectionControlJsProps(TypedDict):
    label: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    true_value: NotRequired[JS]  # Mapped from 'trueValue'
    false_value: NotRequired[JS]  # Mapped from 'falseValue'
    value: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    error: NotRequired[JS]
    id: NotRequired[JS]
    inline: NotRequired[JS]
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    multiple: NotRequired[JS]
    name: NotRequired[JS]
    readonly: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    density: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ASelectionControlProps(TypedDict):
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    true_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'trueValue'
    false_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'falseValue'
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASelectionControlJsProps, PropMeta(required=False)]]


ASelectionControlCls = Component[EmptyTuple, ASelectionControlProps, ASelectionControlSlots, Any, Any, Any]

ASelectionControlAlpineCls = AlpineComponent[EmptyTuple, ASelectionControlProps, ASelectionControlSlots, Any, Any, Any]


class ASelectionControlGroupSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASelectionControlGroupJsProps(TypedDict):
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    error: NotRequired[JS]
    id: NotRequired[JS]
    inline: NotRequired[JS]
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    multiple: NotRequired[JS]
    name: NotRequired[JS]
    readonly: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ASelectionControlGroupProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASelectionControlGroupJsProps, PropMeta(required=False)]]


ASelectionControlGroupCls = Component[EmptyTuple, ASelectionControlGroupProps, ASelectionControlGroupSlots, Any, Any, Any]

ASelectionControlGroupAlpineCls = AlpineComponent[EmptyTuple, ASelectionControlGroupProps, ASelectionControlGroupSlots, Any, Any, Any]


class ASheetSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASheetJsProps(TypedDict):
    color: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ASheetProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASheetJsProps, PropMeta(required=False)]]


ASheetCls = Component[EmptyTuple, ASheetProps, ASheetSlots, Any, Any, Any]

ASheetAlpineCls = AlpineComponent[EmptyTuple, ASheetProps, ASheetSlots, Any, Any, Any]


class ASkeletonLoaderSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASkeletonLoaderJsProps(TypedDict):
    boilerplate: NotRequired[JS]
    color: NotRequired[JS]
    loading: NotRequired[JS]
    loading_text: NotRequired[JS]  # Mapped from 'loadingText'
    type: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ASkeletonLoaderProps(TypedDict):
    boilerplate: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    loading: NotRequired[Annotated[bool, PropMeta(required=False)]]
    loading_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'loadingText'
    type: NotRequired[Annotated[Union[str, List], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASkeletonLoaderJsProps, PropMeta(required=False)]]


ASkeletonLoaderCls = Component[EmptyTuple, ASkeletonLoaderProps, ASkeletonLoaderSlots, Any, Any, Any]

ASkeletonLoaderAlpineCls = AlpineComponent[EmptyTuple, ASkeletonLoaderProps, ASkeletonLoaderSlots, Any, Any, Any]


class ASlideGroupSlots(TypedDict):
    default: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]


class ASlideGroupJsProps(TypedDict):
    center_active: NotRequired[JS]  # Mapped from 'centerActive'
    direction: NotRequired[JS]
    symbol: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    show_arrows: NotRequired[JS]  # Mapped from 'showArrows'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    spread: NotRequired[JS]


class ASlideGroupProps(TypedDict):
    center_active: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerActive'
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    symbol: NotRequired[Annotated[Any, PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    show_arrows: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showArrows'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASlideGroupJsProps, PropMeta(required=False)]]


ASlideGroupCls = Component[EmptyTuple, ASlideGroupProps, ASlideGroupSlots, Any, Any, Any]

ASlideGroupAlpineCls = AlpineComponent[EmptyTuple, ASlideGroupProps, ASlideGroupSlots, Any, Any, Any]


class ASlideGroupItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASlideGroupItemJsProps(TypedDict):
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    spread: NotRequired[JS]


class ASlideGroupItemProps(TypedDict):
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASlideGroupItemJsProps, PropMeta(required=False)]]


ASlideGroupItemCls = Component[EmptyTuple, ASlideGroupItemProps, ASlideGroupItemSlots, Any, Any, Any]

ASlideGroupItemAlpineCls = AlpineComponent[EmptyTuple, ASlideGroupItemProps, ASlideGroupItemSlots, Any, Any, Any]


class ASliderSlots(TypedDict):
    label: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    thumb_label: NotRequired[SlotContent]  # Mapped from 'thumb-label'
    tick_label: NotRequired[SlotContent]  # Mapped from 'tick-label'


class ASliderJsProps(TypedDict):
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    readonly: NotRequired[JS]
    max: NotRequired[JS]
    min: NotRequired[JS]
    step: NotRequired[JS]
    thumb_color: NotRequired[JS]  # Mapped from 'thumbColor'
    thumb_label: NotRequired[JS]  # Mapped from 'thumbLabel'
    thumb_size: NotRequired[JS]  # Mapped from 'thumbSize'
    show_ticks: NotRequired[JS]  # Mapped from 'showTicks'
    ticks: NotRequired[JS]
    tick_size: NotRequired[JS]  # Mapped from 'tickSize'
    color: NotRequired[JS]
    track_color: NotRequired[JS]  # Mapped from 'trackColor'
    track_fill_color: NotRequired[JS]  # Mapped from 'trackFillColor'
    track_size: NotRequired[JS]  # Mapped from 'trackSize'
    direction: NotRequired[JS]
    reverse: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    elevation: NotRequired[JS]
    ripple: NotRequired[JS]
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    spread: NotRequired[JS]


class ASliderProps(TypedDict):
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    min: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    step: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    thumb_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'thumbColor'
    thumb_label: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'thumbLabel'
    thumb_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'thumbSize'
    show_ticks: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showTicks'
    ticks: NotRequired[Annotated[Union[List, Dict], PropMeta(required=False)]]
    tick_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'tickSize'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    track_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'trackColor'
    track_fill_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'trackFillColor'
    track_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'trackSize'
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    ripple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASliderJsProps, PropMeta(required=False)]]


ASliderCls = Component[EmptyTuple, ASliderProps, ASliderSlots, Any, Any, Any]

ASliderAlpineCls = AlpineComponent[EmptyTuple, ASliderProps, ASliderSlots, Any, Any, Any]


class ASliderThumbSlots(TypedDict):
    thumb_label: NotRequired[SlotContent]  # Mapped from 'thumb-label'


class ASliderThumbJsProps(TypedDict):
    focused: NotRequired[JS]
    max: NotRequired[JS]
    min: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    position: NotRequired[JS]
    ripple: NotRequired[JS]
    name: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ASliderThumbProps(TypedDict):
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=True)]]
    min: NotRequired[Annotated[Union[int, float], PropMeta(required=True)]]
    model_value: NotRequired[Annotated[Union[int, float], PropMeta(required=True)]]  # Mapped from 'modelValue'
    position: NotRequired[Annotated[Union[int, float], PropMeta(required=True)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASliderThumbJsProps, PropMeta(required=False)]]


ASliderThumbCls = Component[EmptyTuple, ASliderThumbProps, ASliderThumbSlots, Any, Any, Any]

ASliderThumbAlpineCls = AlpineComponent[EmptyTuple, ASliderThumbProps, ASliderThumbSlots, Any, Any, Any]


class ASliderTrackSlots(TypedDict):
    tick_label: NotRequired[SlotContent]  # Mapped from 'tick-label'


class ASliderTrackJsProps(TypedDict):
    start: NotRequired[JS]
    stop: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ASliderTrackProps(TypedDict):
    start: NotRequired[Annotated[Union[int, float], PropMeta(required=True)]]
    stop: NotRequired[Annotated[Union[int, float], PropMeta(required=True)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASliderTrackJsProps, PropMeta(required=False)]]


ASliderTrackCls = Component[EmptyTuple, ASliderTrackProps, ASliderTrackSlots, Any, Any, Any]

ASliderTrackAlpineCls = AlpineComponent[EmptyTuple, ASliderTrackProps, ASliderTrackSlots, Any, Any, Any]


class ASnackbarSlots(TypedDict):
    activator: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    actions: NotRequired[SlotContent]
    text: NotRequired[SlotContent]


class ASnackbarJsProps(TypedDict):
    multi_line: NotRequired[JS]  # Mapped from 'multiLine'
    text: NotRequired[JS]
    timer: NotRequired[JS]
    timeout: NotRequired[JS]
    vertical: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    theme: NotRequired[JS]
    absolute: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ASnackbarProps(TypedDict):
    multi_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'multiLine'
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    timer: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    timeout: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    vertical: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASnackbarJsProps, PropMeta(required=False)]]


ASnackbarCls = Component[EmptyTuple, ASnackbarProps, ASnackbarSlots, Any, Any, Any]

ASnackbarAlpineCls = AlpineComponent[EmptyTuple, ASnackbarProps, ASnackbarSlots, Any, Any, Any]


class ASpacerSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASpacerJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class ASpacerProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASpacerJsProps, PropMeta(required=False)]]


ASpacerCls = Component[EmptyTuple, ASpacerProps, ASpacerSlots, Any, Any, Any]

ASpacerAlpineCls = AlpineComponent[EmptyTuple, ASpacerProps, ASpacerSlots, Any, Any, Any]


class ASparklineSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]


class ASparklineJsProps(TypedDict):
    type: NotRequired[JS]
    auto_line_width: NotRequired[JS]  # Mapped from 'autoLineWidth'
    auto_draw: NotRequired[JS]  # Mapped from 'autoDraw'
    auto_draw_duration: NotRequired[JS]  # Mapped from 'autoDrawDuration'
    auto_draw_easing: NotRequired[JS]  # Mapped from 'autoDrawEasing'
    color: NotRequired[JS]
    gradient: NotRequired[JS]
    gradient_direction: NotRequired[JS]  # Mapped from 'gradientDirection'
    height: NotRequired[JS]
    labels: NotRequired[JS]
    label_size: NotRequired[JS]  # Mapped from 'labelSize'
    line_width: NotRequired[JS]  # Mapped from 'lineWidth'
    id: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    min: NotRequired[JS]
    max: NotRequired[JS]
    padding: NotRequired[JS]
    show_labels: NotRequired[JS]  # Mapped from 'showLabels'
    smooth: NotRequired[JS]
    width: NotRequired[JS]
    fill: NotRequired[JS]
    spread: NotRequired[JS]


class ASparklineProps(TypedDict):
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    auto_line_width: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'autoLineWidth'
    auto_draw: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'autoDraw'
    auto_draw_duration: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'autoDrawDuration'
    auto_draw_easing: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'autoDrawEasing'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    gradient: NotRequired[Annotated[List, PropMeta(required=False)]]
    gradient_direction: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'gradientDirection'
    height: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    labels: NotRequired[Annotated[List, PropMeta(required=False)]]
    label_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'labelSize'
    line_width: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'lineWidth'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemValue'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    min: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    padding: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    show_labels: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showLabels'
    smooth: NotRequired[Annotated[bool, PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    fill: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASparklineJsProps, PropMeta(required=False)]]


ASparklineCls = Component[EmptyTuple, ASparklineProps, ASparklineSlots, Any, Any, Any]

ASparklineAlpineCls = AlpineComponent[EmptyTuple, ASparklineProps, ASparklineSlots, Any, Any, Any]


class ASpeedDialSlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class ASpeedDialJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    id: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    no_click_animation: NotRequired[JS]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    persistent: NotRequired[JS]
    scrim: NotRequired[JS]
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    location: NotRequired[JS]
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    scroll_strategy: NotRequired[JS]  # Mapped from 'scrollStrategy'
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ASpeedDialProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    no_click_animation: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    persistent: NotRequired[Annotated[bool, PropMeta(required=False)]]
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    scroll_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollStrategy'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASpeedDialJsProps, PropMeta(required=False)]]


ASpeedDialCls = Component[EmptyTuple, ASpeedDialProps, ASpeedDialSlots, Any, Any, Any]

ASpeedDialAlpineCls = AlpineComponent[EmptyTuple, ASpeedDialProps, ASpeedDialSlots, Any, Any, Any]


class AStepperSlots(TypedDict):
    actions: NotRequired[SlotContent]
    default: NotRequired[SlotContent]
    header: NotRequired[SlotContent]
    header_item: NotRequired[SlotContent]  # Mapped from 'header-item'
    icon: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]
    item: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]
    # header_item_<name>: NotRequired[SlotContent]  # Mapped from 'header-item.<name>' # TODO
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO


class AStepperJsProps(TypedDict):
    alt_labels: NotRequired[JS]  # Mapped from 'altLabels'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    complete_icon: NotRequired[JS]  # Mapped from 'completeIcon'
    edit_icon: NotRequired[JS]  # Mapped from 'editIcon'
    editable: NotRequired[JS]
    error_icon: NotRequired[JS]  # Mapped from 'errorIcon'
    hide_actions: NotRequired[JS]  # Mapped from 'hideActions'
    items: NotRequired[JS]
    item_title: NotRequired[JS]  # Mapped from 'itemTitle'
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    non_linear: NotRequired[JS]  # Mapped from 'nonLinear'
    flat: NotRequired[JS]
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    color: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    location: NotRequired[JS]
    position: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    prev_text: NotRequired[JS]  # Mapped from 'prevText'
    next_text: NotRequired[JS]  # Mapped from 'nextText'
    spread: NotRequired[JS]


class AStepperProps(TypedDict):
    alt_labels: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'altLabels'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    complete_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'completeIcon'
    edit_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'editIcon'
    editable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'errorIcon'
    hide_actions: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideActions'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    item_title: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemTitle'
    item_value: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemValue'
    non_linear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'nonLinear'
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    position: NotRequired[Annotated[str, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    prev_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prevText'
    next_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'nextText'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AStepperJsProps, PropMeta(required=False)]]


AStepperCls = Component[EmptyTuple, AStepperProps, AStepperSlots, Any, Any, Any]

AStepperAlpineCls = AlpineComponent[EmptyTuple, AStepperProps, AStepperSlots, Any, Any, Any]


class AStepperActionsSlots(TypedDict):
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]


class AStepperActionsJsProps(TypedDict):
    color: NotRequired[JS]
    disabled: NotRequired[JS]
    prev_text: NotRequired[JS]  # Mapped from 'prevText'
    next_text: NotRequired[JS]  # Mapped from 'nextText'
    spread: NotRequired[JS]


class AStepperActionsProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    prev_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'prevText'
    next_text: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'nextText'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AStepperActionsJsProps, PropMeta(required=False)]]


AStepperActionsCls = Component[EmptyTuple, AStepperActionsProps, AStepperActionsSlots, Any, Any, Any]

AStepperActionsAlpineCls = AlpineComponent[EmptyTuple, AStepperActionsProps, AStepperActionsSlots, Any, Any, Any]


class AStepperHeaderSlots(TypedDict):
    default: NotRequired[SlotContent]


class AStepperHeaderJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AStepperHeaderProps(TypedDict):
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AStepperHeaderJsProps, PropMeta(required=False)]]


AStepperHeaderCls = Component[EmptyTuple, AStepperHeaderProps, AStepperHeaderSlots, Any, Any, Any]

AStepperHeaderAlpineCls = AlpineComponent[EmptyTuple, AStepperHeaderProps, AStepperHeaderSlots, Any, Any, Any]


class AStepperItemSlots(TypedDict):
    default: NotRequired[SlotContent]
    icon: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    subtitle: NotRequired[SlotContent]


class AStepperItemJsProps(TypedDict):
    color: NotRequired[JS]
    title: NotRequired[JS]
    subtitle: NotRequired[JS]
    complete: NotRequired[JS]
    complete_icon: NotRequired[JS]  # Mapped from 'completeIcon'
    editable: NotRequired[JS]
    edit_icon: NotRequired[JS]  # Mapped from 'editIcon'
    error: NotRequired[JS]
    error_icon: NotRequired[JS]  # Mapped from 'errorIcon'
    icon: NotRequired[JS]
    ripple: NotRequired[JS]
    rules: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    spread: NotRequired[JS]


class AStepperItemProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    subtitle: NotRequired[Annotated[str, PropMeta(required=False)]]
    complete: NotRequired[Annotated[bool, PropMeta(required=False)]]
    complete_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'completeIcon'
    editable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    edit_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'editIcon'
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_icon: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'errorIcon'
    icon: NotRequired[Annotated[str, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AStepperItemJsProps, PropMeta(required=False)]]


AStepperItemCls = Component[EmptyTuple, AStepperItemProps, AStepperItemSlots, Any, Any, Any]

AStepperItemAlpineCls = AlpineComponent[EmptyTuple, AStepperItemProps, AStepperItemSlots, Any, Any, Any]


class AStepperWindowSlots(TypedDict):
    default: NotRequired[SlotContent]
    additional: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]


class AStepperWindowJsProps(TypedDict):
    reverse: NotRequired[JS]
    direction: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AStepperWindowProps(TypedDict):
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AStepperWindowJsProps, PropMeta(required=False)]]


AStepperWindowCls = Component[EmptyTuple, AStepperWindowProps, AStepperWindowSlots, Any, Any, Any]

AStepperWindowAlpineCls = AlpineComponent[EmptyTuple, AStepperWindowProps, AStepperWindowSlots, Any, Any, Any]


class AStepperWindowItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class AStepperWindowItemJsProps(TypedDict):
    reverse_transition: NotRequired[JS]  # Mapped from 'reverseTransition'
    transition: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    eager: NotRequired[JS]
    spread: NotRequired[JS]


class AStepperWindowItemProps(TypedDict):
    reverse_transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'reverseTransition'
    transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AStepperWindowItemJsProps, PropMeta(required=False)]]


AStepperWindowItemCls = Component[EmptyTuple, AStepperWindowItemProps, AStepperWindowItemSlots, Any, Any, Any]

AStepperWindowItemAlpineCls = AlpineComponent[EmptyTuple, AStepperWindowItemProps, AStepperWindowItemSlots, Any, Any, Any]


class ASvgIconSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASvgIconJsProps(TypedDict):
    icon: NotRequired[JS]
    spread: NotRequired[JS]


class ASvgIconProps(TypedDict):
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=True)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASvgIconJsProps, PropMeta(required=False)]]


ASvgIconCls = Component[EmptyTuple, ASvgIconProps, ASvgIconSlots, Any, Any, Any]

ASvgIconAlpineCls = AlpineComponent[EmptyTuple, ASvgIconProps, ASvgIconSlots, Any, Any, Any]


class ASwitchSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    label: NotRequired[SlotContent]
    input: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    thumb: NotRequired[SlotContent]
    track_false: NotRequired[SlotContent]  # Mapped from 'track-false'
    track_true: NotRequired[SlotContent]  # Mapped from 'track-true'


class ASwitchJsProps(TypedDict):
    indeterminate: NotRequired[JS]
    inset: NotRequired[JS]
    flat: NotRequired[JS]
    loading: NotRequired[JS]
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    true_value: NotRequired[JS]  # Mapped from 'trueValue'
    false_value: NotRequired[JS]  # Mapped from 'falseValue'
    value: NotRequired[JS]
    color: NotRequired[JS]
    defaults_target: NotRequired[JS]  # Mapped from 'defaultsTarget'
    inline: NotRequired[JS]
    false_icon: NotRequired[JS]  # Mapped from 'falseIcon'
    true_icon: NotRequired[JS]  # Mapped from 'trueIcon'
    ripple: NotRequired[JS]
    multiple: NotRequired[JS]
    type: NotRequired[JS]
    value_comparator: NotRequired[JS]  # Mapped from 'valueComparator'
    spread: NotRequired[JS]


class ASwitchProps(TypedDict):
    indeterminate: NotRequired[Annotated[bool, PropMeta(required=False)]]
    inset: NotRequired[Annotated[bool, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    true_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'trueValue'
    false_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'falseValue'
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    defaults_target: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'defaultsTarget'
    inline: NotRequired[Annotated[bool, PropMeta(required=False)]]
    false_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'falseIcon'
    true_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'trueIcon'
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASwitchJsProps, PropMeta(required=False)]]


ASwitchCls = Component[EmptyTuple, ASwitchProps, ASwitchSlots, Any, Any, Any]

ASwitchAlpineCls = AlpineComponent[EmptyTuple, ASwitchProps, ASwitchSlots, Any, Any, Any]


class ASystemBarSlots(TypedDict):
    default: NotRequired[SlotContent]


class ASystemBarJsProps(TypedDict):
    color: NotRequired[JS]
    height: NotRequired[JS]
    window: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    elevation: NotRequired[JS]
    name: NotRequired[JS]
    order: NotRequired[JS]
    absolute: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ASystemBarProps(TypedDict):
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    window: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    order: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ASystemBarJsProps, PropMeta(required=False)]]


ASystemBarCls = Component[EmptyTuple, ASystemBarProps, ASystemBarSlots, Any, Any, Any]

ASystemBarAlpineCls = AlpineComponent[EmptyTuple, ASystemBarProps, ASystemBarSlots, Any, Any, Any]


class ATabSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]


class ATabJsProps(TypedDict):
    fixed: NotRequired[JS]
    slider_color: NotRequired[JS]  # Mapped from 'sliderColor'
    hide_slider: NotRequired[JS]  # Mapped from 'hideSlider'
    direction: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    icon: NotRequired[JS]
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    readonly: NotRequired[JS]
    slim: NotRequired[JS]
    stacked: NotRequired[JS]
    ripple: NotRequired[JS]
    text: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    href: NotRequired[JS]
    replace: NotRequired[JS]
    to: NotRequired[JS]
    exact: NotRequired[JS]
    size: NotRequired[JS]
    theme: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class ATabProps(TypedDict):
    fixed: NotRequired[Annotated[bool, PropMeta(required=False)]]
    slider_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'sliderColor'
    hide_slider: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSlider'
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    slim: NotRequired[Annotated[bool, PropMeta(required=False)]]
    stacked: NotRequired[Annotated[bool, PropMeta(required=False)]]
    ripple: NotRequired[Annotated[Union[bool, Dict], PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    href: NotRequired[Annotated[str, PropMeta(required=False)]]
    replace: NotRequired[Annotated[bool, PropMeta(required=False)]]
    to: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    exact: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATabJsProps, PropMeta(required=False)]]


ATabCls = Component[EmptyTuple, ATabProps, ATabSlots, Any, Any, Any]

ATabAlpineCls = AlpineComponent[EmptyTuple, ATabProps, ATabSlots, Any, Any, Any]


class ATableSlots(TypedDict):
    default: NotRequired[SlotContent]
    top: NotRequired[SlotContent]
    bottom: NotRequired[SlotContent]
    wrapper: NotRequired[SlotContent]


class ATableJsProps(TypedDict):
    fixed_header: NotRequired[JS]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[JS]  # Mapped from 'fixedFooter'
    height: NotRequired[JS]
    hover: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ATableProps(TypedDict):
    fixed_header: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedHeader'
    fixed_footer: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedFooter'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    hover: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATableJsProps, PropMeta(required=False)]]


ATableCls = Component[EmptyTuple, ATableProps, ATableSlots, Any, Any, Any]

ATableAlpineCls = AlpineComponent[EmptyTuple, ATableProps, ATableSlots, Any, Any, Any]


class ATabsSlots(TypedDict):
    default: NotRequired[SlotContent]
    tab: NotRequired[SlotContent]
    item: NotRequired[SlotContent]
    window: NotRequired[SlotContent]
    # tab_<name>: NotRequired[SlotContent]  # Mapped from 'tab.<name>' # TODO
    # item_<name>: NotRequired[SlotContent]  # Mapped from 'item.<name>' # TODO


class ATabsJsProps(TypedDict):
    align_tabs: NotRequired[JS]  # Mapped from 'alignTabs'
    color: NotRequired[JS]
    fixed_tabs: NotRequired[JS]  # Mapped from 'fixedTabs'
    items: NotRequired[JS]
    stacked: NotRequired[JS]
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    grow: NotRequired[JS]
    height: NotRequired[JS]
    hide_slider: NotRequired[JS]  # Mapped from 'hideSlider'
    slider_color: NotRequired[JS]  # Mapped from 'sliderColor'
    center_active: NotRequired[JS]  # Mapped from 'centerActive'
    direction: NotRequired[JS]
    symbol: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    show_arrows: NotRequired[JS]  # Mapped from 'showArrows'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    mobile: NotRequired[JS]
    mobile_breakpoint: NotRequired[JS]  # Mapped from 'mobileBreakpoint'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    multiple: NotRequired[JS]
    mandatory: NotRequired[JS]
    max: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    disabled: NotRequired[JS]
    density: NotRequired[JS]
    spread: NotRequired[JS]


class ATabsProps(TypedDict):
    align_tabs: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'alignTabs'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    fixed_tabs: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fixedTabs'
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    stacked: NotRequired[Annotated[bool, PropMeta(required=False)]]
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    grow: NotRequired[Annotated[bool, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    hide_slider: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSlider'
    slider_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'sliderColor'
    center_active: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerActive'
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    symbol: NotRequired[Annotated[Any, PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    show_arrows: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showArrows'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    mobile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mobile_breakpoint: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'mobileBreakpoint'
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    multiple: NotRequired[Annotated[bool, PropMeta(required=False)]]
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATabsJsProps, PropMeta(required=False)]]


ATabsCls = Component[EmptyTuple, ATabsProps, ATabsSlots, Any, Any, Any]

ATabsAlpineCls = AlpineComponent[EmptyTuple, ATabsProps, ATabsSlots, Any, Any, Any]


class ATabsWindowSlots(TypedDict):
    default: NotRequired[SlotContent]
    additional: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]


class ATabsWindowJsProps(TypedDict):
    reverse: NotRequired[JS]
    direction: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ATabsWindowProps(TypedDict):
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATabsWindowJsProps, PropMeta(required=False)]]


ATabsWindowCls = Component[EmptyTuple, ATabsWindowProps, ATabsWindowSlots, Any, Any, Any]

ATabsWindowAlpineCls = AlpineComponent[EmptyTuple, ATabsWindowProps, ATabsWindowSlots, Any, Any, Any]


class ATabsWindowItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class ATabsWindowItemJsProps(TypedDict):
    reverse_transition: NotRequired[JS]  # Mapped from 'reverseTransition'
    transition: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    eager: NotRequired[JS]
    spread: NotRequired[JS]


class ATabsWindowItemProps(TypedDict):
    reverse_transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'reverseTransition'
    transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATabsWindowItemJsProps, PropMeta(required=False)]]


ATabsWindowItemCls = Component[EmptyTuple, ATabsWindowItemProps, ATabsWindowItemSlots, Any, Any, Any]

ATabsWindowItemAlpineCls = AlpineComponent[EmptyTuple, ATabsWindowItemProps, ATabsWindowItemSlots, Any, Any, Any]


class ATextFieldSlots(TypedDict):
    default: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    counter: NotRequired[SlotContent]


class ATextFieldJsProps(TypedDict):
    autofocus: NotRequired[JS]
    counter: NotRequired[JS]
    counter_value: NotRequired[JS]  # Mapped from 'counterValue'
    prefix: NotRequired[JS]
    placeholder: NotRequired[JS]
    persistent_placeholder: NotRequired[JS]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[JS]  # Mapped from 'persistentCounter'
    suffix: NotRequired[JS]
    role: NotRequired[JS]
    type: NotRequired[JS]
    model_modifiers: NotRequired[JS]  # Mapped from 'modelModifiers'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    center_affix: NotRequired[JS]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[JS]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    dirty: NotRequired[JS]
    flat: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    spread: NotRequired[JS]


class ATextFieldProps(TypedDict):
    autofocus: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    counter_value: NotRequired[Annotated[Union[int, float], PropMeta(required=False)]]  # Mapped from 'counterValue'
    prefix: NotRequired[Annotated[str, PropMeta(required=False)]]
    placeholder: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_placeholder: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentCounter'
    suffix: NotRequired[Annotated[str, PropMeta(required=False)]]
    role: NotRequired[Annotated[str, PropMeta(required=False)]]
    type: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_modifiers: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'modelModifiers'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    center_affix: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'centerAffix'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    dirty: NotRequired[Annotated[bool, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATextFieldJsProps, PropMeta(required=False)]]


ATextFieldCls = Component[EmptyTuple, ATextFieldProps, ATextFieldSlots, Any, Any, Any]

ATextFieldAlpineCls = AlpineComponent[EmptyTuple, ATextFieldProps, ATextFieldSlots, Any, Any, Any]


class ATextareaSlots(TypedDict):
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    details: NotRequired[SlotContent]
    message: NotRequired[SlotContent]
    clear: NotRequired[SlotContent]
    prepend_inner: NotRequired[SlotContent]  # Mapped from 'prepend-inner'
    append_inner: NotRequired[SlotContent]  # Mapped from 'append-inner'
    label: NotRequired[SlotContent]
    loader: NotRequired[SlotContent]
    counter: NotRequired[SlotContent]


class ATextareaJsProps(TypedDict):
    auto_grow: NotRequired[JS]  # Mapped from 'autoGrow'
    autofocus: NotRequired[JS]
    counter: NotRequired[JS]
    counter_value: NotRequired[JS]  # Mapped from 'counterValue'
    prefix: NotRequired[JS]
    placeholder: NotRequired[JS]
    persistent_placeholder: NotRequired[JS]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[JS]  # Mapped from 'persistentCounter'
    no_resize: NotRequired[JS]  # Mapped from 'noResize'
    rows: NotRequired[JS]
    max_rows: NotRequired[JS]  # Mapped from 'maxRows'
    suffix: NotRequired[JS]
    model_modifiers: NotRequired[JS]  # Mapped from 'modelModifiers'
    id: NotRequired[JS]
    append_icon: NotRequired[JS]  # Mapped from 'appendIcon'
    prepend_icon: NotRequired[JS]  # Mapped from 'prependIcon'
    hide_details: NotRequired[JS]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[JS]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[JS]
    persistent_hint: NotRequired[JS]  # Mapped from 'persistentHint'
    messages: NotRequired[JS]
    direction: NotRequired[JS]
    on_click_prepend: NotRequired[JS]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[JS]  # Mapped from 'onClick:append'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    theme: NotRequired[JS]
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[JS]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[JS]  # Mapped from 'bgColor'
    clearable: NotRequired[JS]
    clear_icon: NotRequired[JS]  # Mapped from 'clearIcon'
    active: NotRequired[JS]
    color: NotRequired[JS]
    base_color: NotRequired[JS]  # Mapped from 'baseColor'
    dirty: NotRequired[JS]
    flat: NotRequired[JS]
    persistent_clear: NotRequired[JS]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[JS]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[JS]
    single_line: NotRequired[JS]  # Mapped from 'singleLine'
    variant: NotRequired[JS]
    on_click_clear: NotRequired[JS]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[JS]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[JS]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    spread: NotRequired[JS]


class ATextareaProps(TypedDict):
    auto_grow: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'autoGrow'
    autofocus: NotRequired[Annotated[bool, PropMeta(required=False)]]
    counter: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    prefix: NotRequired[Annotated[str, PropMeta(required=False)]]
    placeholder: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_placeholder: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentPlaceholder'
    persistent_counter: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentCounter'
    no_resize: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noResize'
    rows: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_rows: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxRows'
    suffix: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_modifiers: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'modelModifiers'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    append_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendIcon'
    prepend_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependIcon'
    hide_details: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'hideDetails'
    hide_spin_buttons: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideSpinButtons'
    hint: NotRequired[Annotated[str, PropMeta(required=False)]]
    persistent_hint: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentHint'
    messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_prepend: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prepend'
    on_click_append: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:append'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    append_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'appendInnerIcon'
    bg_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'bgColor'
    clearable: NotRequired[Annotated[bool, PropMeta(required=False)]]
    clear_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'clearIcon'
    active: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    base_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'baseColor'
    dirty: NotRequired[Annotated[bool, PropMeta(required=False)]]
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    persistent_clear: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'persistentClear'
    prepend_inner_icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]  # Mapped from 'prependInnerIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    single_line: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'singleLine'
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    on_click_clear: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:clear'
    on_click_append_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:appendInner'
    on_click_prepend_inner: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onClick:prependInner'
    loading: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATextareaJsProps, PropMeta(required=False)]]


ATextareaCls = Component[EmptyTuple, ATextareaProps, ATextareaSlots, Any, Any, Any]

ATextareaAlpineCls = AlpineComponent[EmptyTuple, ATextareaProps, ATextareaSlots, Any, Any, Any]


class AThemeProviderSlots(TypedDict):
    default: NotRequired[SlotContent]


class AThemeProviderJsProps(TypedDict):
    with_background: NotRequired[JS]  # Mapped from 'withBackground'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AThemeProviderProps(TypedDict):
    with_background: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'withBackground'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AThemeProviderJsProps, PropMeta(required=False)]]


AThemeProviderCls = Component[EmptyTuple, AThemeProviderProps, AThemeProviderSlots, Any, Any, Any]

AThemeProviderAlpineCls = AlpineComponent[EmptyTuple, AThemeProviderProps, AThemeProviderSlots, Any, Any, Any]


class ATimelineSlots(TypedDict):
    pass


class ATimelineJsProps(TypedDict):
    align: NotRequired[JS]
    direction: NotRequired[JS]
    justify: NotRequired[JS]
    side: NotRequired[JS]
    line_thickness: NotRequired[JS]  # Mapped from 'lineThickness'
    line_color: NotRequired[JS]  # Mapped from 'lineColor'
    truncate_line: NotRequired[JS]  # Mapped from 'truncateLine'
    dot_color: NotRequired[JS]  # Mapped from 'dotColor'
    fill_dot: NotRequired[JS]  # Mapped from 'fillDot'
    hide_opposite: NotRequired[JS]  # Mapped from 'hideOpposite'
    icon_color: NotRequired[JS]  # Mapped from 'iconColor'
    line_inset: NotRequired[JS]  # Mapped from 'lineInset'
    size: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    density: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class ATimelineProps(TypedDict):
    align: NotRequired[Annotated[str, PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    justify: NotRequired[Annotated[str, PropMeta(required=False)]]
    side: NotRequired[Annotated[str, PropMeta(required=False)]]
    line_thickness: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'lineThickness'
    line_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lineColor'
    truncate_line: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'truncateLine'
    dot_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'dotColor'
    fill_dot: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fillDot'
    hide_opposite: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideOpposite'
    icon_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'iconColor'
    line_inset: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'lineInset'
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATimelineJsProps, PropMeta(required=False)]]


ATimelineCls = Component[EmptyTuple, ATimelineProps, ATimelineSlots, Any, Any, Any]

ATimelineAlpineCls = AlpineComponent[EmptyTuple, ATimelineProps, ATimelineSlots, Any, Any, Any]


class ATimelineDividerSlots(TypedDict):
    default: NotRequired[SlotContent]


class ATimelineDividerJsProps(TypedDict):
    dot_color: NotRequired[JS]  # Mapped from 'dotColor'
    fill_dot: NotRequired[JS]  # Mapped from 'fillDot'
    hide_dot: NotRequired[JS]  # Mapped from 'hideDot'
    icon: NotRequired[JS]
    icon_color: NotRequired[JS]  # Mapped from 'iconColor'
    line_color: NotRequired[JS]  # Mapped from 'lineColor'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    size: NotRequired[JS]
    elevation: NotRequired[JS]
    spread: NotRequired[JS]


class ATimelineDividerProps(TypedDict):
    dot_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'dotColor'
    fill_dot: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fillDot'
    hide_dot: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDot'
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    icon_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'iconColor'
    line_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'lineColor'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATimelineDividerJsProps, PropMeta(required=False)]]


ATimelineDividerCls = Component[EmptyTuple, ATimelineDividerProps, ATimelineDividerSlots, Any, Any, Any]

ATimelineDividerAlpineCls = AlpineComponent[EmptyTuple, ATimelineDividerProps, ATimelineDividerSlots, Any, Any, Any]


class ATimelineItemSlots(TypedDict):
    default: NotRequired[SlotContent]
    icon: NotRequired[SlotContent]
    opposite: NotRequired[SlotContent]


class ATimelineItemJsProps(TypedDict):
    density: NotRequired[JS]
    dot_color: NotRequired[JS]  # Mapped from 'dotColor'
    fill_dot: NotRequired[JS]  # Mapped from 'fillDot'
    hide_dot: NotRequired[JS]  # Mapped from 'hideDot'
    hide_opposite: NotRequired[JS]  # Mapped from 'hideOpposite'
    icon: NotRequired[JS]
    icon_color: NotRequired[JS]  # Mapped from 'iconColor'
    line_inset: NotRequired[JS]  # Mapped from 'lineInset'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    size: NotRequired[JS]
    spread: NotRequired[JS]


class ATimelineItemProps(TypedDict):
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    dot_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'dotColor'
    fill_dot: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'fillDot'
    hide_dot: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideDot'
    hide_opposite: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'hideOpposite'
    icon: NotRequired[Annotated[Union[str, Dict, List], PropMeta(required=False)]]
    icon_color: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'iconColor'
    line_inset: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'lineInset'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    size: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATimelineItemJsProps, PropMeta(required=False)]]


ATimelineItemCls = Component[EmptyTuple, ATimelineItemProps, ATimelineItemSlots, Any, Any, Any]

ATimelineItemAlpineCls = AlpineComponent[EmptyTuple, ATimelineItemProps, ATimelineItemSlots, Any, Any, Any]


class AToolbarSlots(TypedDict):
    default: NotRequired[SlotContent]
    image: NotRequired[SlotContent]
    prepend: NotRequired[SlotContent]
    append: NotRequired[SlotContent]
    title: NotRequired[SlotContent]
    extension: NotRequired[SlotContent]


class AToolbarJsProps(TypedDict):
    absolute: NotRequired[JS]
    collapse: NotRequired[JS]
    color: NotRequired[JS]
    density: NotRequired[JS]
    extended: NotRequired[JS]
    extension_height: NotRequired[JS]  # Mapped from 'extensionHeight'
    flat: NotRequired[JS]
    floating: NotRequired[JS]
    height: NotRequired[JS]
    image: NotRequired[JS]
    title: NotRequired[JS]
    border: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    elevation: NotRequired[JS]
    rounded: NotRequired[JS]
    tile: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AToolbarProps(TypedDict):
    absolute: NotRequired[Annotated[bool, PropMeta(required=False)]]
    collapse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    density: NotRequired[Annotated[str, PropMeta(required=False)]]
    extended: NotRequired[Annotated[bool, PropMeta(required=False)]]
    extension_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'extensionHeight'
    flat: NotRequired[Annotated[bool, PropMeta(required=False)]]
    floating: NotRequired[Annotated[bool, PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    image: NotRequired[Annotated[str, PropMeta(required=False)]]
    title: NotRequired[Annotated[str, PropMeta(required=False)]]
    border: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    elevation: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    rounded: NotRequired[Annotated[Union[bool, int, float, str], PropMeta(required=False)]]
    tile: NotRequired[Annotated[bool, PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AToolbarJsProps, PropMeta(required=False)]]


AToolbarCls = Component[EmptyTuple, AToolbarProps, AToolbarSlots, Any, Any, Any]

AToolbarAlpineCls = AlpineComponent[EmptyTuple, AToolbarProps, AToolbarSlots, Any, Any, Any]


class AToolbarItemsSlots(TypedDict):
    default: NotRequired[SlotContent]


class AToolbarItemsJsProps(TypedDict):
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    color: NotRequired[JS]
    variant: NotRequired[JS]
    spread: NotRequired[JS]


class AToolbarItemsProps(TypedDict):
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    variant: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AToolbarItemsJsProps, PropMeta(required=False)]]


AToolbarItemsCls = Component[EmptyTuple, AToolbarItemsProps, AToolbarItemsSlots, Any, Any, Any]

AToolbarItemsAlpineCls = AlpineComponent[EmptyTuple, AToolbarItemsProps, AToolbarItemsSlots, Any, Any, Any]


class AToolbarTitleSlots(TypedDict):
    default: NotRequired[SlotContent]
    text: NotRequired[SlotContent]


class AToolbarTitleJsProps(TypedDict):
    text: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AToolbarTitleProps(TypedDict):
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AToolbarTitleJsProps, PropMeta(required=False)]]


AToolbarTitleCls = Component[EmptyTuple, AToolbarTitleProps, AToolbarTitleSlots, Any, Any, Any]

AToolbarTitleAlpineCls = AlpineComponent[EmptyTuple, AToolbarTitleProps, AToolbarTitleSlots, Any, Any, Any]


class ATooltipSlots(TypedDict):
    default: NotRequired[SlotContent]
    activator: NotRequired[SlotContent]


class ATooltipJsProps(TypedDict):
    id: NotRequired[JS]
    text: NotRequired[JS]
    attach: NotRequired[JS]
    close_on_back: NotRequired[JS]  # Mapped from 'closeOnBack'
    contained: NotRequired[JS]
    content_class: NotRequired[JS]  # Mapped from 'contentClass'
    content_props: NotRequired[JS]  # Mapped from 'contentProps'
    opacity: NotRequired[JS]
    no_click_animation: NotRequired[JS]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    scrim: NotRequired[JS]
    z_index: NotRequired[JS]  # Mapped from 'zIndex'
    target: NotRequired[JS]
    activator: NotRequired[JS]
    activator_props: NotRequired[JS]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[JS]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[JS]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[JS]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[JS]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[JS]  # Mapped from 'closeDelay'
    open_delay: NotRequired[JS]  # Mapped from 'openDelay'
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    height: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    eager: NotRequired[JS]
    location_strategy: NotRequired[JS]  # Mapped from 'locationStrategy'
    location: NotRequired[JS]
    origin: NotRequired[JS]
    offset: NotRequired[JS]
    scroll_strategy: NotRequired[JS]  # Mapped from 'scrollStrategy'
    theme: NotRequired[JS]
    transition: NotRequired[JS]
    disabled: NotRequired[JS]
    group: NotRequired[JS]
    spread: NotRequired[JS]


class ATooltipProps(TypedDict):
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    text: NotRequired[Annotated[str, PropMeta(required=False)]]
    attach: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    close_on_back: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnBack'
    contained: NotRequired[Annotated[bool, PropMeta(required=False)]]
    content_class: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentClass'
    content_props: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'contentProps'
    opacity: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    no_click_animation: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'noClickAnimation'
    model_value: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'modelValue'
    scrim: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    z_index: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'zIndex'
    target: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator: NotRequired[Annotated[Union[str, Dict], PropMeta(required=False)]]
    activator_props: NotRequired[Annotated[Dict, PropMeta(required=False)]]  # Mapped from 'activatorProps'
    open_on_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnClick'
    open_on_hover: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnHover'
    open_on_focus: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'openOnFocus'
    close_on_content_click: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'closeOnContentClick'
    close_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'closeDelay'
    open_delay: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'openDelay'
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    location_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'locationStrategy'
    location: NotRequired[Annotated[str, PropMeta(required=False)]]
    origin: NotRequired[Annotated[str, PropMeta(required=False)]]
    offset: NotRequired[Annotated[Union[int, float, str, List], PropMeta(required=False)]]
    scroll_strategy: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'scrollStrategy'
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    transition: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    group: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATooltipJsProps, PropMeta(required=False)]]


ATooltipCls = Component[EmptyTuple, ATooltipProps, ATooltipSlots, Any, Any, Any]

ATooltipAlpineCls = AlpineComponent[EmptyTuple, ATooltipProps, ATooltipSlots, Any, Any, Any]


class ATrendlineSlots(TypedDict):
    default: NotRequired[SlotContent]
    label: NotRequired[SlotContent]


class ATrendlineJsProps(TypedDict):
    fill: NotRequired[JS]
    auto_draw: NotRequired[JS]  # Mapped from 'autoDraw'
    auto_draw_duration: NotRequired[JS]  # Mapped from 'autoDrawDuration'
    auto_draw_easing: NotRequired[JS]  # Mapped from 'autoDrawEasing'
    color: NotRequired[JS]
    gradient: NotRequired[JS]
    gradient_direction: NotRequired[JS]  # Mapped from 'gradientDirection'
    height: NotRequired[JS]
    labels: NotRequired[JS]
    label_size: NotRequired[JS]  # Mapped from 'labelSize'
    line_width: NotRequired[JS]  # Mapped from 'lineWidth'
    id: NotRequired[JS]
    item_value: NotRequired[JS]  # Mapped from 'itemValue'
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    min: NotRequired[JS]
    max: NotRequired[JS]
    padding: NotRequired[JS]
    show_labels: NotRequired[JS]  # Mapped from 'showLabels'
    smooth: NotRequired[JS]
    width: NotRequired[JS]
    spread: NotRequired[JS]


class ATrendlineProps(TypedDict):
    fill: NotRequired[Annotated[bool, PropMeta(required=False)]]
    auto_draw: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'autoDraw'
    auto_draw_duration: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'autoDrawDuration'
    auto_draw_easing: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'autoDrawEasing'
    color: NotRequired[Annotated[str, PropMeta(required=False)]]
    gradient: NotRequired[Annotated[List, PropMeta(required=False)]]
    gradient_direction: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'gradientDirection'
    height: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    labels: NotRequired[Annotated[List, PropMeta(required=False)]]
    label_size: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'labelSize'
    line_width: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]  # Mapped from 'lineWidth'
    id: NotRequired[Annotated[str, PropMeta(required=False)]]
    item_value: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'itemValue'
    model_value: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'modelValue'
    min: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    max: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    padding: NotRequired[Annotated[Union[str, int, float], PropMeta(required=False)]]
    show_labels: NotRequired[Annotated[bool, PropMeta(required=False)]]  # Mapped from 'showLabels'
    smooth: NotRequired[Annotated[bool, PropMeta(required=False)]]
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[ATrendlineJsProps, PropMeta(required=False)]]


ATrendlineCls = Component[EmptyTuple, ATrendlineProps, ATrendlineSlots, Any, Any, Any]

ATrendlineAlpineCls = AlpineComponent[EmptyTuple, ATrendlineProps, ATrendlineSlots, Any, Any, Any]


class AValidationSlots(TypedDict):
    default: NotRequired[SlotContent]


class AValidationJsProps(TypedDict):
    disabled: NotRequired[JS]
    error: NotRequired[JS]
    error_messages: NotRequired[JS]  # Mapped from 'errorMessages'
    max_errors: NotRequired[JS]  # Mapped from 'maxErrors'
    name: NotRequired[JS]
    label: NotRequired[JS]
    readonly: NotRequired[JS]
    rules: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    validate_on: NotRequired[JS]  # Mapped from 'validateOn'
    validation_value: NotRequired[JS]  # Mapped from 'validationValue'
    focused: NotRequired[JS]
    on_update_focused: NotRequired[JS]  # Mapped from 'onUpdate:focused'
    spread: NotRequired[JS]


class AValidationProps(TypedDict):
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error: NotRequired[Annotated[bool, PropMeta(required=False)]]
    error_messages: NotRequired[Annotated[Union[List, str], PropMeta(required=False)]]  # Mapped from 'errorMessages'
    max_errors: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxErrors'
    name: NotRequired[Annotated[str, PropMeta(required=False)]]
    label: NotRequired[Annotated[str, PropMeta(required=False)]]
    readonly: NotRequired[Annotated[bool, PropMeta(required=False)]]
    rules: NotRequired[Annotated[List, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    validate_on: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'validateOn'
    validation_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'validationValue'
    focused: NotRequired[Annotated[bool, PropMeta(required=False)]]
    on_update_focused: NotRequired[Annotated[List, PropMeta(required=False)]]  # Mapped from 'onUpdate:focused'
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AValidationJsProps, PropMeta(required=False)]]


AValidationCls = Component[EmptyTuple, AValidationProps, AValidationSlots, Any, Any, Any]

AValidationAlpineCls = AlpineComponent[EmptyTuple, AValidationProps, AValidationSlots, Any, Any, Any]


class AVirtualScrollSlots(TypedDict):
    pass


class AVirtualScrollJsProps(TypedDict):
    items: NotRequired[JS]
    renderless: NotRequired[JS]
    item_height: NotRequired[JS]  # Mapped from 'itemHeight'
    height: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    max_height: NotRequired[JS]  # Mapped from 'maxHeight'
    max_width: NotRequired[JS]  # Mapped from 'maxWidth'
    min_height: NotRequired[JS]  # Mapped from 'minHeight'
    min_width: NotRequired[JS]  # Mapped from 'minWidth'
    width: NotRequired[JS]
    spread: NotRequired[JS]


class AVirtualScrollProps(TypedDict):
    items: NotRequired[Annotated[List, PropMeta(required=False)]]
    renderless: NotRequired[Annotated[bool, PropMeta(required=False)]]
    item_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'itemHeight'
    height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    max_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxHeight'
    max_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'maxWidth'
    min_height: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minHeight'
    min_width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]  # Mapped from 'minWidth'
    width: NotRequired[Annotated[Union[int, float, str], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AVirtualScrollJsProps, PropMeta(required=False)]]


AVirtualScrollCls = Component[EmptyTuple, AVirtualScrollProps, AVirtualScrollSlots, Any, Any, Any]

AVirtualScrollAlpineCls = AlpineComponent[EmptyTuple, AVirtualScrollProps, AVirtualScrollSlots, Any, Any, Any]


class AVirtualScrollItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class AVirtualScrollItemJsProps(TypedDict):
    renderless: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    spread: NotRequired[JS]


class AVirtualScrollItemProps(TypedDict):
    renderless: NotRequired[Annotated[bool, PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AVirtualScrollItemJsProps, PropMeta(required=False)]]


AVirtualScrollItemCls = Component[EmptyTuple, AVirtualScrollItemProps, AVirtualScrollItemSlots, Any, Any, Any]

AVirtualScrollItemAlpineCls = AlpineComponent[EmptyTuple, AVirtualScrollItemProps, AVirtualScrollItemSlots, Any, Any, Any]


class AWindowSlots(TypedDict):
    default: NotRequired[SlotContent]
    additional: NotRequired[SlotContent]
    prev: NotRequired[SlotContent]
    next: NotRequired[SlotContent]


class AWindowJsProps(TypedDict):
    continuous: NotRequired[JS]
    next_icon: NotRequired[JS]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[JS]  # Mapped from 'prevIcon'
    reverse: NotRequired[JS]
    show_arrows: NotRequired[JS]  # Mapped from 'showArrows'
    touch: NotRequired[JS]
    direction: NotRequired[JS]
    model_value: NotRequired[JS]  # Mapped from 'modelValue'
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    mandatory: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    theme: NotRequired[JS]
    spread: NotRequired[JS]


class AWindowProps(TypedDict):
    continuous: NotRequired[Annotated[bool, PropMeta(required=False)]]
    next_icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]  # Mapped from 'nextIcon'
    prev_icon: NotRequired[Annotated[Union[bool, str, Dict], PropMeta(required=False)]]  # Mapped from 'prevIcon'
    reverse: NotRequired[Annotated[bool, PropMeta(required=False)]]
    show_arrows: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'showArrows'
    touch: NotRequired[Annotated[Union[Dict, bool], PropMeta(required=False)]]
    direction: NotRequired[Annotated[str, PropMeta(required=False)]]
    model_value: NotRequired[Annotated[Any, PropMeta(required=False)]]  # Mapped from 'modelValue'
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    mandatory: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    tag: NotRequired[Annotated[str, PropMeta(required=False)]]
    theme: NotRequired[Annotated[str, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AWindowJsProps, PropMeta(required=False)]]


AWindowCls = Component[EmptyTuple, AWindowProps, AWindowSlots, Any, Any, Any]

AWindowAlpineCls = AlpineComponent[EmptyTuple, AWindowProps, AWindowSlots, Any, Any, Any]


class AWindowItemSlots(TypedDict):
    default: NotRequired[SlotContent]


class AWindowItemJsProps(TypedDict):
    reverse_transition: NotRequired[JS]  # Mapped from 'reverseTransition'
    transition: NotRequired[JS]
    klass: NotRequired[JS]  # Mapped from 'class'
    style: NotRequired[JS]
    value: NotRequired[JS]
    disabled: NotRequired[JS]
    selected_class: NotRequired[JS]  # Mapped from 'selectedClass'
    eager: NotRequired[JS]
    spread: NotRequired[JS]


class AWindowItemProps(TypedDict):
    reverse_transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]  # Mapped from 'reverseTransition'
    transition: NotRequired[Annotated[Union[bool, str], PropMeta(required=False)]]
    klass: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]  # Mapped from 'class'
    style: NotRequired[Annotated[Union[str, List, Dict], PropMeta(required=False)]]
    value: NotRequired[Annotated[Any, PropMeta(required=False)]]
    disabled: NotRequired[Annotated[bool, PropMeta(required=False)]]
    selected_class: NotRequired[Annotated[str, PropMeta(required=False)]]  # Mapped from 'selectedClass'
    eager: NotRequired[Annotated[bool, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AWindowItemJsProps, PropMeta(required=False)]]


AWindowItemCls = Component[EmptyTuple, AWindowItemProps, AWindowItemSlots, Any, Any, Any]

AWindowItemAlpineCls = AlpineComponent[EmptyTuple, AWindowItemProps, AWindowItemSlots, Any, Any, Any]


class AlpinuiSlots(TypedDict):
    default: NotRequired[SlotContent]


class AlpinuiJsProps(TypedDict):
    options: NotRequired[JS]
    spread: NotRequired[JS]


class AlpinuiProps(TypedDict):
    options: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    attrs: NotRequired[Annotated[Dict, PropMeta(required=False)]]
    js: NotRequired[Annotated[AlpinuiJsProps, PropMeta(required=False)]]


AlpinuiCls = Component[EmptyTuple, AlpinuiProps, AlpinuiSlots, Any, Any, Any]

AlpinuiAlpineCls = AlpineComponent[EmptyTuple, AlpinuiProps, AlpinuiSlots, Any, Any, Any]
