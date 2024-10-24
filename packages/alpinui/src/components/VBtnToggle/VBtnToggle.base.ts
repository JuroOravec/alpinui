// Styles
import './VBtnToggle.sass';

// Components
import { _BtnGroup, makeVBtnGroupProps } from '@/components/VBtnGroup/VBtnGroup.base';

// Composables
import { useComponent } from '@/composables/component';
import { makeGroupProps, useGroup } from '@/composables/group';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { InjectionKey } from 'vue';
import type { GroupProvide } from '@/composables/group';

export type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev'
export interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> { }

export const VBtnToggleSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-btn-toggle');

export type VBtnToggleSlots = {
  default: DefaultBtnToggleSlot;
}

export const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps(),
}, 'VBtnToggle');

export const _BtnToggle = defineComponent({
  name: 'VBtnToggle',

  props: makeVBtnToggleProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VBtnToggleSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { isSelected, next, prev, select, selected } = useGroup(vm, props, VBtnToggleSymbol);

    const btnGroupProps = computed(() => _BtnGroup.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-btn-toggle',
      classes.value,
    ]));

    return {
      expose: {
        next,
        prev,
        select,
      },
      renderInput: {
        btnGroupProps,
        rootClasses,
        rootStyles: styles,
        isSelected,
        next,
        prev,
        select,
        selected,
      },
    };
  },
  renderHeadless: () => null,
});
