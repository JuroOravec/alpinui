// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _ListImg } from './VListImg.base';
import { defineAlpineComponent } from '@/engines/alpine';

export type { VListImgSlots as AListImgSlots } from './VListImg.base';

export const AListImg = defineAlpineComponent({
  ..._ListImg,
  name: 'AListImg',
});

export type AListImg = AlpineInstanceFromOptions<typeof AListImg>;
