import { ClickOutsideDirective } from './click-outside';
import { createVueDirective } from '@/engines/vue';

export type { ClickOutsideValue } from './click-outside';

export const ClickOutside = createVueDirective(ClickOutsideDirective);
