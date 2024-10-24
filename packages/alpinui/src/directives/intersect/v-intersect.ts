import { IntersectDirective } from './v-intersect.base';
import { createVueDirective } from '@/engines/vue';

export type { IntersectValue, IntersectModifiers } from './v-intersect.base';

export const Intersect = createVueDirective(IntersectDirective);
