import {View} from 'react-native';
import React from 'react';
import icon from '@/constants/icon';
import {Box, Text} from '@/component/atom';
import {AlertMessageType} from '@/features/alert/alertSlice';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  alertError,
  alertInfo,
  alertSuccess,
  alertWarning,
} from '@/style-dictionary-dist/momoStyle';
export type AlertStoryMessageType = Omit<
  AlertMessageType,
  'zIndex' | 'duration'
>;

type alertType = {message: AlertStoryMessageType};
const Alert = ({message}: alertType) => {
  const {WarningIcon, InfoIcon, XIcon, SuccessIcon} = icon;
  const {type, title, close} = message;
  let alertColor = alertSuccess;
  switch (type) {
    case 'error':
      alertColor = alertError;
      break;
    case 'warning':
      alertColor = alertWarning;
      break;
    case 'info':
      alertColor = alertInfo;
      break;
    case 'success':
      alertColor = alertSuccess;
      break;

    default:
      break;
  }
  function renderIcon() {
    return (
      <Box>
        {type === 'error' || type === 'warning' ? (
          <WarningIcon />
        ) : type === 'success' ? (
          <SuccessIcon />
        ) : (
          <InfoIcon />
        )}
      </Box>
    );
  }

  function renderMessage() {
    return (
      <Box
        flex={0.85}
        // bg={'green'}
        style={{
          marginTop: -2,
        }}>
        {title && (
          <Text mb={'vxxs'} color={'white'}>
            {title}
          </Text>
        )}
        <Text fontSize={12} numberOfLines={2} color={'white'}>
          {message.message}
        </Text>
      </Box>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: alertColor,
          alignItems: title ? 'flex-start' : 'center',
        },
      ]}>
      <Box
        style={{
          alignItems: title ? 'flex-start' : 'center',
        }}
        flexDirection={'row'}
        gap={'hs'}>
        {renderIcon()}
        {renderMessage()}
      </Box>
      {close && (
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            // height: '100%',
            width: '12%',
            justifyContent: title ? 'flex-start' : 'center',
            paddingLeft: 5,
            // paddingBottom: 20,
            alignSelf: 'stretch',
          }}
          onPress={() => {}}>
          <XIcon width={18} height={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Alert;

const styles = ScaledSheet.create({
  safeArea: {
    backgroundColor: 'orange',
  },
  container: {
    padding: 13,
    paddingRight: 18,
    margin: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    // height: 200
  },
  title: {color: 'white', fontWeight: 'bold'},
  description: {color: 'white'},
});
