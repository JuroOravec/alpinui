import { IntersectDirective } from './intersect';
import { createVueDirective } from '@/engines/vue';

export type { IntersectValue, IntersectModifiers } from './intersect';

export const Intersect = createVueDirective(IntersectDirective);
