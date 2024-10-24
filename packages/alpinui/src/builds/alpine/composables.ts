/*
 * PUBLIC INTERFACES ONLY
 * Imports in our code should be to the composable directly, not this file
 */

import { createAlpineComposable } from '@/engines/alpine';

// Composables
import { useDate as _useDate } from '@/composables/date';
import { useDefaults as _useDefaults } from '@/composables/defaults';
import { useDisplay as _useDisplay } from '@/composables/display';
import { useGoTo as _useGoTo } from '@/composables/goto';
import { useLayout as _useLayout } from '@/composables/layout';
import { useLocale as _useLocale, useRtl as _useRtl } from '@/composables/locale';
import { useTheme as _useTheme } from '@/composables/theme';

export type { DateInstance } from '@/composables/date';
export type { DefaultsInstance } from '@/composables/defaults';
export type { DisplayBreakpoint, DisplayInstance, DisplayThresholds } from '@/composables/display';
export type { SubmitEventPromise } from '@/composables/form';
export type { GoToInstance } from '@/composables/goto';
export type { IconAliases, IconProps, IconSet, IconOptions } from '@/composables/icons';
export type { LocaleInstance, LocaleMessages, RtlInstance, LocaleOptions, RtlOptions } from '@/composables/locale';
export type { ThemeDefinition, ThemeInstance } from '@/composables/theme';

export const useDate = createAlpineComposable(_useDate);
export const useDefaults = createAlpineComposable(_useDefaults);
export const useDisplay = createAlpineComposable(_useDisplay);
export const useGoTo = createAlpineComposable(_useGoTo);
export const useLayout = createAlpineComposable(_useLayout);
export const useLocale = createAlpineComposable(_useLocale);
export const useRtl = createAlpineComposable(_useRtl);
export const useTheme = createAlpineComposable(_useTheme);
