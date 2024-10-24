// Composables
import { injectDefaults, internalUseDefaults } from '@/composables/defaults';

// Utilities
import { consoleWarn } from './console';
import { pick } from './helpers';
import { propsFactory } from './propsFactory';

// Types
import type { Data } from 'alpine-composition';
import type {
  Component,
  ComponentObjectPropsOptions,
  ComponentPropsOptions,
  ComponentPublicInstance,
  EmitsOptions,
  ExtractPropTypes,
  FunctionalComponent,
} from 'vue';
import type { HeadlessComponentOptions } from '@/engines/types';

// Implementation
export function defineComponent<
  T extends Data,
  P extends ComponentObjectPropsOptions,
  E extends EmitsOptions,
  RI extends Data,
  S extends object,
>(options: HeadlessComponentOptions<T, P, E, RI, S>): HeadlessComponentOptions<T, P, E, RI, S> & FilterPropsOptions<P> {
  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');
    return options as typeof options & FilterPropsOptions<P>;
  }

  const { exposeDefaults = true } = options;
  if (!exposeDefaults) return options as typeof options & FilterPropsOptions<P>;

  options._setupHeadless = options._setupHeadless ?? options.setupHeadless;

  if (options._setupHeadless) {
    options.props = propsFactory(options.props ?? {}, options.name)() as any;
    const propKeys = Object.keys(options.props).filter((key) => key !== 'class' && key !== 'style');
    options.filterProps = function filterProps(props: Record<string, any>) {
      return pick(props, propKeys);
    } as any;

    (options.props as any)._as = String;
    options.setupHeadless = (props: Record<string, any>, vm) => {
      const defaults = injectDefaults(vm);

      const setupFn = options._setupHeadless as typeof options.setupHeadless;

      // Skip props proxy if defaults are not provided
      if (!defaults.value) return setupFn(props as any, vm);

      const { props: _props, provideSubDefaults } = internalUseDefaults(vm, props, props._as ?? options.name, defaults);

      const setupBindings = setupFn(_props as any, vm);

      provideSubDefaults();

      return setupBindings;
    };
  }

  return options as typeof options & FilterPropsOptions<P>;
}

// Adds a filterProps method to the component options
export interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
  filterProps<
    T extends Partial<Props>,
    // NOTE: Also remove 'style' and 'class', since we filter them out
    // in the implementation
    U extends Exclude<keyof Props, Exclude<keyof Props, keyof T> | 'style' | 'class'>
  > (props: T): Partial<Pick<T, U>>;
}

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
