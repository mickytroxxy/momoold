import TouchableOpacity from '@/component/atom/TouchableOpacity';
import countryData from '@/fixtures/countryData';
import {locationData, techStack} from '@/fixtures/dummyData';
import {getFontSizeByWindowWidth} from '@/style/theme';
import {
  storyBookCalendarType,
  storyBookOtpType,
  storyCalendarSchema,
  storyOtpSchema,
} from '@/utils/zod/storyBook';
import {zodResolver} from '@hookform/resolvers/zod';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, KeyboardAvoidingView, PanResponder} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Box, Button, Text} from '../../atom';
import ScrollView from '../../atom/ScrollView';
import FLabelInput from '../FloatingLabelInput/FLabelInput';
import CountryDropdown from './CountryDropdown';
import DropdownSearch, {
  DropdownRef,
  selectRenderItemType,
} from './DropdownSearch';

export const renderItem = ({item, onItemPress, selected}: selectRenderItemType) => {
  console.log(item)
  return (
    <TouchableOpacity
      bg={item.label === selected ? 'extraLightGrey' : 'transparent'}
      height={getFontSizeByWindowWidth(36)}
      justifyContent={'center'}
      px={'hs'}
      testID="tes"
      zIndex={200}
      onPress={() => onItemPress(item)}>
      <Text fontFamily="MTNBrighterSans-Regular" fontSize={getFontSizeByWindowWidth(10)} color={'grey'}> {item['header']}</Text>
      <Text fontFamily="MTNBrighterSans-Bold" fontSize={getFontSizeByWindowWidth(14)} color={'black'}> {item['label']}</Text>
    </TouchableOpacity>
  );
};

const renderLocationItem = ({
  item,
  onItemPress,
  selected,
}: selectRenderItemType) => (
  <TouchableOpacity
    bg={item.label === selected ? 'extraLightGrey' : 'transparent'}
    // height={moderateScale(34)}
    justifyContent={'center'}
    px={'hs'}
    height={getFontSizeByWindowWidth(50)}
    testID="tes"
    zIndex={200}
    style={{
      paddingVertical: 5,
    }}
    onPress={() => onItemPress(item)}>
    <Text
      fontFamily="MTNBrighterSans-Regular"
      fontSize={getFontSizeByWindowWidth(16)}
      lineHeight={getFontSizeByWindowWidth(24)}
      color={'black'}>
      {item['label']}
    </Text>
    <Text
      fontSize={getFontSizeByWindowWidth(12)}
      lineHeight={getFontSizeByWindowWidth(15.6)}
      color={'grey'}>
      {item['value']}
    </Text>
  </TouchableOpacity>
);

const renderCountryItem = ({
  item,
  onItemPress,
  selected,
}: selectRenderItemType) => {
  // console.log('selected', selected);
  // console.log('item', item);
  return (
    <TouchableOpacity
      bg={item.label === selected ? 'extraLightGrey' : 'transparent'}
      height={moderateScale(34)}
      justifyContent={'center'}
      px={'hs'}
      onPress={() => onItemPress(item)}>
      <Box
        flexDirection={'row'}
        gap={'hm'}
        justifyContent={'flex-start'}
        alignItems={'center'}>
        {<item.icon />}
        <Text
          fontFamily="MTNBrighterSans-Regular"
          fontSize={16}
          style={{color: '#000'}}>
          {item['label']}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const DropdownMeta: Meta<typeof DropdownSearch> = {
  title: 'Fields/Dropdown',
  component: DropdownSearch,
  decorators: [
    withBackgrounds,
    Story => (
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <ScrollView
          py={'vm'}
          // keyboardDismissMode="interactive"
          flex={1}
          keyboardShouldPersistTaps="handled"
          // keyboardShouldPersistTaps='always'
          contentContainerStyle={{
            paddingBottom: 100,
            justifyContent: 'center',
            flexGrow: 1,
          }}
          // px={'hm'}
          px={'hs'}>
          <Text
            textAlign={'center'}
            variant={'header'}
            mb={'vxl'}
            textDecorationLine={'underline'}>
            Dropdown
          </Text>
          <Story />
        </ScrollView>
      </KeyboardAvoidingView>
    ),
  ],
};

export const Dropdown: StoryObj<typeof DropdownMeta> = {
  render: args => {
    const {
      control,
      handleSubmit,
    } = useForm<storyBookOtpType>({
      resolver: zodResolver(storyOtpSchema),
      defaultValues: {
        test1: undefined,
      },
    });
    const onSubmit = (data: any) => console.log(data);
    const dropRef = useRef<DropdownRef>(null);

    return (
      <Box>
        <Box gap={'vxs'} alignItems={'center'}>
          {/* <Box  ref={ref}  gap={'xs'} alignItems={'center'}> */}
          <Text color={'sunshineYellow'} variant={'headings'}>
            Dropdown
          </Text>
          <Box flex={1} width={'100%'}>
            <Controller
              control={control}
              render={({
                field: {onChange, value},
                // field: {onChange, onBlur, value, ref},
                fieldState: {error},
              }) => (
                <DropdownSearch
                  renderItem={renderItem}
                  data={techStack}
                  // onSelect={() => onChange}
                  paddingContainer="hm"
                  testId={'tes'}
                  onSelect={onChange}
                  ref={dropRef}
                  value={value}
                  hasError={error}
                  label="Subject"
                />
              )}
              name={'test1'}
            />
          </Box>
          <Box mt={'vxl'} zIndex={-1}>
            <Button
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              label="submit"
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Search: StoryObj<typeof DropdownMeta> = {
  render: args => {
    const {control, handleSubmit, clearErrors} = useForm<storyBookOtpType>({
      resolver: zodResolver(storyOtpSchema),
      defaultValues: {
        test1: undefined,
      },
    });

    const clearError = useCallback(() => {
      clearErrors('test1');
    }, []);
    const onSubmit = (data: any) => {
      console.log(data);
      Keyboard.dismiss();
    };
    return (
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <Box>
          <Box gap={'vxs'} alignItems={'center'}>
            <Box zIndex={-1} gap={'vxs'} alignItems={'center'}>
              <Text color={'sunshineYellow'} variant={'headings'}>
                Search
              </Text>
              <Controller
                control={control}
                render={({
                  field: {onChange, onBlur, value, ref},
                  fieldState: {error},
                }) => (
                  <DropdownSearch
                    renderItem={renderItem}
                    data={techStack}
                    paddingContainer="hxxs"
                    testId={'tes'}
                    onSelect={onChange}
                    ref={ref}
                    value={value}
                    hasError={error}
                    label="Subject"
                    clearError={clearError}
                    search
                  />
                )}
                name={'test1'}
              />
              <Box mt={'vxl'} zIndex={-1}>
                <Button
                  onPress={handleSubmit(onSubmit)}
                  variant="primary"
                  label="submit"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    );
  },
};

export const Location: StoryObj<typeof DropdownMeta> = {
  render: args => {
    const {
      control,
      handleSubmit,
      formState: {errors},
      clearErrors,
    } = useForm<storyBookOtpType>({
      resolver: zodResolver(storyOtpSchema),
      defaultValues: {
        test1: undefined,
      },
    });
    // const clearError = () => {
    //   clearErrors('test1')
    // }
    const clearError = useCallback(() => {
      clearErrors('test1');
    }, []);

    const onSubmit = (data: any) => {
      Keyboard.dismiss();
      console.log(data);
    };
    return (
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <Box>
          <Box gap={'vxs'} alignItems={'center'}>
            <Box zIndex={-1} gap={'vxs'} alignItems={'center'}>
              <Text color={'sunshineYellow'} variant={'headings'}>
                Search
              </Text>
              <Controller
                control={control}
                render={({
                  field: {onChange, ref, value},
                  fieldState: {error},
                }) => {
                  console.log('ref', ref);
                  return (
                    <DropdownSearch
                      renderItem={renderLocationItem}
                      data={locationData}
                      label="Search banks"
                      // onSelect={() => onChange}
                      paddingContainer="hm"
                      testId={'tes'}
                      onSelect={onChange}
                      ref={ref}
                      value={value}
                      hasError={error}
                      search
                      location
                      clearError={clearError}
                      // clear
                    />
                  );
                }}
                name={'test1'}
              />
              <Box mt={'vxl'} zIndex={-1}>
                <Button
                  onPress={handleSubmit(onSubmit)}
                  variant="primary"
                  label="submit"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    );
  },
};

export const CountrySelector: StoryObj<typeof DropdownMeta> = {
  render: args => {
    const [invalue, setInvalue] = useState('');
    const [selected, setSelected] = useState(countryData[0]);
    return (
      <Box>
        <Box gap={'vm'} alignItems={'center'}>
          <Text
            textDecorationLine={'underline'}
            color={'black'}
            variant={'headings'}>
            Dropdown - Select Country
          </Text>
          <Box
            gap={'hxs'}
            flexDirection={'row'}
            justifyContent={'space-between'}>
            <Box flex={0.25}>
              <CountryDropdown
                renderItem={renderCountryItem}
                data={countryData}
                onSelect={setSelected}
                value={selected}
                placeHolder="S"
                INPUT_HEIGHT={57}
                paddingContainer={'hm'}
              />
            </Box>
            <Box flex={0.75}>
              <FLabelInput
                labelBackgroundColor="white"
                label="Phone Number"
                value={invalue}
                onChangeText={setInvalue}
                animationDuration={5}
                required
                mask="9999 999 9999"
                maskType="phone"
                keyboardType="phone-pad"
              />
            </Box>
          </Box>
        </Box>

        <Box mt={'vxl'} gap={'vm'} alignItems={'center'}>
          <Text
            textAlign={'center'}
            color={'black'}
            variant={'headings'}
            textDecorationLine={'underline'}>
            Dropdown - Select Country (Without Number)
          </Text>
          <Box
            gap={'hxs'}
            flexDirection={'row'}
            justifyContent={'space-between'}>
            <Box flex={0.25} alignSelf={'flex-start'}>
              <CountryDropdown
                renderItem={renderCountryItem}
                data={countryData}
                onSelect={setSelected}
                value={selected}
                placeHolder="S"
                INPUT_HEIGHT={57}
                paddingContainer={'hm'}
              />
            </Box>
            <Box flex={0.75} />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Calendar: StoryObj<typeof DropdownMeta> = {
  render: args => {
    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm<storyBookCalendarType>({
      resolver: zodResolver(storyCalendarSchema),
      defaultValues: {
        from: undefined,
      },
    });
    const onSubmit = (data: any) => console.log(data);
    return (
      <Box>
        <Box gap={'vxs'} alignItems={'center'}>
          <Box zIndex={-1} gap={'vxs'} alignItems={'center'}>
            <Text color={'sunshineYellow'} variant={'headings'}>
              Calendar
            </Text>
            {/* <DropdownSearch
              //@ts-ignore
              onSelect={setSelected}
              value={selected}
              calendar
              label={'From date'}
            /> */}
            <Controller
              control={control}
              render={({
                field: {onChange, onBlur, value, ref},
                fieldState: {error},
              }) => (
                //@ts-ignore
                <DropdownSearch
                  //@ts-ignore
                  onSelect={onChange}
                  value={value}
                  calendar
                  label={'From date'}
                />
              )}
              name={'from'}
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

export default DropdownMeta;
