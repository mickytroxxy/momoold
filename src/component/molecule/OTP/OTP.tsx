import {Box, Text} from '@/component/atom';
import {
  otp4DigitHeight,
  otpActive,
  otpBorderRadius,
  otpDefault,
  otpError,
  otpFontFamily,
  otpFontWeight,
  otpTypeface,
} from '@/style-dictionary-dist/momoStyle';
import React, {Ref, forwardRef, useImperativeHandle} from 'react';
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import OtpInput, {OtpInputsRef} from 'react-native-otp-inputs';
import {SupportedKeyboardType} from 'react-native-otp-inputs/lib/typescript/types';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

type OtpType = TextInputProps & {
  autofillFromClipboard: boolean;
  autofillListenerIntervalMS?: number | undefined;
  keyboardType?: SupportedKeyboardType;
  style?: StyleProp<ViewStyle>;
  focusStyles?: StyleProp<ViewStyle>;
  defaultValue?: string | undefined;
  handleChange: (otpCode: string) => void;
  inputContainerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  isRTL?: boolean | undefined;
  numberOfInputs: number;
  testIDPrefix?: string | undefined;
  error?: string;
};

const Otp = forwardRef<Ref<OtpInputsRef>, OtpType>(
  (
    {numberOfInputs, handleChange, autofillFromClipboard, error, ...props},
    ref,
  ) => {
    return (
      <Box width={'100%'}>
        <OtpInput
          handleChange={handleChange}
          numberOfInputs={numberOfInputs}
          error={error}
          autofillFromClipboard
          // @ts-ignore
          ref={ref}
          style={styles.otpViewStyle}
          inputStyles={[styles.inputStyles, error ? styles.Inputerror : {}]}
          focusStyles={
            // @ts-ignore
            !error ? styles.focusStyles : {errorBorder: 'transparent'}
          }
          inputContainerStyles={[
            styles.inputContainerStyles,
            // active
            error ? styles.error : {},
          ]}
          {...props}
        />
        {error && (
          <Text mt={'vxxs'} color={'red100'}>
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

const styles = ScaledSheet.create({
  inputStyles: {
    width: moderateScale(parseInt(otp4DigitHeight)),
    height: moderateScale(parseInt(otp4DigitHeight)),
    // paddingHorizontal: 10,
    // backgroundColor: "blue",
    fontSize: parseInt(otpTypeface.fontSize),
    textAlign: 'center',
    // fontFamily: `${otpFontFamily.split(' ').join('')}-${otpFontWeight}`,
    fontFamily: `MTNBrighterSans-Bold`,
    color: otpDefault.color,
    flex: 1,
  },
  inputContainerStyles: {
    borderRadius: moderateScale(parseInt(otpBorderRadius)),
    borderWidth: moderateScale(parseInt(otpDefault.width)),
    borderColor: otpDefault.color,
    // borderColor: otpDefault.color,
  },
  otpViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  focusStyles: {
    borderColor: otpActive.color,
    borderRadius: moderateScale(parseInt(otpBorderRadius)),
  },
  error: {
    borderColor: otpError.color,
    borderWidth: moderateScale(parseInt(otpActive.width)),
  },
  Inputerror: {
    color: otpError.color,
  },
});
export default Otp;
