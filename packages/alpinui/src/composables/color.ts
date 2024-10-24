// Utilities
import {
  getForeground,
  isCssColor,
  isParsableColor,
  parseColor,
} from '@/util/colorUtils';
import { destructComputed } from '@/util/helpers';

// Types
import type { CSSProperties, Ref } from 'vue';
import type { HeadlessInstance } from '@/engines/types';

type ColorValue = string | false | null | undefined;

export interface TextColorData {
  textColorClasses: Ref<string[]>;
  textColorStyles: Ref<CSSProperties>;
}

export interface BackgroundColorData {
  backgroundColorClasses: Ref<string[]>;
  backgroundColorStyles: Ref<CSSProperties>;
}

// Composables
export function useColor(
  vm: HeadlessInstance,
  colors: Ref<{ background?: ColorValue, text?: ColorValue }>,
) {
  return destructComputed(vm, () => {
    const classes: string[] = [];
    const styles: CSSProperties = {};

    if (colors.value.background) {
      if (isCssColor(colors.value.background)) {
        styles.backgroundColor = colors.value.background;

        if (!colors.value.text && isParsableColor(colors.value.background)) {
          const backgroundColor = parseColor(colors.value.background);
          if (backgroundColor.a == null || backgroundColor.a === 1) {
            const textColor = getForeground(backgroundColor);

            styles.color = textColor;
            styles.caretColor = textColor;
          }
        }
      } else {
        classes.push(`bg-${colors.value.background}`);
      }
    }

    if (colors.value.text) {
      if (isCssColor(colors.value.text)) {
        styles.color = colors.value.text;
        styles.caretColor = colors.value.text;
      } else {
        classes.push(`text-${colors.value.text}`);
      }
    }

    return { colorClasses: classes, colorStyles: styles };
  });
}

export function useTextColor(
  vm: HeadlessInstance,
  color: Ref<ColorValue>,
): TextColorData;
export function useTextColor<T extends Partial<Record<K, ColorValue>>, K extends string>(
  vm: HeadlessInstance,
  props: T,
  name: K,
): TextColorData;
export function useTextColor<T extends Partial<Record<K, ColorValue>>, K extends string>(
  vm: HeadlessInstance,
  props: T | Ref<ColorValue>,
  name?: K,
): TextColorData {
  const { computed, isRef } = vm.reactivity;

  const colors = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null,
  }));

  const { colorClasses: textColorClasses, colorStyles: textColorStyles } =
    useColor(vm, colors);

  return { textColorClasses, textColorStyles };
}

export function useBackgroundColor(
  vm: HeadlessInstance,
  color: Ref<ColorValue>,
): BackgroundColorData;
export function useBackgroundColor<
  T extends Partial<Record<K, ColorValue>>,
  K extends string,
>(
  vm: HeadlessInstance,
  props: T,
  name: K,
): BackgroundColorData;
export function useBackgroundColor<
  T extends Partial<Record<K, ColorValue>>,
  K extends string,
>(
  vm: HeadlessInstance,
  props: T | Ref<ColorValue>,
  name?: K,
): BackgroundColorData {
  const { computed, isRef } = vm.reactivity;

  const colors = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null,
  }));

  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(vm, colors);

  return { backgroundColorClasses, backgroundColorStyles };
}
