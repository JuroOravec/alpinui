// Components
import { VAvatar } from '@/components/VAvatar';
import { VCheckboxBtn } from '@/components/VCheckbox';
import { VChip } from '@/components/VChip';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';
import { VList, VListItem } from '@/components/VList';
import { VMenu } from '@/components/VMenu';
import { VTextField } from '@/components/VTextField';
import { VVirtualScroll } from '@/components/VVirtualScroll';

// Utilities
import { _Combobox } from './VCombobox.base';
import { genericVueComponent } from '@/engines/vue';
import { mergeProps } from '@/util/helpers';
import { ensureValidVNode } from '@/util/vnode';

// Types
import type { VComboboxSlots } from './VCombobox.base';
import type { FilterMatch } from '@/composables/filter';
import type { GenericProps } from '@/engines/vue';
import type { SelectItemKey } from '@/util/helpers';

export { makeVComboboxProps, VComboboxSlots } from './VCombobox.base';

function highlightResult(text: string, matches: FilterMatch | undefined, length: number) {
  if (matches == null) return text;

  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');

  return typeof matches === 'number' && ~matches
    ? (
      <>
        <span class="v-combobox__unmask">{ text.substr(0, matches) }</span>
        <span class="v-combobox__mask">{ text.substr(matches, length) }</span>
        <span class="v-combobox__unmask">{ text.substr(matches + length) }</span>
      </>
    )
    : text;
}

type Primitive = string | number | boolean | symbol

type Val <T, ReturnObject extends boolean> = string | ([T] extends [Primitive]
  ? T
  : (ReturnObject extends true ? T : any))

type Value <T, ReturnObject extends boolean, Multiple extends boolean> =
  Multiple extends true
    ? readonly Val<T, ReturnObject>[]
    : Val<T, ReturnObject> | null

type ItemType<T> = T extends readonly (infer U)[] ? U : never;

export const VCombobox = genericVueComponent<new <
  T extends readonly any[],
  Item = ItemType<T>,
  ReturnObject extends boolean = true,
  Multiple extends boolean = false,
  V extends Value<Item, ReturnObject, Multiple> = Value<Item, ReturnObject, Multiple>
>(props: {
  items?: T;
  itemTitle?: SelectItemKey<ItemType<T>>;
  itemValue?: SelectItemKey<ItemType<T>>;
  itemProps?: SelectItemKey<ItemType<T>>;
  returnObject?: ReturnObject;
  multiple?: Multiple;
  modelValue?: V | null;
  'onUpdate:modelValue'?: (value: V) => void;
},
  slots: VComboboxSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  ..._Combobox,
  renderHeadless: (
    vm,
    {
      displayItems,
      isDirty,
      isPristine,
      textFieldProps,
      textColorClasses,
      textColorStyles,
      vTextFieldRef,
      search,
      isFocused,
      listRef,
      selectedValues,
      model,
      menu,
      vMenuRef,
      menuDisabled,
      counterValue,
      noDataText,
      titleText,
      rootClasses,
      rootStyles,
      vVirtualScrollRef,
      highlightFirst,
      hasChips,
      selectionIndex,
      getMatches,
      onUpdateModelValue,
      onClear,
      onMousedownControl,
      onKeydown,
      onAfterLeave,
      onListKeydown,
      onFocusin,
      onFocusout,
      onListScroll,
      select,
      noop,
      onMousedownMenuIcon,
    },
    { props, slots },
  ) => {
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
        v-model={ search.value }
        onUpdate:modelValue={ onUpdateModelValue }
        v-model:focused={ isFocused.value }
        validationValue={ model.externalValue }
        counterValue={ counterValue.value }
        dirty={ isDirty.value }
        class={ rootClasses.value }
        style={ rootStyles.value }
        readonly={ props.readonly }
        placeholder={ isDirty.value ? undefined : props.placeholder }
        onClick:clear={ onClear }
        onMousedown:control={ onMousedownControl }
        onKeydown={ onKeydown }
      >
        {{
          ...slots,
          default: () => (
            <>
              <VMenu
                ref={ vMenuRef }
                v-model={ menu.value }
                activator="parent"
                contentClass="v-combobox__content"
                disabled={ menuDisabled.value }
                eager={ props.eager }
                maxHeight={ 310 }
                openOnClick={ false }
                closeOnContentClick={ false }
                transition={ props.transition }
                onAfterLeave={ onAfterLeave }
                { ...props.menuProps }
              >
                { hasList && (
                  <VList
                    ref={ listRef }
                    selected={ selectedValues.value }
                    selectStrategy={ props.multiple ? 'independent' : 'single-independent' }
                    onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    onKeydown={ onListKeydown }
                    onFocusin={ onFocusin }
                    onFocusout={ onFocusout }
                    onScrollPassive={ onListScroll }
                    tabindex="-1"
                    aria-live="polite"
                    color={ props.itemColor ?? props.color }
                    { ...props.listProps }
                  >
                    { slots['prepend-item']?.() }

                    { !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? (
                      <VListItem title={ noDataText.value } />
                    ))}

                    <VVirtualScroll ref={ vVirtualScrollRef } renderless items={ displayItems.value }>
                      { ({ item, index, itemRef }) => {
                        const itemProps = mergeProps(item.props, {
                          ref: itemRef,
                          key: index,
                          active: (highlightFirst.value && index === 0) ? true : undefined,
                          onClick: () => select(item, null),
                        });

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
                            title: () => {
                              return isPristine.value
                                ? item.title
                                : highlightResult(item.title, getMatches(item)?.title, search.value?.length ?? 0);
                            },
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
                function onChipClose(e: Event) {
                  e.stopPropagation();
                  e.preventDefault();

                  select(item, false);
                }

                const slotProps = {
                  'onClick:close': onChipClose,
                  onKeydown(e: KeyboardEvent) {
                    if (e.key !== 'Enter' && e.key !== ' ') return;

                    e.preventDefault();
                    e.stopPropagation();

                    onChipClose(e);
                  },
                  onMousedown(e: MouseEvent) {
                    e.preventDefault();
                    e.stopPropagation();
                  },
                  modelValue: true,
                  'onUpdate:modelValue': undefined,
                };

                const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
                const slotContent = hasSlot
                  ? ensureValidVNode(
                    hasChips.value
                      ? slots.chip!({ item, index, props: slotProps })
                      : slots.selection!({ item, index })
                  )
                  : undefined;

                if (hasSlot && !slotContent) return undefined;

                return (
                  <div
                    key={ item.value }
                    class={[
                      'v-combobox__selection',
                      index === selectionIndex.value && [
                        'v-combobox__selection--selected',
                        textColorClasses.value,
                      ],
                    ]}
                    style={ index === selectionIndex.value ? textColorStyles.value : {} }
                  >
                    { hasChips.value ? (
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
                        <span class="v-combobox__selection-text">
                          { item.title }
                          { props.multiple && (index < model.value.length - 1) && (
                            <span class="v-combobox__selection-comma">,</span>
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
              { (!props.hideNoData || props.items.length) && props.menuIcon ? (
                <VIcon
                  class="v-combobox__menu-icon"
                  icon={ props.menuIcon }
                  onMousedown={ onMousedownMenuIcon }
                  onClick={ noop }
                  aria-label={ titleText.value }
                  title={ titleText.value }
                  tabindex="-1"
                />
              ) : undefined }
            </>
          ),
        }}
      </VTextField>
    );
  },
});

export type VCombobox = InstanceType<typeof VCombobox>;
