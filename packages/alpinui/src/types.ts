// Types
import type { DateOptions } from '@/composables/date';
import type { DefaultsOptions } from '@/composables/defaults';
import type { DisplayOptions, SSROptions } from '@/composables/display';
import type { GoToOptions } from '@/composables/goto';
import type { IconOptions } from '@/composables/icons';
import type { LocaleOptions, RtlOptions } from '@/composables/locale';
import type { ThemeOptions } from '@/composables/theme';

export interface VuetifyOptions {
  aliases?: Record<string, any>;
  blueprint?: Blueprint;
  components?: Record<string, any>;
  date?: DateOptions;
  directives?: Record<string, any>;
  defaults?: DefaultsOptions;
  display?: DisplayOptions;
  goTo?: GoToOptions;
  theme?: ThemeOptions;
  icons?: IconOptions;
  locale?: LocaleOptions & RtlOptions;
  ssr?: SSROptions;
}

export interface Blueprint extends Omit<VuetifyOptions, 'blueprint'> {}
