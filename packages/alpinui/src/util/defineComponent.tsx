// Composables
import { injectDefaults, internalUseDefaults } from '@/composables/defaults';

// Utilities
import { consoleWarn } from './console';
import { pick } from './helpers';
import { propsFactory } from './propsFactory';

// Types
import type { ComponentOptions, Data, EmitsOptions } from 'alpine-composition';
import type {
  Component,
  ComponentPublicInstance,
  FunctionalComponent,
} from 'vue';

// TODO
// TODO
// TODO - TODO - USE THIS INSTEAD OF @/alpine/component !!!
// TODO
// TODO

// Implementation
export function defineComponent<
  T extends Data,
  P extends Data,
  E extends EmitsOptions,
>(options: ComponentOptions<T, P, E>) {
  options._setup = options._setup ?? options.setup;

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');

    return options;
  }

  if (options._setup) {
    options.props = propsFactory(options.props ?? {}, options.name)() as any;
    const propKeys = Object.keys(options.props).filter((key) => key !== 'class' && key !== 'style');
    options.filterProps = function filterProps(props: Record<string, any>) {
      return pick(props, propKeys);
    };

    (options.props as any)._as = String;
    options.setup = (props: Record<string, any>, vm) => {
      const defaults = injectDefaults(vm);

      // Skip props proxy if defaults are not provided
      if (!defaults.value) return options._setup(props, vm);

      const { props: _props, provideSubDefaults } = internalUseDefaults(vm, props, props._as ?? options.name, defaults);

      const setupBindings = options._setup(_props, vm);

      provideSubDefaults();

      return setupBindings;
    };
  }

  return options;
}

// TODO
// TODO
// TODO - TODO - IS THIS NEEDED?
// TODO
// TODO

// https://github.com/vuejs/core/pull/10557
export type ComponentInstance<T> = T extends { new (): ComponentPublicInstance<any, any, any> }
  ? InstanceType<T>
  : T extends FunctionalComponent<infer Props, infer Emits>
    ? ComponentPublicInstance<Props, {}, {}, {}, {}, ShortEmitsToObject<Emits>>
    : T extends Component<
          infer Props,
          infer RawBindings,
          infer D,
          infer C,
          infer M
        >
      ? // NOTE we override Props/RawBindings/D to make sure is not `unknown`
      ComponentPublicInstance<
          unknown extends Props ? {} : Props,
          unknown extends RawBindings ? {} : RawBindings,
          unknown extends D ? {} : D,
          C,
          M
        >
      : never // not a vue Component

type ShortEmitsToObject<E> = E extends Record<string, any[]> ? {
  [K in keyof E]: (...args: E[K]) => any;
} : E;
