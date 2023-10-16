import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ImageStyle,
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';

import {inputDefault} from '@/style-dictionary-dist/momoStyle';
import {getFontSizeByWindowWidth as gsw} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box, Icon, Text as RText, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import {FieldError} from 'react-hook-form';
import icon from 'src/constants/icon';
import {getValueWithCurrencyMask, getValueWithNonCurrencyMask} from './utils';

export interface Props extends Omit<TextInputProps, 'secureTextEntry'> {
  /** Style to the container of whole component */
  containerStyles?: ViewStyle;
  /** Changes the color for hide/show password image */
  darkTheme?: true | false;
  /** Set this to true if you want the label to be always at a set position. Commonly used with hint for displaying both label and hint for your input. Default false. */
  staticLabel?: boolean;
  /** Hint displays only when staticLabel prop is set to true. This prop is used to show a preview of the input to the user */
  hint?: string;
  /** Set the color to the hint */
  hintTextColor?: string;
  /** Value for the label, same as placeholder */
  label: string;
  /** Style to the label */
  labelStyles?: TextStyle;
  /** Set this to true if is password to have a show/hide input and secureTextEntry automatically */
  isPassword?: true | false;
  /** Callback for action submit on the keyboard */
  onSubmit?: () => void;
  /** Style to the show/hide password container */
  showPasswordContainerStyles?: ViewStyle;
  /** Style to the show/hide password image */
  showPasswordImageStyles?: ImageStyle;
  /** Style to the input */
  inputStyles?: TextStyle;
  /** Required if onFocus or onBlur is overrided */
  isFocused?: boolean;
  /** Set a mask to your input */
  mask?: string;
  /** Set mask type */
  maskType?: 'currency' | 'phone' | 'date' | 'card';
  /** Set currency thousand dividers */
  currencyDivider?: ',' | '.';
  /** Maxinum number of decimal places allowed for currency mask. */
  maxDecimalPlaces?: number;
  /** Set currency on input value */
  currency?: string;
  /** Changes the input from single line input to multiline input */
  multiline?: true | false;
  /** Maxinum number of characters allowed. Overriden by mask if present */
  maxLength?: number;
  /** Shows the remaining number of characters allowed to be typed if maxLength or mask are present */
  showCountdown?: true | false;
  /** Style to the countdown text */
  showCountdownStyles?: TextStyle;
  /** Label for the remaining number of characters allowed shown after the number */
  countdownLabel?: string;
  /** Callback for show/hide password */
  onTogglePassword?: (show: boolean) => void;
  /** Prop for force toggling show/hide password. If set to true, shows the password, and when set to false hides it. */
  togglePassword?: boolean;
  /** Add left component to your input. Usually used for displaying icon */
  leftComponent?: JSX.Element;
  /** Add right component to your input. Be aware if using the input as password this component is positioned before the show/hide component */
  rightComponent?: any;
  // rightComponent?: JSX.Element;
  /** Set custom animation duration. Default 50 ms */
  animationDuration?: number;
  /** Label Props */
  labelProps?: TextProps;
  required?: boolean;
  error?: string | FieldError;
  labelBackgroundColor?: keyof Theme['colors'];
  kurrency?: string;
  alignRight?: boolean;
  max?: string;
}

interface InputRef {
  focus(): void;
  blur(): void;
}

const FloatingLabelInput: React.ForwardRefRenderFunction<InputRef, Props> = (
  {
    label,
    labelProps,
    mask,
    isPassword,
    maxLength,
    inputStyles,
    showCountdown,
    showCountdownStyles,
    labelStyles,
    darkTheme,
    countdownLabel,
    currencyDivider,
    currency,
    maskType,
    onChangeText,
    isFocused,
    onBlur,
    onFocus,
    onTogglePassword,
    togglePassword,
    leftComponent,
    rightComponent,
    staticLabel = false,
    hint,
    hintTextColor,
    onSubmit,
    containerStyles,
    showPasswordContainerStyles,
    maxDecimalPlaces,
    multiline,
    showPasswordImageStyles,
    value = '',
    animationDuration,
    required,
    labelBackgroundColor,
    error,
    kurrency,
    alignRight,
    keyboardType = 'default',
    max,
    ...rest
  }: Props,
  ref: any,
) => {
  const [halfTop, setHalfTop] = useState(0);
  const [isFocusedState, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const inputRef = useRef<any>(null);
  const {colors} = useTheme<Theme>();
  const {EyeIcon, EyeslashIcon} = icon;
  // if (kurrency) {
  //   keyboardType = 'number-pad';
  // }

  function renderCurrency({kurrency}: {kurrency: string}) {
    return (
      <Box alignSelf={'center'}>
        <Text
          style={{
            fontSize: gsw(16),
            color: error
              ? colors.red100
              : isFocusedState
              ? colors.momoBlue
              : '#000',
          }}
          fontFamily="MTNBrighterSans-Medium">
          {kurrency}
        </Text>
      </Box>
    );
  }

  if (kurrency) {
    alignRight
      ? (leftComponent = renderCurrency({kurrency}))
      : (rightComponent = renderCurrency({kurrency}));
  }

  useEffect(() => {
    if (togglePassword !== undefined) {
      _toggleVisibility(togglePassword);
    }
  }, [togglePassword]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    blur() {
      inputRef.current.blur();
    },
  }));

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    // if (value === '') {
    setIsFocused(false);
    // }
  }

  function setFocus() {
    inputRef.current?.focus();
  }

  function setBlur() {
    inputRef.current?.blur();
  }

  function _toggleVisibility(toggle?: boolean) {
    if (toggle === undefined) {
      if (onTogglePassword) {
        onTogglePassword(!secureText);
      }
      setSecureText(!secureText);
      secureText ? setFocus() : setBlur();
    } else {
      if (!((secureText && !toggle) || (!secureText && toggle))) {
        if (onTogglePassword) {
          onTogglePassword(!toggle);
        }
        setSecureText(!toggle);
        toggle ? setFocus() : setBlur();
      }
    }
  }

  function onSubmitEditing() {
    if (onSubmit !== undefined) {
      onSubmit();
    }
  }

  const style: TextStyle = StyleSheet.flatten([
    labelStyles,
    {
      // alignSelf: 'center',
      position: 'absolute',
      flex: 1,
      fontFamily: 'MTNBrighterSans-Regular',
      zIndex: 999,
    },
  ]);

  let input: TextStyle =
    inputStyles !== undefined
      ? inputStyles
      : {
          ...(styles.input as {}),
          color: error ? colors.red100 : inputDefault.color,
          zIndex: style?.zIndex !== undefined ? style.zIndex - 2 : 0,
          flex: 1,
        };

  input = StyleSheet.flatten([input]);

  containerStyles = StyleSheet.flatten([
    {
      ...(styles.container as {}),
      borderWidth: 1,
      // borderColor: isFocusedState ? colors.momoBlue : '#000',
      borderColor: error
        ? colors.red100
        : isFocusedState
        ? colors.momoBlue
        : 'grey',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      zIndex: style?.zIndex !== undefined ? style.zIndex - 6 : 0,
    },
  ]);

  let toggleButton =
    showPasswordContainerStyles !== undefined
      ? showPasswordContainerStyles
      : styles.toggleButton;

  toggleButton = StyleSheet.flatten([
    toggleButton as {},
    {
      alignSelf: 'center',
    },
  ]);

  const countdown = StyleSheet.flatten([
    styles.countdown,
    showCountdownStyles as {},
  ]);

  function onChangeTextCallback(val: string): void | undefined {
    if (onChangeText === undefined) return undefined;

    if (maskType === undefined && mask === undefined) return onChangeText(val);

    let newValue: string | undefined;
    if (maskType !== 'currency' && mask !== undefined) {
      newValue = getValueWithNonCurrencyMask({value: val, mask});
    }

    if (maskType === 'currency') {
      if (
        currency !== undefined &&
        !/^[0-9]+$/g.test(val.replace(/[.,]/g, '').replace(currency, '')) &&
        val.replace(/[.,]/g, '').replace(currency, '') !== ''
      ) {
        return undefined;
      } else if (
        currency === undefined &&
        !/^[0-9]+$/g.test(val.replace(/[.,]/g, '')) &&
        val.replace(/[.,]/g, '') !== ''
      ) {
        return undefined;
      }

      newValue = getValueWithCurrencyMask({
        value: currency !== undefined ? value.replace(currency, '') : value,
        newValue: currency !== undefined ? val.replace(currency, '') : val,
        currencyDivider,
        maxDecimalPlaces,
      });
    }

    if (newValue !== undefined) {
      return onChangeText((currency !== undefined ? currency : '') + newValue);
    }
  }

  function onLayout(event: LayoutChangeEvent) {
    const {height} = event.nativeEvent.layout;
    setHalfTop(height / 2);
  }

  return (
    <Box gap={'xxs'}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={setFocus}
        onLayout={onLayout}>
        <View style={{flexDirection: 'row', flexGrow: 1}}>
          <View style={containerStyles}>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: error
                  ? colors.red100
                  : isFocusedState
                  ? colors.momoBlue
                  : 'transparent',
                // borderWidth: 1,
                flexDirection: 'row',
                borderRadius: gsw(14),
                paddingHorizontal: 16,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {/* @ts-ignore */}
                <View
                  style={[
                    style,
                    {
                      paddingHorizontal: 4,
                      paddingVertical: 1,
                      position: 'absolute',
                      top: isFocusedState || value !== '' ? -11 : '25%',
                      // top: isFocusedState || value !== '' ? -11 : 18,
                      backgroundColor: '#fff',
                      // backgroundColor: 'red',
                    },
                    !kurrency && {left: -4},
                    kurrency &&
                      alignRight &&
                      !isFocusedState &&
                      value === '' && {
                        right: '1%',
                        // backgroundColor: 'red',
                        paddingHorizontal: 0,
                        alignSelf: 'center',
                      },
                    leftComponent && {
                      left: '8%',
                    },
                    leftComponent && isFocusedState && {
                      left:'0%',
                    },
                    kurrency &&
                      alignRight &&
                      (isFocusedState || value !== '') && {
                        left: -4,
                      },
                    kurrency &&
                      !alignRight && {
                        left: -4,
                      },
                  ]}>
                  <Text
                    {...labelProps}
                    onPress={setFocus}
                    style={[
                      {
                        fontFamily: 'MTNBrighterSans-Regular',
                        fontSize:
                          isFocusedState || value !== '' ? gsw(12) : gsw(12),
                        color: error
                          ? colors.red100
                          : isFocusedState
                          ? colors.momoBlue
                          : 'grey',
                      },
                    ]}>
                    {label}
                    {required && ' *'}
                  </Text>
                </View>
                {leftComponent && <Box alignSelf={'center'}>{leftComponent}</Box>}

                <TextInput
                  value={value}
                  onSubmitEditing={onSubmitEditing}
                  secureTextEntry={
                    isPassword !== undefined ? isPassword && secureText : false
                  }
                  onFocus={onFocus !== undefined ? onFocus : handleFocus}
                  onBlur={onBlur !== undefined ? onBlur : handleBlur}
                  selectionColor={colors.momoBlue}
                  ref={inputRef}
                  textAlign={alignRight ? 'right' : 'left'}
                  {...rest}
                  maxLength={
                    mask !== undefined
                      ? mask.length
                      : maxLength !== undefined
                      ? maxLength
                      : undefined
                  }
                  placeholderTextColor={hintTextColor}
                  placeholder={
                    (staticLabel || isFocusedState) && hint ? hint : ''
                  }
                  multiline={multiline}
                  onChangeText={onChangeTextCallback}
                  style={input}
                  keyboardType={keyboardType}
                />
                <Box style={toggleButton} alignSelf={'center'}>
                  {rightComponent && !kurrency && (
                    <Icon
                      name={rightComponent}
                      color={
                        error
                          ? colors.red100
                          : isFocusedState
                          ? colors.momoBlue
                          : colors.grey
                      }
                      size={24}
                    />
                  )}
                  {rightComponent && kurrency && rightComponent}
                </Box>
                {isPassword && (
                  <TouchableOpacity
                    style={toggleButton}
                    onPress={() => _toggleVisibility()}>
                    {secureText ? (
                      <EyeIcon
                        stroke={
                          error
                            ? colors.red100
                            : isFocusedState
                            ? colors.momoBlue
                            : colors.grey
                        }
                      />
                    ) : (
                      <EyeslashIcon
                        stroke={
                          error
                            ? colors.red100
                            : isFocusedState
                            ? colors.momoBlue
                            : colors.grey
                        }
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              {showCountdown && maxLength && (
                <Text style={countdown}>
                  {maxLength - (value ? value.length : 0)} {countdownLabel}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {!kurrency && error && (
        <RText
          style={{
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: gsw(12),
          }}
          color={'red100'}
          ml={'hs'}>
          {error.toString()}
        </RText>
      )}
      {kurrency &&
        (error ? (
          <Text
            color={'red100'}
            style={{
              paddingRight: 16,
              fontFamily: 'MTNBrighterSans-Regular',
              fontSize: gsw(12),
            }}
            textAlign={'right'}>
            {error.toString()}
          </Text>
        ) : (
          // Available Balance
          <Text
            style={{
              paddingRight: 16,
              fontFamily: 'MTNBrighterSans-Regular',
              fontSize: gsw(12),
            }}
            textAlign={'right'}
            color={isFocusedState ? 'momoBlue' : 'grey'}>
            {`Available balance: ${kurrency} ${max}`}
          </Text>
        ))}
    </Box>
  );
};
export default forwardRef(FloatingLabelInput);
