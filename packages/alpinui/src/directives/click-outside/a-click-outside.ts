import { ClickOutsideDirective } from './click-outside';
import { createAlpineDirective } from '@/engines/alpine';

export type { ClickOutsideValue } from './click-outside';

export const ClickOutside = createAlpineDirective(ClickOutsideDirective);
