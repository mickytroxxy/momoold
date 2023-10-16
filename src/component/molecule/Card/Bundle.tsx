import React from 'react';
import {Box, Text} from '@atom';
import Card from './Card';
import Pills from '@molecule/Pills/Pills';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import {StyleProp, TextStyle} from 'react-native';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import TouchableOpacity from '@/component/atom/TouchableOpacity';

type BundleProps = {
  type: string;
  validity: string;
  specialOffer?: boolean;
  amount: string;
  durationType?: string;
  typeTextStyle?: StyleProp<TextStyle>;
  onPress?:() => void;
};

const Bundle = ({
  type,
  validity,
  specialOffer,
  amount,
  durationType,
  typeTextStyle,
  onPress
}: BundleProps) => {
  const {colors, spacing} = useTheme<Theme>();
  return (
    <Card
      style={{
        borderRadius: getFontSizeByWindowWidth(9),
      }}>
      <TouchableOpacity onPress={onPress ? onPress : () => {}} activeOpacity={0.8}>
        <Box
          flex={1}
          px={'hsm'}
          flexDirection={'row'}
          gap={'hxxs'}
          justifyContent={'space-between'}>
          <Box
            flex={1}
            style={{
              paddingVertical: getFontSizeByWindowHeight(13),
            }}>
            <Box>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  {
                    fontSize: getFontSizeByWindowWidth(14),
                    lineHeight: getFontSizeByWindowWidth(18.2),
                    fontFamily: 'MTNBrighterSans-Medium',
                    color: colors.black,
                    flexGrow: 1,
                  },
                  typeTextStyle,
                ]}>
                {type}
              </Text>
            </Box>
            <Text
              style={{
                fontSize: getFontSizeByWindowWidth(12),
                lineHeight: getFontSizeByWindowWidth(15.6),
                color: '#888888',
              }}>{`Valid for ${validity} Day${
              parseInt(validity) > 1 ? 's' : ''
            }`}</Text>
          </Box>
          <Box
            style={{
              paddingVertical: getFontSizeByWindowHeight(13),
              gap: getFontSizeByWindowHeight(1),
            }}>
            {durationType && (
              <Pills label={durationType} pillType="bundles" size="medium" />
            )}
            <Text
              style={{
                fontSize: getFontSizeByWindowWidth(18),
                lineHeight: getFontSizeByWindowWidth(23.4),
                color: colors.momoBlue,
                letterSpacing: -0.5,
              }}>
              {amount[0]}
              <Text
                style={{
                  fontSize: getFontSizeByWindowWidth(18),
                  lineHeight: getFontSizeByWindowWidth(23.4),
                  color: colors.momoBlue,
                }}
                fontFamily={'MTNBrighterSans-ExtraBold'}>
                {amount.slice(1)}
              </Text>
            </Text>
          </Box>
        </Box>
        {specialOffer && (
          <Box
            style={{
              paddingVertical: getFontSizeByWindowHeight(3),
              backgroundColor: colors.momoBlue,
              borderBottomRightRadius: getFontSizeByWindowWidth(9),
              borderBottomLeftRadius: getFontSizeByWindowWidth(9),
            }}>
            <Text
              style={{
                fontSize: getFontSizeByWindowWidth(10),
                lineHeight: getFontSizeByWindowWidth(13),
                color: 'white',
              }}
              textAlign={'center'}>
              Special offer
            </Text>
          </Box>
        )}
      </TouchableOpacity>
    </Card>
  );
};

export default Bundle;
