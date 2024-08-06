import { TouchDirective } from './touch';
import { createAlpineDirective } from '@/engines/alpine';

export type { TouchHandlers, TouchData, TouchWrapper, TouchValue, TouchStoredHandlers } from './touch';

export const Touch = createAlpineDirective(TouchDirective);
