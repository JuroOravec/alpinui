import { MutateDirective } from './mutate';
import { createAlpineDirective } from '@/engines/alpine';

export type { MutateValue } from './mutate';

export const Mutate = createAlpineDirective(MutateDirective);
