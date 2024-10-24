import { MutateDirective } from './v-mutate.base';
import { createVueDirective } from '@/engines/vue';

export type { MutateValue } from './v-mutate.base';

export const Mutate = createVueDirective(MutateDirective);
