// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { createForm, makeFormProps } from '@/composables/form';
import { forwardRefs } from '@/composables/forwardRefs';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { SubmitEventPromise } from '@/composables/form';

export const makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps(),
}, 'VForm');

export type VFormSlots = {
  default: ReturnType<typeof createForm>;
}

export const _Form = defineComponent({
  name: 'VForm',

  props: makeVFormProps(),

  emits: {
    'update:modelValue': (val: boolean | null) => true,
    submit: (e: SubmitEventPromise) => true,
  },

  slots: makeSlots<VFormSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const form = createForm(vm, props);
    const formRef = ref<HTMLFormElement>();

    function onReset(e: Event) {
      e.preventDefault();
      form.reset();
    }

    function onSubmit(_e: Event) {
      const e = _e as SubmitEventPromise;

      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);

      vm.emit('submit', e);

      if (!e.defaultPrevented) {
        ready.then(({ valid }) => {
          if (valid) {
            formRef.value?.submit();
          }
        });
      }

      e.preventDefault();
    }

    const rootClasses = computed(() => normalizeClass([
      'v-form',
      classes.value,
    ]));

    return {
      expose: forwardRefs(form, formRef),
      renderInput: {
        form,
        formRef,
        rootClasses,
        rootStyles: styles,
        onReset,
        onSubmit,
      },
    };
  },
  renderHeadless: () => null,
});
