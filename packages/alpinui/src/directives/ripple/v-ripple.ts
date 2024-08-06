import { RippleDirective } from './ripple';
import { createVueDirective } from '@/engines/vue';

export type { RippleValue } from './ripple';

export const Ripple = createVueDirective(RippleDirective);
