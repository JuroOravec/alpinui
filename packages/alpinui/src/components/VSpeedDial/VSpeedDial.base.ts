// Styles
import './VSpeedDial.sass';

// Components
import { makeVMenuProps } from '@/components/VMenu/VMenu.base';

// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { ComputedRef } from 'vue';
import { _Menu } from '../VMenu/VMenu.base';
import type { VMenu } from '@/components/VMenu/VMenu';
import type { VOverlaySlots } from '@/components/VOverlay/VOverlay';
import type { Anchor } from '@/util/anchor';

export const makeVSpeedDialProps = propsFactory({
  ...makeComponentProps(),
  ...makeVMenuProps({
    offset: 8,
    minWidth: 0,
    openDelay: 0,
    closeDelay: 100,
    location: 'top center' as const,
    transition: 'scale-transition',
  }),
}, 'VSpeedDial');

export type VSpeedDialSlots = VOverlaySlots;

export const _SpeedDial = defineComponent({
  name: 'VSpeedDial',

  props: makeVSpeedDialProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VSpeedDialSlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const model = useProxiedModel(vm, props, 'modelValue');

    const menuRef = ref<VMenu>();

    const location = computed(() => {
      const [y, x = 'center'] = props.location.split(' ');

      return `${y} ${x}`;
    }) as ComputedRef<Anchor>;

    const locationClasses = computed(() => ({
      [`v-speed-dial__content--${location.value.replace(' ', '-')}`]: true,
    }));

    const menuProps = computed(() => _Menu.filterProps(props));

    const contentClasses = computed(() => normalizeClass([
      'v-speed-dial__content',
      locationClasses.value,
    ]));

    const defaults = computed(() => ({
      VBtn: {
        size: 'small',
      },
    }));

    return {
      expose: {},
      renderInput: {
        contentClasses,
        defaults,
        location,
        model,
        menuProps,
        menuRef,
        rootClasses: classes,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
