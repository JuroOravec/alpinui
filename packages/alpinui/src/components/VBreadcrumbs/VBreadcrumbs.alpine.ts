// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Breadcrumbs } from './VBreadcrumbs.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVBreadcrumbsProps as makeABreadcrumbsProps,
  VBreadcrumbsSlots as ABreadcrumbsSlots,
} from './VBreadcrumbs.base';

export const ABreadcrumbs = defineAlpineComponent({
  ..._Breadcrumbs,
  name: 'ABreadcrumbs',
});

export type ABreadcrumbs = AlpineInstanceFromOptions<typeof ABreadcrumbs>;
