import {Meta, StoryObj} from '@storybook/react-native';
import React, {useEffect, useState} from 'react';
import Box from '../../atom/Box';
import ScrollView from '../../atom/ScrollView';
import Timer from './Timer';
import {Button, Text} from '@/component/atom';
import useCountdown from '@/hooks/useCountDown';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import Donut from './Donut';
import {
  AlertMessageType,
  addMessage,
  selectMessage,
} from '@/features/alert/alertSlice';
import {useTypedDispatch, useTypedSelector} from '@/store/store';
import Alert from '@molecule/Alert/Alert';
// import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import Header from '@molecule/Header/Header';
import TopHeaderContent from '@molecule/Header/TopHeaderContent';
import icon from '@/constants/icon';
import {Platform} from 'react-native';
import {getFontSizeByWindowWidth} from '@/style/theme';

const {HeaderXIcon, BackIcon} = icon;
const TimerMeta: Meta<typeof Timer> = {
  title: 'Timer',
  component: Timer,
  decorators: [
    withBackgrounds,
    Story => {
      const message = useTypedSelector(selectMessage);
      return (
        <>
          <Box flex={1}>
            {Platform.OS === 'ios' ? (
              <>
                <Header py={'vm'} mb={'vm'}>
                  <TopHeaderContent
                    right={{
                      rightComp: (
                        <HeaderXIcon
                          width={getFontSizeByWindowWidth(16)}
                          height={getFontSizeByWindowWidth(16)}
                        />
                      ),
                    }}
                    left={{
                      leftComp: (
                        <BackIcon
                          width={getFontSizeByWindowWidth(16)}
                          height={getFontSizeByWindowWidth(16)}
                          color={'white'}
                        />
                      ),
                    }}
                    title="OTP"
                  />
                </Header>
                <Story />
              </>
            ) : (
              <SafeAreaContainer>
                <Header py={'vm'} mb={'vm'}>
                  <TopHeaderContent
                    right={{
                      rightComp: (
                        <HeaderXIcon
                          width={getFontSizeByWindowWidth(16)}
                          height={getFontSizeByWindowWidth(16)}
                        />
                      ),
                    }}
                    left={{
                      leftComp: (
                        <BackIcon
                          width={getFontSizeByWindowWidth(16)}
                          height={getFontSizeByWindowWidth(16)}
                          color={'white'}
                        />
                      ),
                    }}
                    title="OTP"
                  />
                </Header>
                <Story />
              </SafeAreaContainer>
            )}
          </Box>
          {message.length !== 0 && <Alert />}
        </>
      );
    },
  ],
};

type story = StoryObj<typeof TimerMeta>;

// export const Default: story = {};

export const Timers: StoryObj<typeof TimerMeta> = {
  render: args => {
    // const DURATION = 1000;
    const DURATION = 20000;
    const dispatch = useTypedDispatch();
    // const DURATION = 16000;
    const message: AlertMessageType = {
      message: 'We could not validate the code. Please resend the code.',
      duration: 2000,
      type: 'error',
      // title: 'Title',
      close: true,
    };
    const message2: AlertMessageType = {
      message: 'Ensure the sim card for this profile is in this device',
      duration: 2000,
      type: 'info',
      // title: 'Title',
      close: true,
    };

    const {start, formattedTime, reset, time} = useCountdown({
      callback: () => {
        console.log('yetff');

        dispatch(addMessage(message));
      },
      duration: DURATION,
    });
    useEffect(() => {
      // time === DURATION && start();
      if (time === DURATION) {
        start();
        setTimeout(() => {
          dispatch(addMessage(message2));
        }, 2000);
      }
    }, []);
    const [startTimer, setstartTimer] = useState(false);

    return (
        <Box px={'hm'} alignItems={'center'}>
          <Box>
            <Text
              textAlign={'center'}
              fontSize={getFontSizeByWindowWidth(18)}
              lineHeight={getFontSizeByWindowWidth(23.4)}
              color={'momoBlue'}
              mb={'vxl'}
              px={'hm'}>
              Verification code sent to ******3678
            </Text>
          </Box>
          <Timer
            formattedTime={formattedTime}
            time={time}
            DURATION={DURATION}
            bg="white"
            size={getFontSizeByWindowWidth(110)}
            thickness={getFontSizeByWindowWidth(10)}
          />
          {time <= 300 && (
            <Box
              mt={'vs'}
              gap={'hsm'}
              flexDirection={'row'}
              alignItems={'center'}
              >
              <Text
                variant={'medium12'}
                style={{
                  color: '#525252',
                  lineHeight: getFontSizeByWindowWidth(15.6),
                  fontSize: getFontSizeByWindowWidth(12),
                }}>
                Did not receive an OTP?
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await reset();
                  dispatch(addMessage(message2));
                  start();
                }}>
                <Text
                  color={'momoBlue'}
                  style={{
                    fontFamily: 'MTNBrighterSans-Medium',
                    lineHeight: getFontSizeByWindowWidth(15.6),
                    fontSize: getFontSizeByWindowWidth(12),
                  }}>
                  Resend
                </Text>
              </TouchableOpacity>
            </Box>
          )}
          <Text
            fontSize={getFontSizeByWindowWidth(16)}
            lineHeight={getFontSizeByWindowWidth(24)}
            textAlign={'center'}
            color={'grey'}
            fontFamily="MTNBrighterSans-Regular"
            mt={'vxl'}>
            Open the SMS and click on the link to proceed
          </Text>
        </Box>
    );
  },
};

export default TimerMeta;
