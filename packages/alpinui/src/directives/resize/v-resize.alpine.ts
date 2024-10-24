import { ResizeDirective } from './v-resize.base';
import { createAlpineDirective } from '@/engines/alpine';

export type { ResizeValue, ResizeModifiers } from './v-resize.base';

export const Resize = createAlpineDirective(ResizeDirective);
