import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {Ref, RefObject, useRef, useState} from 'react';
import {PixelRatio, TextInput, useWindowDimensions} from 'react-native';
import * as Progress from 'react-native-progress';

type Props = {};

import {Box, Button, SafeAreaView, Text, ScrollView} from '@atom';
import {DarkStatusBar} from '@/component/molecule/StausBar';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '@/component/molecule/Header/Header';
import TopHeaderContent from '@/component/molecule/Header/TopHeaderContent';
import Snackbar from '@molecule/Alert/Alert';
import {useTypedDispatch} from '@/store/store';
import {addMessage} from '@/features/alert/alertSlice';
import FLabelInput from '@/component/molecule/FloatingLabelInput/FLabelInput';
import TxInput from '@/component/molecule/TxInput';
import Dropdown, {
  selectRenderItemType,
} from '@/component/molecule/Dropdown/DropdownSearch';
import countryData from '@/fixtures/countryData';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import useCountdown from '@/hooks/useCountDown';
import CircularProgress from '@molecule/Timer/Timer';
import CountryDropdown, {
  countryDataType,
} from '@/component/molecule/Dropdown/CountryDropdown';
import OTPTextInput from '@/component/molecule/old/oldOtp2';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import Otp from '@/component/molecule/OTP/OTP';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import RHFInput from '../../../component/molecule/FloatingLabelInput/RHFInput';
import { profileFormType, profileSchema } from '@/utils/zod';


const getRandomMesssages = () => {
  const number = Math.trunc(Math.random() * 1000);
  return `Random message ${number}`;
};
const Profile = () => {
  const {colors, spacing} = useTheme<Theme>();
  const {height, width} = useWindowDimensions();
  const pixelRatio = PixelRatio.get();
  const gradientColors = ['#4D849C', '#004F71', '#003654'];
  const {top} = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const dispatch = useTypedDispatch();
  const [invalue, setInvalue] = useState('');
  const [selected, setSelected] = useState(countryData[0]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<profileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      'First name': '',
      'Last name': '',
      password: '',
      country: countryData[0],
    },
  });
  console.log('errors', errors);
  const onSubmit = (data: any) => console.log(data);
  const DURATION = 60000;
  const {start, formattedTime, reset, time} = useCountdown({
    callback: () => {},
    duration: DURATION,
  });
  // const otpRef: Ref<OtpInputsRef | null | undefined> = useRef(null);
  const otpRef: RefObject<OtpInputsRef> = useRef(null);

  const focusOTP = () => {
    otpRef?.current && otpRef?.current.focus();
  };

  const resetOTP = () => {
    otpRef?.current && otpRef?.current.reset();
  };

  const handleChange = (code: string) => {
    console.log('currentCodeReturned', code);
  };

  const {MomoIcon, NotifIcon} = icon;
  const renderCountryItem = ({item, onItemPress}: selectRenderItemType) => (
    <TouchableOpacity
      style={{
        // paddingHorizontal: 5,
        paddingVertical: 10,
      }}
      onPress={() => onItemPress(item)}>
      <Box
        flexDirection={'row'}
        gap={'hm'}
        justifyContent={'flex-start'}
        alignItems={'center'}>
        {<item.icon />}
        <Text style={{color: '#000'}}>{item['label']}</Text>
      </Box>
    </TouchableOpacity>
  );
  // FF0000
  return (
    <SafeAreaContainer bg={'primaryColor'}>
      <Header 
      style={{paddingVertical: moderateScale(13)}} 
      >
        <TopHeaderContent
          left={{leftComp: <NotifIcon />}}
          title="Profile"
          right={{rightComp: <MomoIcon height={35} width={30} />}}
        />
      </Header>
      <ScrollView
        flex={1}
        contentContainerStyle={{
          paddingBottom: 300,
        }}>
        <Box gap={'vm'} pt={'vxl'} px={'hl'}>
  

          <Box gap={'vm'}>
            <Box gap={'hm'} flexDirection={'row'}>
              <Button
                variant="primary"
                size="extraSmall"
                onPress={resetOTP}
                label="Reset"
              />
              <Button onPress={focusOTP} label="Focus" />
            </Box>

            <Box>
              {/* <OtpInputs
                keyboardType="phone-pad"
                handleChange={handleChange}
                autofillFromClipboard
                numberOfInputs={6}
                // ref={ref => (ref = otpRef)}
                ref={otpRef}
                inputStyles={styles.inputStyles}
                style={styles.otpViewStyle}
                inputContainerStyles={styles.inputContainerStyles}
              /> */}
            </Box>
          </Box>

         
          <Text
            style={{
              // lineHeight: 'auto'
              lineHeight: 30,
            }}>
            Testing the Token on Button
          </Text>

          {/* <TextInput /> */}

          <Box gap={'vm'}>
            <Box flexDirection={'row'} gap={'hm'}>
              <Button
                flex={1}
                variant="primary"
                label="start"
                onPress={() => start()}
              />
              <Button
                flex={1}
                variant="primary"
                label="reset"
                onPress={() => reset()}
              />
            </Box>
            <Text textAlign={'center'} variant={'headings'}>
              {formattedTime()}
            </Text>
          </Box>
          <CircularProgress
            formattedTime={formattedTime}
            time={time}
            DURATION={DURATION}
            bg="primaryColor"
            thickness={10}
            size={100}
          />
        </Box>
        <Box
          gap={'vxs'}
          px={'hxl'}
          style={{
            marginBottom: 50,
          }}></Box>

        {/* FORM */}
        <Box px={'hl'} mt={'vm'} gap={'vm'}>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Box flex={0.25}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <CountryDropdown
                    renderItem={renderCountryItem}
                    data={countryData}
                    onSelect={onChange}
                    ref={ref}
                    value={value}
                    INPUT_HEIGHT={57}
                    paddingContainer={'l'}
                    bgColor="primaryColor"
                  />
                )}
                name="country"
              />
            </Box>
            <Box flex={0.72}>
              <RHFInput
                name={'phone'}
                control={control}
                mask={'999 9999 9999'}
                maskType={'phone'}
              />
            </Box>
          </Box>
          <RHFInput name={'First name'} control={control} />
          <RHFInput name={'Last name'} control={control} />
          <RHFInput name={'password'} isPassword control={control} />

          <Box mt={'vl'} style={{marginTop: 100}}>
            <Button
              bStyle={{alignSelf: 'flex-end'}}
              onPress={handleSubmit(onSubmit)}
              label="submit"
              variant="primary"
              size="fullWidth"
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = ScaledSheet.create({
  inputStyles: {
    width: '40@ms',
    height: '40@ms',
    borderColor: '#004F71',
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'MTNBrighterSans-Bold',
  },
  inputContainerStyles: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#004F71',
  },
  otpViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  focusStyles: {
    borderRadius: 10,
  },
});

export default Profile;
