import { TouchDirective } from './touch';
import { createVueDirective } from '@/engines/vue';

export type { TouchHandlers, TouchData, TouchWrapper, TouchValue, TouchStoredHandlers } from './touch';

export const Touch = createVueDirective(TouchDirective);
