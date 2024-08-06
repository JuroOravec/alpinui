import { ResizeDirective } from './resize';
import { createAlpineDirective } from '@/engines/alpine';

export type { ResizeValue, ResizeModifiers } from './resize';

export const Resize = createAlpineDirective(ResizeDirective);
