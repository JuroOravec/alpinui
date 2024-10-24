// Composables
import { makeComponentProps, useComponent } from '@/composables/component';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { camelize, capitalize } from '@/util/helpers';

// Types
import type { Slot } from 'vue';

export function createSimpleFunctionalHeadless(
  klass: string,
  tag = 'div',
  name?: string
) {
  return defineComponent({
    name: name ?? capitalize(camelize(klass.replace(/__/g, '-'))),

    props: {
      tag: {
        type: String,
        default: tag,
      },

      ...makeComponentProps(),
    },

    slots: {
      default: {} as Slot<any>,
    },

    setupHeadless: (props, vm) => {
      const { classes, styles } = useComponent(vm, props);
      return {
        expose: {},
        renderInput: {
          classes,
          styles,
        },
      };
    },

    renderHeadless: () => null,
  });
}
