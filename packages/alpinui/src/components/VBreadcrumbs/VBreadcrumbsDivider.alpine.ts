// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BreadcrumbsDivider } from './VBreadcrumbsDivider.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBreadcrumbsDividerProps as makeABreadcrumbsDividerProps,
  VBreadcrumbsDividerSlots as ABreadcrumbsDividerSlots,
} from './VBreadcrumbsDivider.base';

export const ABreadcrumbsDivider = defineAlpineComponent({
  ..._BreadcrumbsDivider,
  name: 'ABreadcrumbsDivider',
});

export type ABreadcrumbsDivider = AlpineInstanceFromOptions<typeof ABreadcrumbsDivider>;
