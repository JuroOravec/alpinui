import { TouchDirective } from './v-touch.base';
import { createVueDirective } from '@/engines/vue';

export type {
  TouchHandlers,
  TouchData,
  TouchWrapper,
  TouchValue,
  TouchStoredHandlers,
} from './v-touch.base';

export const Touch = createVueDirective(TouchDirective);
