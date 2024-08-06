import { IntersectDirective } from './intersect';
import { createAlpineDirective } from '@/engines/alpine';

export type { IntersectValue, IntersectModifiers } from './intersect';

export const Intersect = createAlpineDirective(IntersectDirective);
