// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVBannerActionsProps = propsFactory({
  color: String,
  density: String,

  ...makeComponentProps(),
}, 'VBannerActions');

export interface VBannerActionsSlots extends RawSlots {
  default: never;
}

export const _BannerActions = defineComponent({
  name: 'VBannerActions',

  props: makeVBannerActionsProps(),

  slots: makeSlots<VBannerActionsSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    provideDefaults(vm, {
      VBtn: {
        color: props.color,
        density: props.density,
        slim: true,
        variant: 'text',
      },
    });

    const rootClasses = computed(() => normalizeClass([
      'v-banner-actions',
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
