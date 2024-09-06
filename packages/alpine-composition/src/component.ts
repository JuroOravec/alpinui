// Utilities
import { reactive, watchEffect } from 'alpine-reactivity';
import { emit, handlerKeys, normalizeEmitsOptions } from './emit';

// Types
import type { ElementWithXAttributes, Magics } from 'alpinejs';
import type { Prop, EmitsOptions, ObjectEmitsOptions } from 'vue';
import type { EmitsToProps } from './emit';
import type { AlpineInstance, AlpineType, ComponentOptions, Data } from './types';
import { isInstanceOf, isPromise } from './utils';
import { createReactivityAPI } from './reactivity';

export type AlpineVM<
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions
> = Pick<
  AlpineInstance<T, P, E>,
  | '$name'
  | '$props'
  | '$attrs'
  | '$emit'
  | '$options'
  | '$emitsOptions'
  | '$onBeforeUnmount'
  | 'init'
  | 'destroy'
>;

const getPropDefault = <P>(prop: NonNullable<Prop<P>>): P | null | undefined => {
  // Only prop type is given as constructor
  if (typeof prop === 'function' || Array.isArray(prop)) {
    return undefined;
  }

  if (typeof prop.default === 'function') {
    return (prop.default as any)();
  } else {
    return prop.default as P | null | undefined;
  }
};

const isPropRequired = <P>(prop: NonNullable<Prop<P>>): boolean => {
  // Only prop type is given as constructor, which implies that a prop is optional
  if (typeof prop === 'function' || Array.isArray(prop)) {
    return false;
  }

  return !!prop.required;
};

const getPropType = <P>(prop: Prop<P> | null) => {
  // Check if prop type is given as constructor
  let propType = typeof prop === 'function' || Array.isArray(prop)
    ? prop
    : prop ? prop.type : null;

  if (typeof propType === 'function') {
    propType = [propType];
  }
  return propType;
};

const loadInitState = <T extends Data>(instance: Magics<T>, initKey: string) => {
  const dataAttr = `data-x-${initKey}`;
  const val = instance.$el.getAttribute(dataAttr)
  if (val == null) return;

  const initState = JSON.parse(val);

  Object.keys(initState).forEach((key) => {
    (instance as any)[key] = initState[key];
  });
};

const useProps = <T extends Data, P extends Data, E extends EmitsOptions>(
  Alpine: AlpineType,
  instance: Magics<T>,
  propsDef: ComponentOptions<T, P, E>['props'],
  emitOptions: ObjectEmitsOptions
) => {
  const compName = (instance as any as AlpineVM).$name;
  const propsExpression = instance.$el.getAttribute('x-props') || 'undefined';

  // NOTE: We want to use parentNode, so, inside `x-props`, we're using the data provided
  // by the PARENT alpine components.
  const getGivenProps = Alpine.evaluateLater(instance.$el.parentNode as Element, propsExpression);

  const parsedProps = reactive<P & EmitsToProps<E>>({} as any);

  const propKeys = Object.keys(propsDef);

  for (const event of Object.keys(emitOptions)) {
    const eventProps = handlerKeys(event);
    propKeys.push(...eventProps);
  }

  propKeys.forEach((key) => {
    watchEffect(() => {
      getGivenProps((givenProps = {}) => {
        if (!givenProps || typeof givenProps !== 'object') return;

        const propVal = (givenProps as any)[key];
        const propDef = propsDef[key];

        // Key is an event handler if it has no definition, in which
        // case we don't do validation nor set defaults.
        if (!propDef) {
          (parsedProps as any)[key] = propVal;
          return;
        }

        const propTypes = getPropType(propsDef[key]);
        const isRequired = isPropRequired(propDef);

        if (propVal !== undefined) {
          (parsedProps as any)[key] = propVal;
        } else {
          const propDefault = getPropDefault(propDef);
          if (propDefault !== undefined) {
            (parsedProps as any)[key] = propDefault;
          } else if (!isRequired) {
            (parsedProps as any)[key] = undefined;
          } else {
            throw Error(`[alpine-composition] ${compName}: Required prop '${key}' is missing`);
          }
        }

        // Check type if specific types given
        if (
          propTypes &&
          typeof propTypes !== 'boolean' &&
          // When a prop is NOT required, `null` and `undefined` pass type checks.
          // And only when the prop is required is when we consider even null/undefined.
          // See https://stackoverflow.com/questions/59125043/
          (isRequired || (!isRequired && parsedProps[key] != undefined))
        ) {
          if (!isInstanceOf(propTypes as any, parsedProps[key])) {
            throw Error(`[alpine-composition] ${compName}: Prop '${key}' is not an instance of ${propTypes}`);
          }
        }
      });
    });
  });

  return parsedProps;
};

const getAttributes = (element: Element) => {
  const attributes = element.attributes;
  const result: Record<string, string | true> = {};

  for (const attr of attributes) {
    // If attribute value is empty, set it to true, otherwise use the actual value
    result[attr.name] = attr.value === '' ? true : attr.value;
  }

  return result;
};

const makeInstance = <T extends AlpineInstance<Data, Data, any>>(
  Alpine: AlpineType,
  instance: T
): T => {
  return Alpine.mergeProxies(Alpine.closestDataStack(instance.$el)) as T;
};

const isolateInstance = (instance: AlpineInstance<Data, Data, any>) => {
  const el: ElementWithXAttributes = instance.$el;
  if (el._x_dataStack) {
    el._x_dataStack = el._x_dataStack.slice(0, 1);
  }
};

const applySetupContextToVm = <T extends Data, P extends Data, E extends EmitsOptions>(
  vm: AlpineVM<T, P, E>,
  data: T
) => {
  for (const attrname in data) {
    (vm as any)[attrname] = data[attrname];
  }
};

export const defineComponent = <T extends Data, P extends Data, E extends EmitsOptions>(
  options: ComponentOptions<T, P, E>
) => {
  return options;
};

export type RegisterComponentFn<T extends Data, P extends Data, E extends EmitsOptions> = (
  Alpine: AlpineType,
  options: ComponentOptions<T, P, E>,
  name: string,
  factoryFn: ComponentFactoryFn<T, P, E>
) => void;

export type ComponentFactoryFn<T extends Data, P extends Data, E extends EmitsOptions> = (
  ...args: any[]
) => AlpineVM<T, P, E>;

export const registerComponentFactory = <T extends Data, P extends Data, E extends EmitsOptions>(
  registerFn: RegisterComponentFn<T, P, E>
) => {
  return (Alpine: AlpineType, options: ComponentOptions<T, P, E>) => {
    const {
      name,
      props: propsDef,
      emits: emitsDef,
      setup,
      isolated = true,
      initKey = 'init',
    } = options;

    const readonlyOptions = Object.freeze({ ...options });
    const emitOptions = Object.freeze(normalizeEmitsOptions(emitsDef ?? null));

    return registerFn(Alpine, readonlyOptions, name, (...args: any[]) => {
      const onBeforeUnmountCbs: (() => void)[] = [];
      let parsedProps = {} as P & EmitsToProps<E>;

      const vm: AlpineVM<T, P, E> = {
        get $name() {
          return name;
        },
        get $props() {
          return parsedProps;
        },
        get $attrs() {
          const instance = this as AlpineInstance<T, P, E>;
          return getAttributes(instance.$el);
        },
        get $options() {
          return readonlyOptions;
        },
        get $emitsOptions() {
          return emitOptions;
        },
        $emit(name, ...args) {
          emit(vm as AlpineInstance<T, P, E>, name, ...args);
        },

        // See https://alpinejs.dev/globals/alpine-data#init-functions
        init() {
          let instance = this as AlpineInstance<T, P, E>;

          parsedProps = useProps<T, P, E>(Alpine, instance as Magics<T>, propsDef, emitOptions);

          // NOTE: The order here is important!
          if (isolated) {
            // If the component is isolated, we achieve so by modifying the AlpineJS data
            // Associated with the HTML element for this instance.
            isolateInstance(instance);
          }

          // However, modifying AlpineJS data takes effect only for future Alpine component
          // instances that will be created from given HTML element. As for the one we have
          // currently, `instance`, we need to recreated it for the changes to take effect.
          //
          // In other words, the old `instance` still points to the additional contexts that
          // we want to isolate from.
          instance = makeInstance(Alpine, instance);

          // And only once we have the (possibly isolated) instance, we can load the initial
          // state from the HTML. This must be done AFTER the above, because, Alpine contexts
          // work kinda like Django's Context, in that it's a stack/array of objects, where each
          // object represents one layer of the context. And if we introduce a new variable, it's
          // written to the LAST context. But isolating a component also makes it lose all it's
          // contexts except the FIRST one. So, effectively, throwing away all the changes applied
          // to in `loadInitState`.
          loadInitState(instance, initKey);

          const reactivityAPI = createReactivityAPI(instance);

          const data = setup(parsedProps, instance, reactivityAPI, ...args);

          if (isPromise(data)) {
            data.then((d) => applySetupContextToVm(vm, d))
          } else {
            applySetupContextToVm(vm, data);
          }
        },

        $onBeforeUnmount(cb: () => void) {
          onBeforeUnmountCbs.push(cb);
        },

        // See https://alpinejs.dev/globals/alpine-data#destroy-functions
        destroy() {
          onBeforeUnmountCbs.forEach((cb) => cb());
        },
      };

      return vm;
    });
  };
};

export const registerComponent = registerComponentFactory((Alpine, options, name, factory) => {
  return Alpine.data(name, factory);
});
