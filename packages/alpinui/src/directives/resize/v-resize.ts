import { ResizeDirective } from './v-resize.base';
import { createVueDirective } from '@/engines/vue';

export type { ResizeValue, ResizeModifiers } from './v-resize.base';

export const Resize = createVueDirective(ResizeDirective);
