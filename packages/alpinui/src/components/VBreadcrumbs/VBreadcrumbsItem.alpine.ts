// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _BreadcrumbsItem } from './VBreadcrumbsItem.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBreadcrumbsItemProps as makeABreadcrumbsItemProps,
  VBreadcrumbsItemSlots as ABreadcrumbsItemSlots,
} from './VBreadcrumbsItem.base';

export const ABreadcrumbsItem = defineAlpineComponent({
  ..._BreadcrumbsItem,
  name: 'ABreadcrumbsItem',
});

export type ABreadcrumbsItem = AlpineInstanceFromOptions<typeof ABreadcrumbsItem>;
