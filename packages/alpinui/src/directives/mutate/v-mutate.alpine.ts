import { MutateDirective } from './v-mutate.base';
import { createAlpineDirective } from '@/engines/alpine';

export type { MutateValue } from './v-mutate.base';

export const Mutate = createAlpineDirective(MutateDirective);
