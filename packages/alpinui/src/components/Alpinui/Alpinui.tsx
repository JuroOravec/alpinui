// Utilities
import { _Alpinui } from './Alpinui.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { AlpinuiSlots } from './Alpinui.base';

export { AlpinuiSlots } from './Alpinui.base';

export const VAlpinui = genericVueComponent<AlpinuiSlots>()({
  ..._Alpinui,
});

export type VAlpinui = InstanceType<typeof VAlpinui>;
