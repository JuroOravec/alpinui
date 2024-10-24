// TODO MAYBE?

// Utilities
import { h } from 'vue';
import { createSimpleFunctionalHeadless } from './createSimpleFunctional';
import { defineComponent } from '@/util/defineComponent';

export function createSimpleFunctionalVue(
  klass: string,
  tag = 'div',
  name?: string
) {
  return defineComponent({
    ...createSimpleFunctionalHeadless(klass, tag, name),
    renderHeadless: (vm, { classes, styles }, { slots, props }) => {
      return h(props.tag, {
        class: [klass, classes.value],
        style: styles.value,
      }, slots.default?.());
    },
  });
}
