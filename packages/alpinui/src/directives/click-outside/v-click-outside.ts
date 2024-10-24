import { ClickOutsideDirective } from './v-click-outside.base';
import { createVueDirective } from '@/engines/vue';

export type { ClickOutsideValue } from './v-click-outside.base';

export const ClickOutside = createVueDirective(ClickOutsideDirective);
