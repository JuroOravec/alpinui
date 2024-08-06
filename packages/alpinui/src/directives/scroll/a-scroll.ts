import { ScrollDirective } from './scroll';
import { createAlpineDirective } from '@/engines/alpine';

export type { ScrollValue, ScrollModifiers } from './scroll';

export const Scroll = createAlpineDirective(ScrollDirective);
