// Components
import { VDialogTransition } from '@/components/transitions';
import { VAvatar } from '@/components/VAvatar';
import { VCheckboxBtn } from '@/components/VCheckbox';
import { VChip } from '@/components/VChip';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';
import { VList, VListItem } from '@/components/VList';
import { VMenu } from '@/components/VMenu';
import { VTextField } from '@/components/VTextField/VTextField';
import { VVirtualScroll } from '@/components/VVirtualScroll';

// Utilities
import { _Select } from './VSelect.base';
import { genericVueComponent } from '@/engines/vue';
import { ensureValidVNode } from '@/util/vnode';

// Types
import type { ItemType, VSelectSlots } from './VSelect.base';
import type { GenericProps } from '@/engines/vue';
import type { SelectItemKey } from '@/util/helpers';

export { makeVSelectProps, VSelectSlots, ItemType } from './VSelect.base';

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = [T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any)

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

const selectProps = { ..._Select.props };
selectProps.transition = { ...selectProps.transition, default: VDialogTransition };

export const VSelect = genericVueComponent<new <
  T extends readonly any[],
  Item = ItemType<T>,
  ReturnObject extends boolean = false,
  Multiple extends boolean = false,
  V extends Value<Item, ReturnObject, Multiple> = Value<Item, ReturnObject, Multiple>
>(
  props: {
    items?: T;
    itemTitle?: SelectItemKey<ItemType<T>>;
    itemValue?: SelectItemKey<ItemType<T>>;
    itemProps?: SelectItemKey<ItemType<T>>;
    returnObject?: ReturnObject;
    multiple?: Multiple;
    modelValue?: V | null;
    'onUpdate:modelValue'?: (value: V) => void;
  },
  slots: VSelectSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  ..._Select,
  renderHeadless: (
    vm,
    {
      counterValue,
      isDirty,
      isFocused,
      model,
      modelValue,
      menu,
      menuDisabled,
      computedMenuProps,
      placeholder,
      title,
      displayItems,
      genItemProps,
      genChipProps,
      showNoData,
      noDataText,
      textFieldProps,
      selectedValues,
      listRef,
      vMenuRef,
      vTextFieldRef,
      vVirtualScrollRef,
      rootClasses,
      rootStyles,
      onModelUpdate,
      onClear,
      onMousedownControl,
      onBlur,
      onKeydown,
      onAfterLeave,
      onListKeydown,
      onListScroll,
      onFocusin,
    },
    { props, slots },
  ) => {
    const hasChips = !!(props.chips || slots.chip);
    const hasList = !!(
      (!props.hideNoData || displayItems.value.length) ||
      slots['prepend-item'] ||
      slots['append-item'] ||
      slots['no-data']
    );

    return (
      <VTextField
        ref={ vTextFieldRef }
        { ...textFieldProps.value }
        modelValue={ modelValue.value }
        onUpdate:modelValue={ onModelUpdate }
        v-model:focused={ isFocused.value }
        validationValue={ model.externalValue }
        counterValue={ counterValue.value }
        dirty={ isDirty.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        inputmode="none"
        placeholder={ placeholder.value }
        onClick:clear={ onClear }
        onMousedown:control={ onMousedownControl }
        onBlur={ onBlur }
        onKeydown={ onKeydown }
        aria-label={ title.value }
        title={ title.value }
      >
        {{
          ...slots,
          default: () => (
            <>
              <VMenu
                ref={ vMenuRef }
                v-model={ menu.value }
                activator="parent"
                contentClass="v-select__content"
                disabled={ menuDisabled.value }
                eager={ props.eager }
                maxHeight={ 310 }
                openOnClick={ false }
                closeOnContentClick={ false }
                transition={ props.transition }
                onAfterLeave={ onAfterLeave }
                { ...computedMenuProps.value }
              >
                { hasList && (
                  <VList
                    ref={ listRef }
                    selected={ selectedValues.value }
                    selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    onKeydown={ onListKeydown }
                    onFocusin={ onFocusin }
                    onScrollPassive={ onListScroll }
                    tabindex="-1"
                    aria-live="polite"
                    color={ props.itemColor ?? props.color }
                    { ...props.listProps }
                  >
                    { slots['prepend-item']?.() }

                    { showNoData.value && (slots['no-data']?.() ?? (
                      <VListItem title={ noDataText.value } />
                    ))}

                    <VVirtualScroll ref={ vVirtualScrollRef } renderless items={ displayItems.value }>
                      { ({ item, index, itemRef }) => {
                        const itemProps = genItemProps({ item, index, itemRef });

                        return slots.item?.({
                          item,
                          index,
                          props: itemProps,
                        }) ?? (
                          <VListItem { ...itemProps } role="option">
                            {{
                              prepend: ({ isSelected }) => (
                                <>
                                  { props.multiple && !props.hideSelected ? (
                                    <VCheckboxBtn
                                      key={ item.value }
                                      modelValue={ isSelected }
                                      ripple={ false }
                                      tabindex="-1"
                                    />
                                  ) : undefined }

                                  { item.props.prependAvatar && (
                                    <VAvatar image={ item.props.prependAvatar } />
                                  )}

                                  { item.props.prependIcon && (
                                    <VIcon icon={ item.props.prependIcon } />
                                  )}
                                </>
                              ),
                            }}
                          </VListItem>
                        );
                      }}
                    </VVirtualScroll>

                    { slots['append-item']?.() }
                  </VList>
                )}
              </VMenu>

              { model.value.map((item, index) => {
                const slotProps = genChipProps(item);

                const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
                const slotContent = hasSlot
                  ? ensureValidVNode(
                    hasChips
                      ? slots.chip!({ item, index, props: slotProps })
                      : slots.selection!({ item, index })
                  )
                  : undefined;

                if (hasSlot && !slotContent) return undefined;

                return (
                  <div key={ item.value } class="v-select__selection">
                    { hasChips ? (
                      !slots.chip ? (
                        <VChip
                          key="chip"
                          closable={ props.closableChips }
                          size="small"
                          text={ item.title }
                          disabled={ item.props.disabled }
                          { ...slotProps }
                        />
                      ) : (
                        <VDefaultsProvider
                          key="chip-defaults"
                          defaults={{
                            VChip: {
                              closable: props.closableChips,
                              size: 'small',
                              text: item.title,
                            },
                          }}
                        >
                          { slotContent }
                        </VDefaultsProvider>
                      )
                    ) : (
                      slotContent ?? (
                        <span class="v-select__selection-text">
                          { item.title }
                          { props.multiple && (index < model.value.length - 1) && (
                            <span class="v-select__selection-comma">,</span>
                          )}
                        </span>
                      )
                    )}
                  </div>
                );
              })}
            </>
          ),
          'append-inner': (...args) => (
            <>
              { slots['append-inner']?.(...args) }
              { props.menuIcon ? (
                <VIcon
                  class="v-select__menu-icon"
                  icon={ props.menuIcon }
                />
              ) : undefined }
            </>
          ),
        }}
      </VTextField>
    );
  },
});

export type VSelect = InstanceType<typeof VSelect>;
