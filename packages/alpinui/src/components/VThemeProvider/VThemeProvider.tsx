// Utilities
import { _ThemeProvider } from './VThemeProvider.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VThemeProviderSlots } from './VThemeProvider.base';

export { makeVThemeProviderProps, VThemeProviderSlots } from './VThemeProvider.base';

export const VThemeProvider = genericVueComponent<VThemeProviderSlots>()({
  ..._ThemeProvider,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    if (!props.withBackground) return slots.default?.() ?? null;

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { slots.default?.() }
      </props.tag>
    );
  },
});

export type VThemeProvider = InstanceType<typeof VThemeProvider>;
