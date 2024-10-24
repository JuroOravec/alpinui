// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Trendline } from './VTrendline.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVTrendlineProps as makeATrendlineProps,
  VTrendlineSlots as ATrendlineSlots,
  SparklineItem,
  SparklineText,
  Boundary,
  Point,
} from './VTrendline.base';

export const ATrendline = defineAlpineComponent({
  ..._Trendline,
  name: 'ATrendline',
});

export type ATrendline = AlpineInstanceFromOptions<typeof ATrendline>;
