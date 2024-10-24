// Styles
import './VDatePickerHeader.sass';

// Composables
import { useBackgroundColor } from '@/composables/color';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { EventProp, normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
export type VDatePickerHeaderSlots = {
  prepend: never;
  default: never;
  append: never;
}

export const makeVDatePickerHeaderProps = propsFactory({
  appendIcon: String,
  color: String,
  header: String,
  transition: String,
  onClick: EventProp<[MouseEvent]>(),
}, 'VDatePickerHeader');

export const _DatePickerHeader = defineComponent({
  name: 'VDatePickerHeader',

  props: makeVDatePickerHeaderProps(),

  emits: {
    click: () => true,
    'click:append': () => true,
  },

  slots: makeSlots<VDatePickerHeaderSlots>({
    prepend: null,
    default: null,
    append: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, props, 'color');

    function onClick() {
      vm.emit('click');
    }

    function onClickAppend() {
      vm.emit('click:append');
    }

    const rootClasses = computed(() => normalizeClass([
      'v-date-picker-header',
      {
        'v-date-picker-header--clickable': !!props.onClick,
      },
      backgroundColorClasses.value,
    ]));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        backgroundColorStyles,
        onClick,
        onClickAppend,
      },
    };
  },
  renderHeadless: () => null,
});
