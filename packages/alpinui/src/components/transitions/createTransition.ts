// Utilities
import { h, Transition, TransitionGroup } from 'vue';
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { FunctionalComponent, PropType } from 'vue';
import { genericVueComponent } from '@/engines/vue';

export const makeTransitionProps = propsFactory({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String,
}, 'transition');

export interface TransitionSlots {
  default: never;
}

export function createCssTransition(
  name: string,
  origin?: string,
  mode?: string
) {
  return genericVueComponent()(defineComponent({
    name,

    props: makeTransitionProps({
      mode,
      origin,
    }),

    slots: makeSlots<TransitionSlots>({
      default: null,
    }),

    setupHeadless(props, vm) {
      const functions = {
        onBeforeEnter(el: HTMLElement) {
          if (props.origin) {
            el.style.transformOrigin = props.origin;
          }
        },
        onLeave(el: HTMLElement) {
          if (props.leaveAbsolute) {
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el;
            el._transitionInitialStyles = {
              position: el.style.position,
              top: el.style.top,
              left: el.style.left,
              width: el.style.width,
              height: el.style.height,
            };
            el.style.position = 'absolute';
            el.style.top = `${offsetTop}px`;
            el.style.left = `${offsetLeft}px`;
            el.style.width = `${offsetWidth}px`;
            el.style.height = `${offsetHeight}px`;
          }

          if (props.hideOnLeave) {
            el.style.setProperty('display', 'none', 'important');
          }
        },
        onAfterLeave(el: HTMLElement) {
          if (props.leaveAbsolute && el?._transitionInitialStyles) {
            const { position, top, left, width, height } = el._transitionInitialStyles;
            delete el._transitionInitialStyles;
            el.style.position = position || '';
            el.style.top = top || '';
            el.style.left = left || '';
            el.style.width = width || '';
            el.style.height = height || '';
          }
        },
      };

      return {
        expose: {},
        renderInput: {
          functions,
        },
      };
    },
    renderHeadless: (
      vm,
      { functions },
      { props, slots }
    ) => {
      const tag = props.group ? TransitionGroup : Transition;

      return h(tag as FunctionalComponent, {
        name: props.disabled ? '' : name,
        css: !props.disabled,
        ...(props.group ? undefined : { mode: props.mode }),
        ...(props.disabled ? {} : functions),
      }, slots.default);
    },
  }));
}

export function createJavascriptTransition(
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
) {
  return genericVueComponent()(defineComponent({
    name,

    props: {
      mode: {
        type: String as PropType<'in-out' | 'out-in' | 'default'>,
        default: mode,
      },
      disabled: Boolean,
      group: Boolean,
    },

    slots: makeSlots<TransitionSlots>({
      default: null,
    }),

    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {},
      };
    },
    renderHeadless: (vm, _, { props, slots }) => {
      const tag = props.group ? TransitionGroup : Transition;

      return h(tag as FunctionalComponent, {
        name: props.disabled ? '' : name,
        css: !props.disabled,
        // mode: props.mode, // TODO(Vuetify): vuejs/vue-next#3104
        ...(props.disabled ? {} : functions),
      }, slots.default);
    },
  }));
}
