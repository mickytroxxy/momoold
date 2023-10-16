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
  TouchableOpacity as NativeTouchableOpacity,
  TouchableOpacityProps as NativeTouchableOpacityProps,
  TouchableWithoutFeedback as NativeTouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

const TouchableOpacity = createBox<Theme, NativeTouchableOpacityProps>(NativeTouchableOpacity);


export const TouchableWithoutFeedback = createBox<Theme, TouchableWithoutFeedbackProps>(NativeTouchableWithoutFeedback);

export type TouchableOpacityProps = React.ComponentProps<typeof TouchableOpacity>;

export default TouchableOpacity;
