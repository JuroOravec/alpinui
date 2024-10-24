import { ClickOutsideDirective } from './v-click-outside.base';
import { createAlpineDirective } from '@/engines/alpine';

export type { ClickOutsideValue } from './v-click-outside.base';

export const ClickOutside = createAlpineDirective(ClickOutsideDirective);
