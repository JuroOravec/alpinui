import { ScrollDirective } from './scroll';
import { createVueDirective } from '@/engines/vue';

export type { ScrollValue, ScrollModifiers } from './scroll';

export const Scroll = createVueDirective(ScrollDirective);
