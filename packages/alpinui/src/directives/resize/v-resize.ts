import { ResizeDirective } from './resize';
import { createVueDirective } from '@/engines/vue';

export type { ResizeValue, ResizeModifiers } from './resize';

export const Resize = createVueDirective(ResizeDirective);
