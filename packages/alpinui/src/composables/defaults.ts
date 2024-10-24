// Utilities
import { mergeDeep } from '@/util/helpers';
import { injectSelf } from '@/util/injectSelf';

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';
import type { MaybeRef } from '@/util/helpers';

export type DefaultsInstance = undefined | {
  [key: string]: undefined | Record<string, unknown>;
  global?: Record<string, unknown>;
}

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vuetify:defaults');

export function createDefaults(
  vm: HeadlessInstance,
  options?: DefaultsInstance,
): Ref<DefaultsInstance> {
  const { ref } = vm.reactivity;
  return ref(options);
}

export function injectDefaults(vm: HeadlessInstance) {
  const { inject } = vm.reactivity;

  const defaults = inject(DefaultsSymbol);

  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');

  return defaults;
}

export function provideDefaults(
  vm: HeadlessInstance,
  defaults?: MaybeRef<DefaultsInstance>,
  options?: {
    disabled?: MaybeRef<boolean | undefined>;
    reset?: MaybeRef<number | string | undefined>;
    root?: MaybeRef<boolean | string | undefined>;
    scoped?: MaybeRef<boolean | undefined>;
  }
) {
  const { computed, provide, ref, unref } = vm.reactivity;

  const injectedDefaults = injectDefaults(vm);
  const providedDefaults = ref(defaults);

  const newDefaults = computed(() => {
    const disabled = unref(options?.disabled);

    if (disabled) return injectedDefaults.value;

    const scoped = unref(options?.scoped);
    const reset = unref(options?.reset);
    const root = unref(options?.root);

    if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value;

    let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value });

    if (scoped) return properties;

    if (reset || root) {
      const len = Number(reset || Infinity);

      for (let i = 0; i <= len; i++) {
        if (!properties || !('prev' in properties)) {
          break;
        }

        properties = properties.prev;
      }

      if (properties && typeof root === 'string' && root in properties) {
        properties = mergeDeep(mergeDeep(properties, { prev: properties }), properties[root]);
      }

      return properties;
    }

    return properties.prev
      ? mergeDeep(properties.prev, properties)
      : properties;
  }) as ComputedRef<DefaultsInstance>;

  provide(DefaultsSymbol, newDefaults);

  return newDefaults;
}

export function internalUseDefaults(
  vm: HeadlessInstance,
  props: Record<string, any> = {},
  name?: string,
  defaults = injectDefaults(vm)
) {
  const { computed, provide, shallowRef, watchEffect } = vm.reactivity;

  // NOTE(Alpinui): Changed how name is obtained
  name = name ?? vm.name;
  if (!name) {
    throw new Error('[Vuetify] Could not determine component name');
  }

  const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
  const _props = new Proxy(props, {
    get(target, prop) {
      const propValue = Reflect.get(target, prop);
      if (prop === 'class' || prop === 'style') {
        return [componentDefaults.value?.[prop], propValue].filter((v) => v != null);
      } else if (typeof prop === 'string' && !vm.propIsDefined(prop)) {
        return componentDefaults.value?.[prop] !== undefined ? componentDefaults.value?.[prop]
          : defaults.value?.global?.[prop] !== undefined ? defaults.value?.global?.[prop]
          : propValue;
      }
      return propValue;
    },
  });

  const _subcomponentDefaults = shallowRef();
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()));
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : undefined;
    } else {
      _subcomponentDefaults.value = undefined;
    }
  });

  function provideSubDefaults() {
    const injected = injectSelf(vm, DefaultsSymbol);
    provide(DefaultsSymbol, computed(() => {
      return _subcomponentDefaults.value ? mergeDeep(
        injected?.value ?? {},
        _subcomponentDefaults.value
      ) : injected?.value;
    }));
  }

  return { props: _props, provideSubDefaults };
}

export function useDefaults<T extends Record<string, any>> (
  vm: HeadlessInstance,
  props: T,
  name?: string,
): T
export function useDefaults (
  vm: HeadlessInstance,
  props?: undefined,
  name?: string,
): Record<string, any>
export function useDefaults(
  vm: HeadlessInstance,
  props: Record<string, any> = {},
  name?: string,
) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(vm, props, name);
  provideSubDefaults();
  return _props;
}
