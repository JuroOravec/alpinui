// Utilities
import { registerComponentFactory } from './component';

// Types
import type { AlpineComponent } from 'alpinejs';
import type { EmitsOptions } from 'vue';
import type { AlpineVM, ComponentFactoryFn } from './component';
import type { AlpineType, ComponentOptions, Data } from './types';

export interface PluginContext <
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
>{
  Alpine: AlpineType;
  args: any[];
  name: string;
  options: ComponentOptions<T, P, E>;
  vm: AlpineVM<T, P, E>;
}

export type PluginFn<
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
> = (
  vm: AlpineComponent<AlpineVM<T, P, E>>,
  ctx: PluginContext<T, P, E>,
) => void;

export interface CompositionOptions<
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
> {
  plugins?: PluginFn<T, P, E>[];
}

export const createAlpineComposition = <
  T extends Data = Data,
  P extends Data = Data,
  E extends EmitsOptions = EmitsOptions,
>(options: CompositionOptions<T, P, E>) => {
  const { plugins = [] } = options;

  const registerComponent = registerComponentFactory<T, P, E>((Alpine, options, name, factory) => {
    const factoryWithPlugins: ComponentFactoryFn<T, P, E> = (...args) => {
      const vm = factory(...args);

      const pluginCtx = {
        Alpine,
        args,
        name,
        options,
        vm,
      } satisfies PluginContext<T, P, E>;

      for (const plugin of plugins) {
        plugin(vm, pluginCtx);
      }

      return vm;
    };

    Alpine.data(name, factoryWithPlugins);
  });

  return {
    registerComponent,
  };
};
