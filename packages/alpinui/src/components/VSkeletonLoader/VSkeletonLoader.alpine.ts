// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _SkeletonLoader } from './VSkeletonLoader.base';
import { defineAlpineComponent } from '@/engines/alpine';

export {
  makeVSkeletonLoaderProps as makeASkeletonLoaderProps,
  VSkeletonLoaderSlots as ASkeletonLoaderSlots,
  VSkeletonBones as ASkeletonBones,
  VSkeletonLoaderType as ASkeletonLoaderType,
  rootTypes,
} from './VSkeletonLoader.base';

export const ASkeletonLoader = defineAlpineComponent({
  ..._SkeletonLoader,
  name: 'ASkeletonLoader',
});

export type ASkeletonLoader = AlpineInstanceFromOptions<typeof ASkeletonLoader>;
