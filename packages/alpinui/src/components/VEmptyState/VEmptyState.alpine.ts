// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _EmptyState } from './VEmptyState.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVEmptyStateProps as makeAEmptyStateProps,
  VEmptyStateSlots as AEmptyStateSlots,
} from './VEmptyState.base';

export const AEmptyState = defineAlpineComponent({
  ..._EmptyState,
  name: 'AEmptyState',
});

export type AEmptyState = AlpineInstanceFromOptions<typeof AEmptyState>;
