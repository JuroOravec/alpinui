import { ScrollDirective } from './v-scroll.base';
import { createVueDirective } from '@/engines/vue';

export type { ScrollValue, ScrollModifiers } from './v-scroll.base';

export const Scroll = createVueDirective(ScrollDirective);
