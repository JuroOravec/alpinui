// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Alpinui } from './Alpinui.base';
import { defineAlpineComponent } from '@/engines/alpine';

export const Alpinui = defineAlpineComponent({
  ..._Alpinui,
  name: 'Alpinui',
});

export type Alpinui = AlpineInstanceFromOptions<typeof Alpinui>;
