import { RippleDirective } from './ripple';
import { createAlpineDirective } from '@/engines/alpine';

export type { RippleValue } from './ripple';

export const Ripple = createAlpineDirective(RippleDirective);
