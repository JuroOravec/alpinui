import { IntersectDirective } from './v-intersect.base';
import { createAlpineDirective } from '@/engines/alpine';

export type { IntersectValue, IntersectModifiers } from './v-intersect.base';

export const Intersect = createAlpineDirective(IntersectDirective);
