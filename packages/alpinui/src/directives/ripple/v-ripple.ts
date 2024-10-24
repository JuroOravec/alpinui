import { RippleDirective } from './v-ripple.base';
import { createVueDirective } from '@/engines/vue';

export type { RippleValue } from './v-ripple.base';

export const Ripple = createVueDirective(RippleDirective);
