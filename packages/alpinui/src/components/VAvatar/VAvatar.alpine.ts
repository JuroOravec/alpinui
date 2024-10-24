// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import { _Avatar } from './VAvatar.base';
import { defineAlpineComponent } from '@/engines/alpine';

export { makeVAvatarProps as makeAAvatarProps } from './VAvatar.base';

export const AAvatar = defineAlpineComponent({
  ..._Avatar,
  name: 'AAvatar',
});

export type AAvatar = AlpineInstanceFromOptions<typeof AAvatar>;
