// Components
import { VStepperActions } from './VStepperActions';
import { VStepperHeader } from './VStepperHeader';
import { VStepperItem } from './VStepperItem';
import { VStepperWindow } from './VStepperWindow';
import { VStepperWindowItem } from './VStepperWindowItem';
import { VDivider } from '@/components/VDivider';
import { VSheet } from '@/components/VSheet/VSheet';

// Utilities
import { _Stepper } from './VStepper.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VStepperSlots } from './VStepper.base';

export { makeVStepperProps, VStepperSlots, VStepperSlot } from './VStepper.base';

export const VStepper = genericVueComponent<VStepperSlots>()({
  ..._Stepper,
  renderHeadless: (
    vm,
    {
      items,
      sheetProps,
      rootClasses,
      rootStyles,
      prev,
      next,
    },
    { props, slots },
  ) => {
    const hasHeader = !!(slots.header || props.items.length);
    const hasWindow = props.items.length > 0;
    const hasActions = !props.hideActions && !!(hasWindow || slots.actions);

    return (
      <VSheet
        { ...sheetProps.value }
        color={ props.bgColor }
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasHeader && (
          <VStepperHeader key="stepper-header">
            { items.value.map(({ raw, ...item }, index) => (
              <>
                { !!index && (<VDivider />) }

                <VStepperItem
                  { ...item }
                  v-slots={{
                    default: slots[`header-item.${item.value}`] ?? slots.header,
                    icon: slots.icon,
                    title: slots.title,
                    subtitle: slots.subtitle,
                  }}
                />
              </>
            ))}
          </VStepperHeader>
        )}

        { hasWindow && (
          <VStepperWindow key="stepper-window">
            { items.value.map((item) => (
              <VStepperWindowItem
                value={ item.value }
                v-slots={{
                  default: () => slots[`item.${item.value}`]?.(item) ?? slots.item?.(item),
                }}
              />
            ))}
          </VStepperWindow>
        )}

        { slots.default?.({ prev, next }) }

        { hasActions && (
          slots.actions?.({ next, prev }) ?? (
            <VStepperActions
              key="stepper-actions"
              onClick:prev={ () => prev() }
              onClick:next={ next }
              v-slots={ slots }
            />
          )
        )}
      </VSheet>
    );
  },
});

export type VStepper = InstanceType<typeof VStepper>;
