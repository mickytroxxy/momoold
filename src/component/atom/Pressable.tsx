import {Theme} from '@/typings/globalTheme';
import {
  VariantProps,
  backgroundColor,
  backgroundColorShorthand,
  border,
  createBox,
  createRestyleComponent,
  createVariant,
  spacing,
  spacingShorthand,
} from '@shopify/restyle';
import {
  Pressable as NativePressable,
  PressableProps as NativePressableProps,
} from 'react-native';

const Pressable = createBox<Theme, NativePressableProps>(NativePressable);

export type PressableProps = React.ComponentProps<typeof Pressable>;

const RestyleButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & PressableProps,
  Theme
>(
  [
    createVariant({themeKey: 'buttonVariants'}),
    backgroundColor,
    backgroundColorShorthand,
    spacing,
    spacingShorthand,
    // @ts-ignore
    border,
  ],
  Pressable,
);

// export default Pressable;
export default RestyleButton;
