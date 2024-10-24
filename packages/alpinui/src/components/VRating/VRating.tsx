// Components
import { VBtn } from '@/components/VBtn';

// Utilities
import { _Rating } from './VRating.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VRatingSlots } from './VRating.base';
import type { Variant } from '@/composables/variant';

export { makeVRatingProps, VRatingSlots } from './VRating.base';

export const VRating = genericVueComponent<VRatingSlots>()({
  ..._Rating,
  renderHeadless: (
    vm,
    {
      eventState,
      itemState,
      name,
      normalizedValue,
      range,
      rootClasses,
      rootStyles,
      t,
    },
    { props, slots },
  ) => {
    function VRatingItem({ value, index, showStar = true }: { value: number, index: number, showStar?: boolean }) {
      const { onMouseenter, onMouseleave, onClick } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace('.', '-')}`;
      const btnProps = {
        color: itemState.value[index]?.color,
        density: props.density,
        disabled: props.disabled,
        icon: itemState.value[index]?.icon,
        ripple: props.ripple,
        size: props.size,
        variant: 'plain' as Variant,
      };
      return (
        <>
          <label
            for={ id }
            class={{
              'v-rating__item--half': props.halfIncrements && value % 1 > 0,
              'v-rating__item--full': props.halfIncrements && value % 1 === 0,
            }}
            onMouseenter={ onMouseenter }
            onMouseleave={ onMouseleave }
            onClick={ onClick }
          >
            <span class="v-rating__hidden">{ t(props.itemAriaLabel, value, props.length) }</span>
            {
              !showStar ? undefined
              : slots.item ? slots.item({
                ...itemState.value[index],
                props: btnProps,
                value,
                index,
                rating: normalizedValue.value,
              })
              : (
                <VBtn
                  aria-label={ t(props.itemAriaLabel, value, props.length) }
                  { ...btnProps }
                />
              )
            }
          </label>

          <input
            class="v-rating__hidden"
            name={ name.value }
            id={ id }
            type="radio"
            value={ value }
            checked={ normalizedValue.value === value }
            tabindex={ -1 }
            readonly={ props.readonly }
            disabled={ props.disabled }
          />
        </>
      );
    }

    const hasLabels = !!props.itemLabels?.length || slots['item-label'];

    function createLabel(labelProps: { value: number, index: number, label?: string }) {
      if (slots['item-label']) return slots['item-label'](labelProps);

      if (labelProps.label) return <span>{ labelProps.label }</span>;

      return <span>&nbsp;</span>;
    }

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        <VRatingItem value={ 0 } index={ -1 } showStar={ false } />

        { range.value.map((value, i) => (
          <div class="v-rating__wrapper">
            {
              hasLabels && props.itemLabelPosition === 'top'
                ? createLabel({ value, index: i, label: props.itemLabels?.[i] })
                : undefined
            }
            <div class="v-rating__item">
              { props.halfIncrements ? (
                <>
                  <VRatingItem value={ value - 0.5 } index={ i * 2 } />
                  <VRatingItem value={ value } index={ (i * 2) + 1 } />
                </>
              ) : (
                <VRatingItem value={ value } index={ i } />
              )}
            </div>
            {
              hasLabels && props.itemLabelPosition === 'bottom'
                ? createLabel({ value, index: i, label: props.itemLabels?.[i] })
                : undefined
            }
          </div>
        ))}
      </props.tag>
    );
  },
});

export type VRating = InstanceType<typeof VRating>;
