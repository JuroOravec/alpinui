import { TouchDirective } from './v-touch.base';
import { createAlpineDirective } from '@/engines/alpine';

export type {
  TouchHandlers,
  TouchData,
  TouchWrapper,
  TouchValue,
  TouchStoredHandlers,
} from './v-touch.base';

export const Touch = createAlpineDirective(TouchDirective);
