import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React from 'react';
import Alert from './Alert';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Button, Text} from '../../atom';
import {useTypedDispatch, useTypedSelector} from '@/store/store';
import {
  AlertMessageType,
  addMessage,
  selectMessage,
} from '@/features/alert/alertSlice';
import AlertStory, {AlertStoryMessageType} from './AlertStory';
import alertStoryMessage from '@/utils/alertstoryMessage';
// import { Box, Text } from '@/component/atom';

const getRandomMesssages = () => {
  const number = Math.trunc(Math.random() * 1000);
  return `Random message ${number}`;
};

const AlertMeta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  args: {
    label: 'Add Label Here',
  },
  decorators: [
    withBackgrounds,
    Story => {
      const message = useTypedSelector(selectMessage);
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
              Alert
            </Text>
            <Story />
          </ScrollView>
          {message.length !== 0 && <Alert />}
        </>
      );
    },
  ],
};

// type story = StoryObj<typeof AlertMeta>;

// export const Default: story = {};

export const Action: StoryObj<typeof AlertMeta> = {
  render: args => {
    const dispatch = useTypedDispatch();

    return (
      <Box
        flexDirection={'row'}
        flexWrap={'wrap'}
        gap={'hm'}
        justifyContent={'space-around'}>
        <Button
          label="error"
          variant="primary"
          bg={'red100'}
          size="extraSmall"
          onPress={() => {
            const message = {
              message:
                'We could not validate the code. Please resend the code.',
              duration: 2000,
              type: 'error',
              // title: 'Love You',
              close: true,
            };
            dispatch(addMessage(message));
          }}
        />
        <Button
          label="success"
          variant="primary"
          bg={'green60'}
          size="extraSmall"
          onPress={() => {
            const message = {
              message:
                'Lorem ipsum dolor sit amet consectetur. Viverra dictum ve',
              duration: 2000,
              type: 'success',
              close: true,
            };
            dispatch(addMessage(message));
          }}
        />
        <Button
          label="info"
          variant="primary"
          size="extraSmall"
          onPress={() => {
            const message = {
              // message: 'lorem bsjhbhj sjbsb  house of the horror in the evil land of the shafoes ',
              message: getRandomMesssages(),
              duration: 2000,
              type: 'info',
            };
            dispatch(addMessage(message));
          }}
        />
        <Button
          label="warning"
          variant="primary"
          bg={'orange60'}
          size="extraSmall"
          onPress={() => {
            const message = {
              message:
                'Lorem ipsum dolor sit amet consectetur. Viverra dictum ve',
              duration: 2000,
              type: 'warning',
            };
            dispatch(addMessage(message));
          }}
        />
        <Button
          label="title nd close"
          variant="primary"
          bg={'orange100'}
          size="extraSmall"
          onPress={() => {
            const message = {
              message:
                'Lorem ipsum dolor sit amet consectetur. Viverra dictum ve',
              duration: 2000,
              type: 'warning',
              title: 'Title',
              close: true,
            };
            dispatch(addMessage(message));
          }}
        />
      </Box>
    );
  },
};

export const Success: StoryObj<typeof AlertMeta> = {
  render: args => {
    const {title, closeTitle, message, close} = alertStoryMessage('success');
    return (
      <Box gap={'xs'}>
        <AlertStory message={message} />
        <AlertStory message={close} />
        <AlertStory message={title} />
        <AlertStory message={closeTitle} />
      </Box>
    );
  },
};

export const Error: StoryObj<typeof AlertMeta> = {
  render: args => {
    const {title, closeTitle, message, close} = alertStoryMessage('error');
    return (
      <Box gap={'xs'}>
        <AlertStory message={message} />
        <AlertStory message={close} />
        <AlertStory message={title} />
        <AlertStory message={closeTitle} />
      </Box>
    );
  },
};

export const Warning: StoryObj<typeof AlertMeta> = {
  render: args => {
    const {title, closeTitle, message, close} = alertStoryMessage('warning');
    return (
      <Box gap={'xs'}>
        <AlertStory message={message} />
        <AlertStory message={close} />
        <AlertStory message={title} />
        <AlertStory message={closeTitle} />
      </Box>
    );
  },
};

export const Info: StoryObj<typeof AlertMeta> = {
  render: args => {
    const {title, closeTitle, message, close} = alertStoryMessage('info');
    return (
      <Box gap={'xs'}>
        <AlertStory message={message} />
        <AlertStory message={close} />
        <AlertStory message={title} />
        <AlertStory message={closeTitle} />
      </Box>
    );
  },
};

export default AlertMeta;
