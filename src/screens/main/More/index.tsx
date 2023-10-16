import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

type Props = {};

import {Box, ScrollView, Text} from '@/component/atom';
import {DarkStatusBar} from '@/component/molecule/StausBar';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useDimension from '@/hooks/useDimension';
import {onBoardingImage} from '@/constants/images';
import Card from '@molecule/Card/Card';
import TouchableOpacity from '@/component/atom/TouchableOpacity';

const More = () => {
  const {height, width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const {MomoIcon, NotifIcon, HeaderBackground, } = icon;
  const {Headies, Heady} = onBoardingImage;
  const {colors, spacing} = useTheme<Theme>();
  const {EyeIcon, EyeslashIcon, TvIcon} = icon;
  const [showBalance, setshowBalance] = useState(false);
  const toggleBalance = () => {
    setshowBalance(v => !v);
  };
  // const {width} = useDimension()
  return (
    <SafeAreaContainer bg={'primaryColor'}>
      {/* <HeaderBackground width={"100%"} /> */}
      {/* <HeaderBackground width={width} /> */}
      {/* <Headies width={"100%"}  height={"100%"}  /> */}
      {/* <Box bg={'white'} flex={0.48}>
        <ImageBackground
          source={Heady}
          style={{
            width: '100%',
            height: '100%',
            
          }}>
          <Text>nddjndj</Text>
        </ImageBackground>
      </Box>
      <Box flex={0.515} bg={'white'}>
        <Text>ekbkdnjk</Text>
      </Box> */}
      {/* <Box px={'hl'} flex={1} pt={'vxl'} bg={'white'}> */}
      <ScrollView
        bg={'extraLightGrey'}
        flex={1}
        pb={'vxl'}
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
          <Text
          // color={alertWarning}
          fontSize={20}
          // style={{
          //   fontSize: 20,
          //   color: alertWarning
          // }}

          ></Text>
        <Box px={'hs'} flex={1} pt={'vxl'} gap={'vxl'} bg={'extraLightGrey'}>
          <Card
            variant={'shadow'}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}>
            <Box borderRadius={10} overflow={'hidden'}>
              {/* TOP */}
              <Box
                style={{
                  // flex: 0.54,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontFamily: 'MTNBrighterSans-Regular',
                    color: colors.momoBlue,
                    lineHeight: moderateScale(15.6),
                  }}>
                  097 123 4567
                </Text>
                <Box
                  flexDirection={'row'}
                  style={{paddingHorizontal: 13}}
                  justifyContent={'space-between'}>
                  <Box flex={1} />
                  <Text
                    style={{
                      fontSize: moderateScale(20),
                      fontFamily: 'MTNBrighterSans-Medium',
                      color: colors.momoBlue,
                    }}>
                    {showBalance ? 'FCFA ************' : 'FCFA 150 000 000 000'}
                  </Text>
                  <TouchableOpacity
                    flex={1}
                    alignItems={'flex-end'}
                    onPress={toggleBalance}>
                    {showBalance ? (
                      <EyeIcon
                        stroke={colors.momoBlue}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <EyeslashIcon
                        stroke={colors.momoBlue}
                        width={24}
                        height={24}
                      />
                    )}
                  </TouchableOpacity>
                </Box>
              </Box>
              <Box
                bg={'extraLightGrey'}
                height={StyleSheet.hairlineWidth}
                // height={0.5}
              />
              {/* BOTTOM */}
              <Box
                style={{
                  // flex: 0.45,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                }}>
                <Box
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(9),
                      fontFamily: 'MTNBrighterSans-Regular',
                      color: colors.momoBlue,
                      lineHeight: 11.7,
                    }}>
                    Action 1
                  </Text>
                </Box>
                <Box
                  bg={'sunshineYellow'}
                  alignSelf={'stretch'}
                  width={0.5}
                  style={{
                    marginVertical: 2
                  }}
                  // width={StyleSheet.hairlineWidth}
                />
                <Box
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(9),
                      fontFamily: 'MTNBrighterSans-Regular',
                      color: colors.momoBlue,
                      lineHeight: 11.7,
                    }}>
                    Action 2
                  </Text>
                </Box>
              </Box>
            </Box>
          </Card>

          <Card
            variant={'shadow'}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}>
            <Box style={styles.cardContainer}>
              {/* TOP */}
              <Box
                style={{
                  // flex: 0.54,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontFamily: 'MTNBrighterSans-Regular',
                    color: colors.momoBlue,
                    lineHeight: moderateScale(15.6),
                  }}>
                  097 123 4567
                </Text>
                <Box
                  flexDirection={'row'}
                  style={{paddingHorizontal: 13}}
                  justifyContent={'space-between'}>
                  <Box flex={1} />
                  <Text
                    style={{
                      fontSize: moderateScale(20),
                      fontFamily: 'MTNBrighterSans-Medium',
                      color: colors.momoBlue,
                    }}>
                    {showBalance ? 'FCFA ************' : 'FCFA 150 000 000 000'}
                  </Text>
                  <TouchableOpacity
                    flex={1}
                    alignItems={'flex-end'}
                    onPress={toggleBalance}>
                    {showBalance ? (
                      <EyeIcon
                        stroke={colors.momoBlue}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <EyeslashIcon
                        stroke={colors.momoBlue}
                        width={24}
                        height={24}
                      />
                    )}
                  </TouchableOpacity>
                </Box>
              </Box>
              <Box
                bg={'extraLightGrey'}
                height={StyleSheet.hairlineWidth}
                // height={0.5}
              />
              {/* BOTTOM */}
              <Box
                style={{
                  // flex: 0.45,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                }}>
                <Box
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(9),
                      fontFamily: 'MTNBrighterSans-Regular',
                      color: colors.momoBlue,
                      lineHeight: 11.7,
                    }}>
                    Action 1
                  </Text>
                </Box>
              </Box>
            </Box>
          </Card>

          <Card
            variant={'shadow'}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}>
            <Box style={styles.cardContainer}>
              {/* TOP */}
              <Box
                style={{
                  // flex: 0.54,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  flexDirection: 'row',
                }}>
                <Box flex={1} justifyContent={'center'} alignItems={'center'}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontFamily: 'MTNBrighterSans-Regular',
                      color: colors.momoBlue,
                      lineHeight: moderateScale(15.6),
                    }}>
                    Airtime
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(18),
                      fontFamily: 'MTNBrighterSans-Medium',
                      color: colors.momoBlue,
                      lineHeight: moderateScale(22.5),
                    }}>
                    FCFA 200
                  </Text>
                </Box>
                <Box
                  bg={'sunshineYellow'}
                  alignSelf={'stretch'}
                  width={0.5}
                  // width={StyleSheet.hairlineWidth}
                  style={{
                    marginTop: 16,
                  }}
                />
                <Box flex={1} justifyContent={'center'} alignItems={'center'}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontFamily: 'MTNBrighterSans-Regular',
                      color: colors.momoBlue,
                      lineHeight: moderateScale(15.6),
                    }}>
                    Data
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(18),
                      fontFamily: 'MTNBrighterSans-Medium',
                      color: colors.momoBlue,
                      lineHeight: moderateScale(22.5),
                    }}>
                    30.2 GB
                  </Text>
                </Box>
              </Box>
              <Box
                bg={'extraLightGrey'}
                height={StyleSheet.hairlineWidth}
                // height={0.5}
              />
              {/* BOTTOM */}
              <Box
                style={{
                  // flex: 0.45,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                }}>
                <Box
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(9),
                      fontFamily: 'MTNBrighterSans-Regular',
                      color: colors.momoBlue,
                      lineHeight: 11.7,
                    }}>
                    View all balances
                  </Text>
                </Box>
              </Box>
            </Box>
          </Card>

          <Card style={{paddingVertical: 16}}>
            <Box flexDirection={'row'}>
              <Box alignItems={'center'} gap={'xxs'} flex={1}>
                <TvIcon />
                <Text>item one</Text>
              </Box>
              <Box
                bg={'sunshineYellow'}
                alignSelf={'stretch'}
                width={0.5}

                // width={StyleSheet.hairlineWidth}
              />
              <Box alignItems={'center'} gap={'xxs'} flex={1}>
                <TvIcon />
                <Text>item two</Text>
              </Box>
            </Box>
          </Card>
          <Card style={{paddingVertical: 16}}>
            <Box flexDirection={'row'}>
              <Box alignItems={'center'} gap={'xxs'} flex={1}>
                <TvIcon />
                <Text>item one</Text>
              </Box>
            </Box>
          </Card>
          <Card style={{paddingVertical: 16}}>
            <Box flexDirection={'row'}>
              <Box alignItems={'center'} gap={'xxs'} flex={1}>
                <TvIcon />
                <Text>item one</Text>
              </Box>
              <Box bg={'sunshineYellow'} alignSelf={'stretch'} width={0.5} />
              <Box alignItems={'center'} gap={'xxs'} flex={1}>
                <TvIcon />
                <Text>item two</Text>
              </Box>
              <Box bg={'sunshineYellow'} alignSelf={'stretch'} width={0.5} />
              <Box alignItems={'center'} gap={'xxs'} flex={1}>
                <TvIcon />
                <Text>item three</Text>
              </Box>
            </Box>
          </Card>
        </Box>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
  },
  cardContainer: {
    // backgroundColor: '#fff',
    // backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    // height: '100%',
    // flex: 1,
  },
});

export default More;
