// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Img } from './VImg.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVImgProps as makeAImgProps,
  VImgSlots as AImgSlots,
} from './VImg.base';

export const AImg = defineAlpineComponent({
  ..._Img,
  name: 'AImg',
});

export type AImg = AlpineInstanceFromOptions<typeof AImg>;
