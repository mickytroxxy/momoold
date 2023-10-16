import {
  buttonExtraSmallHeight,
  buttonExtraSmallWidth,
  buttonInactive,
  buttonSmalHeight,
  buttonSmalWidth,
} from '@/style-dictionary-dist/momoStyle';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import {
  ActivityIndicator,
  RegisteredStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Pressable, {PressableProps} from '../Pressable';
import Text from '../Text';

type PressableVariants = Exclude<keyof Theme['buttonVariants'], 'defaults'>;
type TextVariants = keyof Theme['textVariants'];

type PressProps = PressableProps & {
  bStyle?: ViewStyle;
  labelStyle?: TextStyle;
  variant?: PressableVariants;
  textVariant?: TextVariants;
  label: string;
  icon?: any;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'extraSmall' | 'small' | 'medium' | 'fullWidth';
};

export default ({
  onPressIn,
  onPressOut,
  bStyle,
  variant,
  textVariant,
  label,
  width,
  icon,
  loading,
  disabled,
  onPress,
  fullWidth,
  size = 'extraSmall',
  labelStyle,
  ...rest
}: PressProps) => {
  const {colors} = useTheme<Theme>();
  let buttonSizeStyle: RegisteredStyle<ViewStyle>;
  switch (size) {
    case 'extraSmall':
      buttonSizeStyle = styles.extraSmall;
      break;
    case 'small':
      buttonSizeStyle = styles.small;
      break;
    case 'medium':
      buttonSizeStyle = styles.medium;
      break;
    case 'fullWidth':
      buttonSizeStyle = styles.fullWidth;
      break;

    default:
      break;
  }
  const buttonStyle = {
    //@ts-ignore
    ...buttonSizeStyle,
    // ...(size === 'fullWidth' ? {width: '100%'} : width ? {width} : {}),
    flexDirection: icon && 'row',
    ...bStyle,
    // justifyContent: !(icon && loading) ? 'space-between' : 'center',
    //@ts-ignore
    ...(disabled
      ? variant === 'primary'
        ? styles.primaryInActive
        : styles.secondaryInActive
      : {}),
  };
  // const theme = useTheme<Theme>();
  return (
    <Pressable
      variant={variant}
      onPress={!disabled ? onPress : () => {}}
      {...rest}
      // @ts-ignore
      style={({pressed: isPressed}) =>
        isPressed && !disabled ? [buttonStyle, styles.pressed] : [buttonStyle]
      }>
      {!loading ? (
        <>
          <Text
            variant={size}
            color={
              variant === 'primary'
                ? 'white'
                : !disabled
                ? 'momoBlue'
                : variant === 'secondary'
                ? 'lightGrey'
                : 'extraLightGrey'
            }
            style={[labelStyle]}>
            {label}
          </Text>
          {icon && (
            <Text variant={'test'} color={'red100'}>
              Icon
            </Text>
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Pressable>
  );
};

const styles = ScaledSheet.create({
  extraSmall: {
    paddingHorizontal: 14,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    minWidth: parseInt(buttonExtraSmallWidth),
    maxHeight: parseInt(buttonExtraSmallHeight),
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    minWidth: parseInt(buttonSmalWidth),
    // width: parseInt(buttonSmalWidth),
    height: parseInt(buttonSmalHeight),
  },
  medium: {
    paddingHorizontal: 36,
    paddingVertical: moderateScale(12),
    alignSelf: 'flex-start',
  },
  fullWidth: {paddingHorizontal: 24, paddingVertical: moderateScale(17)},

  secondaryInActive: {borderColor: buttonInactive},
  primaryInActive: {
    backgroundColor: buttonInactive,
  },
  pressed: {
    opacity: 0.8,
    transform: [{scale: 0.998}],
  },
});
