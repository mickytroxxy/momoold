import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import Otp from './OTP';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Button, Text} from '../../atom';
import {Controller, useForm} from 'react-hook-form';
import {storyBookOtpType, storyOtpSchema} from '@/utils/zod/storyBook';
import {zodResolver} from '@hookform/resolvers/zod';
import {OtpInputsRef} from 'react-native-otp-inputs';

const OTPMeta: Meta<typeof Otp> = {
  title: 'Fields/OTP',
  component: Otp,
  args: {
    // label: 'Add Label Here',
  },
  decorators: [
    withBackgrounds,
    Story => {
      return (
        <>
          <ScrollView
            py={'vm'}
            flex={1}
            contentContainerStyle={{
              paddingBottom: 100,
              justifyContent: 'center',
              flexGrow: 1,
            }}
            px={'hm'}>
            <Text
              textAlign={'center'}
              variant={'header'}
              mb={'vxl'}
              textDecorationLine={'underline'}>
              OTP Input
            </Text>
            <Story />
          </ScrollView>
        </>
      );
    },
  ],
};

type story = StoryObj<typeof OTPMeta>;

// export const Default: story = {};

export const FourDigits: StoryObj<typeof OTPMeta> = {
  render: args => {
    const [error, setError] = useState('');
    const otpRef: RefObject<OtpInputsRef> = useRef(null);

    console.log('error', error);
    const resetOTP = () => {
      otpRef?.current && otpRef?.current.reset();
    };
    const handleChange = async (code: string) => {
      if (code.length === 1) {
        setTimeout(() => {
          setError('');
        }, 0);
        return
      }
      console.log('code', code);
      if (code.length === 4) {
        if (code !== '1234') {
          setTimeout(() => {
            setError('Incorrect OTP entered');
          }, 1000);
          return
        }
        setTimeout(() => {
          resetOTP();
          setError('');
        }, 1000);
      }
    };
    const handleChange1 = () => {};
    useEffect(() => {
      error && resetOTP();
    }, [error]);

    return (
      <Box gap={'vxl'}>
        <Box alignSelf={'center'} width={'65%'}>
          <Otp
            autofillFromClipboard
            handleChange={handleChange1}
            numberOfInputs={4}
            autoFocus
          />
        </Box>
        <Box alignSelf={'center'} width={'65%'}>
          <Text color={'grey'} mb={'vxs'}>
            OTP must equal 1234
          </Text>
          <Otp
            autofillFromClipboard
            handleChange={handleChange}
            // @ts-ignore
            ref={otpRef}
            numberOfInputs={4}
            autoFocus
            error={error}
            // error={'error'}
          />
        </Box>
      </Box>
    );
  },
};

export const SixDigits: StoryObj<typeof OTPMeta> = {
  render: args => {
    const [error, setError] = useState('');
    const otpRef: RefObject<OtpInputsRef> = useRef(null);

    console.log('error', error);
    const resetOTP = () => {
      otpRef?.current && otpRef?.current.reset();
    };
    const handleChange = async (code: string) => {
      if (code.length === 1) {
        setTimeout(() => {
          setError('');
        }, 0);
      }
      console.log('code', code);
      if (code.length === 6) {
        if (code !== '123456') {
          setTimeout(() => {
            setError('Incorrect OTP entered');
          }, 1000);
          return;
        }
        setTimeout(() => {
          resetOTP();
          setError('');
        }, 1000);
      }
    };
    useEffect(() => {
      error && resetOTP();
    }, [error]);
    const handleChange1 = () => {};

    return (
      <Box gap={'vxl'}>
        <Box alignSelf={'center'} width={'95%'}>
          <Otp
            autofillFromClipboard
            handleChange={handleChange1}
            numberOfInputs={6}
            autoFocus
          />
        </Box>
        <Box alignSelf={'center'} width={'95%'}>
          <Text color={'grey'} mb={'vxs'}>
            OTP must equal 123456
          </Text>
          <Otp
            autofillFromClipboard
            handleChange={handleChange}
            // @ts-ignore
            ref={otpRef}
            numberOfInputs={6}
            autoFocus
            error={error}
            // error={'error'}
          />
        </Box>
      </Box>
    );
  },
};

export default OTPMeta;
