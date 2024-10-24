// Composables
import { useList } from './list';
import { makeComponentProps, useComponent } from '@/composables/component';
import { useNestedItem } from '@/composables/nested/nested';
import { useSsrBoot } from '@/composables/ssrBoot';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { IconValue } from '../VIcon/icons.base';
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

export type VListGroupSlots = {
  default: never;
  activator: { isOpen: boolean, props: Record<string, unknown> };
}

export const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: '$collapse',
  },
  expandIcon: {
    type: IconValue,
    default: '$expand',
  },
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListGroup');

export const _ListGroup = defineComponent({
  name: 'VListGroup',

  props: makeVListGroupProps(),

  slots: makeSlots<VListGroupSlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { isOpen, open, id: _id } = useNestedItem(vm, toRef(props, 'value'), true);
    const id = computed(() => `v-list-group--id-${String(_id.value)}`);
    const list = useList(vm);
    const { isBooted } = useSsrBoot(vm);

    function onClick(e: Event) {
      e.stopPropagation();
      open(!isOpen.value, e);
    }

    const activatorProps = computed(() => ({
      onClick,
      class: 'v-list-group__header',
      id: id.value,
    }));

    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        active: isOpen.value,
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || (props.subgroup && toggleIcon.value),
        appendIcon: props.appendIcon || (!props.subgroup && toggleIcon.value),
        title: props.title,
        value: props.value,
      },
    }));

    const rootClasses = computed(() => normalizeClass([
      'v-list-group',
      {
        'v-list-group--prepend': !!(list?.hasPrepend.value),
        'v-list-group--fluid': props.fluid,
        'v-list-group--subgroup': props.subgroup,
        'v-list-group--open': isOpen.value,
      },
      classes.value,
    ]));

    return {
      expose: {
        isOpen,
      },
      renderInput: {
        id,
        isBooted,
        isOpen,
        activatorDefaults,
        activatorProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
