import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import SegmentedProgressBar from './SegmentedProgressBar';
import Slide from './Slide';
import {onBoardingImage} from '@/constants/images';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {DarkStatusBar} from '@/component/molecule/StausBar';
import {useNavigation} from '@react-navigation/native';
import {OnboardingScreenProps} from '@/typings/navigation';
import { Button } from '@atom';

const Onboard = () => {
  const {height, width} = useWindowDimensions();
  const {colors, spacing} = useTheme<Theme>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const fRef = useRef<FlatList>(null);
  const [sindex, setSindex] = useState(0);
  const navigation = useNavigation<OnboardingScreenProps['navigation']>();
  const {Onboard1, Onboard2, Onboard3, Onboard4} = onBoardingImage;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;

  type onBoarding = {
    name: string;
    description: string;
    Source: any;
  };

  const slideData: onBoarding[] = [
    {
      name: 'TopUp',
      description:
        'Buy airtime, data and voice bundles and prepaid electricity ​',
      Source: Onboard1,
    },
    {
      name: 'Pay Bills',
      description:
        'You can pay your electricity, TV subscriptions, water, school fees and taxes bills using MoMo',
      Source: Onboard2,
    },
    {
      name: 'Scan to Pay',
      description:
        'You can make payments to merchants and retailers by scanning a QR code on the MoMo app',
      Source: Onboard3,
    },
    {
      name: 'Send & Receive Money',
      description:
        'Send and receive money from and to any MTN mobile number and receive money from abroad',
      Source: Onboard4,
    },
  ];

  return (
    // <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={{flex: 1}}>
      <DarkStatusBar />
        <View style={{}}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              paddingHorizontal: 15,
              flexDirection: 'row',
              paddingTop: 10,
              justifyContent: 'space-between',
              // zIndex: -5,
            }}>
            <SegmentedProgressBar segments={4} progress={sindex} />
          </View>
        </View>
        <Animated.FlatList
          ref={fRef}
          data={slideData}
          renderItem={({item, index}: {item: onBoarding; index: number}) => (
            <Slide
              text={item.name}
              description={item.description}
              Source={item.Source}
            />
          )}
          horizontal
          initialScrollIndex={sindex}
          decelerationRate={'fast'}
          snapToAlignment="center"
          pagingEnabled
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          // onViewableItemsChanged={viewableItemsChanged}
          bounces={false}
          scrollEnabled={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
              // listener
            },
          )}
        />
        <View style={{position: 'relative'}}>
          <View
            style={{
              position: 'absolute',
              right: spacing.hm,
              left: spacing.hm,
              bottom: height / 20,
            }}>
            <Button
              onPress={() => {
                if (sindex >= 3) return navigation.navigate('SelectCountry');
                
                console.log('yes');
                console.log('sindex', sindex);
                setSindex(v => v + 1);
                fRef.current?.scrollToIndex({
                  animated: true,
                  index: sindex + 1,
                });
              }}
              //   onPress={scrollTo}
              // maxWidth={spacing.m * 20}
              label="NEXT"
              variant="primary"
            />
          </View>
        </View>
      </SafeAreaView>
    // </View>
  );
};

export default Onboard;
