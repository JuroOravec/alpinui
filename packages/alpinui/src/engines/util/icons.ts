// Types
import type { IconComponent, IconSet } from '@/composables/icons';

interface PredefinedIcons {
  class: IconComponent | string;
  component: IconComponent | string;
  svg: IconComponent | string;
}

interface FallbackIconset {
  name: string;
  iconset: IconSet;
}

let icons: PredefinedIcons = null as any;
let fallbackIconset: FallbackIconset = null as any;

export const setIcons = ({ icons: newIcons, fallbackIconset: newFallback }: {
  icons: PredefinedIcons;
  fallbackIconset: FallbackIconset;
}) => {
  icons = newIcons;
  fallbackIconset = newFallback;
};

export const getIcons = () => ({
  icons,
  fallbackIconset,
});
