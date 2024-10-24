import { ScrollDirective } from './v-scroll.base';
import { createAlpineDirective } from '@/engines/alpine';

export type { ScrollValue, ScrollModifiers } from './v-scroll.base';

export const Scroll = createAlpineDirective(ScrollDirective);
