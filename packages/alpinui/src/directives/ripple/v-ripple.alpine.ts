import { RippleDirective } from './v-ripple.base';
import { createAlpineDirective } from '@/engines/alpine';

export type { RippleValue } from './v-ripple.base';

export const Ripple = createAlpineDirective(RippleDirective);
