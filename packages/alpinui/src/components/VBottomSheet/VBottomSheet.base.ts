// Styles
import './VBottomSheet.sass';

// Components
import { _Dialog, makeVDialogProps } from '@/components/VDialog/VDialog.base';

// Composables
import { useComponent } from '@/composables/component';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { VOverlaySlots } from '@/components/VOverlay/VOverlay';
import type { RawSlots } from '@/engines/types';

export interface VBottomSheetSlots extends VOverlaySlots, RawSlots {
  /** Empty */
}

export const makeVBottomSheetProps = propsFactory({
  inset: Boolean,

  ...makeVDialogProps({
    transition: 'bottom-sheet-transition',
  }),
}, 'VBottomSheet');

export const _BottomSheet = defineComponent({
  name: 'VBottomSheet',

  props: makeVBottomSheetProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VBottomSheetSlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');

    const dialogProps = computed(() => _Dialog.filterProps(props));

    const dialogClasses = computed(() => normalizeClass([
      'v-bottom-sheet__content',
      props.contentClass,
    ]));

    const rootClasses = computed(() => normalizeClass([
      'v-bottom-sheet',
      { 'v-bottom-sheet--inset': props.inset },
      classes.value,
    ]));

    return {
      expose: {},
      renderInput: {
        dialogClasses,
        dialogProps,
        isActive,
        rootClasses,
        roootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
