import { MutateDirective } from './mutate';
import { createVueDirective } from '@/engines/vue';

export type { MutateValue } from './mutate';

export const Mutate = createVueDirective(MutateDirective);
