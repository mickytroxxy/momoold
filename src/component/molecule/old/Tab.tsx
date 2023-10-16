import useDimension from '@/hooks/useDimension';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useCallback, useRef} from 'react';
import {
  // Animated,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Text} from '../../atom';

const View1 = () => (
  <View>
    <Text color={'black'}>You like what you see</Text>
  </View>
);
const View2 = () => (
  <View>
    <Text color={'black'}>You Love nothing you see</Text>
  </View>
);
const View3 = () => (
  <View>
    <Text color={'black'}>You Hate it already</Text>
  </View>
);

// const tabData = [
//   {title: 'Tab 1', comp: <View1 />},
//   {title: 'Tab 2', comp: <View2 />},
//   {title: 'Tab 3', comp: <View3 />},
// ];

const TextData = ['Tab 1', 'Tab 2', 'Tab 3'];
type TabProp = {
  paddingHorizontal: any;
  tabData: any;
};
const Tab = ({paddingHorizontal, tabData}: TabProp) => {
  const {width} = useDimension();
  console.log('padding', paddingHorizontal);
  const CONTENT_WIDTH = width;
  // const CONTENT_WIDTH = width - paddingHorizontal * 2;
  // const CONTENT_WIDTH = width - padding * 2;
  const {colors} = useTheme<Theme>();
  const scrollX = useSharedValue(0);
  const tabRef = useRef<FlatList<typeof tabData> | null>(null);
  const tabPosition = useDerivedValue(() => {
    return scrollX.value / CONTENT_WIDTH;
  });

  const onTabPress = useCallback((index: number) => {
    tabRef?.current?.scrollToOffset({
      offset: index * CONTENT_WIDTH,
    });
  }, []);

  const styles = StyleSheet.create({
    tabIndicator: {
      position: 'absolute',
      height: '85%',
      width: CONTENT_WIDTH / 3,
      borderRadius: 20,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    tabTextContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    tabHeaderText: {
      textAlign: 'center',
      fontFamily: 'MTNBrighterSans-Regular',
    },
    tabContentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // width: width,
      width: CONTENT_WIDTH,
      // borderColor: colors.grey,
      // height: 150,
      // borderRadius: 15,
    },
    tabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      backgroundColor: '#F4F4F4',
      borderRadius: 20,
    },
    tabBar: {
      width: '33%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
    mainContainer: {
      backgroundColor: 'white',
      // marginTop: 20,
      borderRadius: 15,
      // borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.grey,
    },
  });

  const TabIndicator = () => {
    const tabIndicatorStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        scrollX.value,
        tabData.map((_: any, i: any) => i * CONTENT_WIDTH),
        [4, CONTENT_WIDTH / 3, (2 * CONTENT_WIDTH) / 3 - 4],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{translateX}],
      };
    });
    return <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />;
  };
  const renderTabText = (item: string, index: number) => {
    const textOpacity = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * CONTENT_WIDTH,
        index * CONTENT_WIDTH,
        (index + 1) * CONTENT_WIDTH,
      ];
      const outputRange = [0, 1, 0];
      return {
        opacity: interpolate(
          scrollX.value,
          inputRange,
          outputRange,
          Extrapolate.CLAMP,
        ),
      };
    });

    return (
      <Animated.View
        key={item}
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
          },
          textOpacity,
        ]}>
        <Text>{item}s</Text>
      </Animated.View>
    );
  };

  const renderTabHeader = ({title}: {title: string}, index: number) => {
    const textColorStyle = useAnimatedStyle(() => {
      const textColor = interpolateColor(
        tabPosition.value,
        [index - 1, index, index + 1],
        [colors.grey, colors.momoBlue, colors.grey],
      );
      // const fontWeight = interpolate(
      //   scrollX.value,
      //   [index - 1, index, index + 1].map((i) => i * width),
      //   ['500', '600', '500'],
      //   Extrapolate.CLAMP
      // );

      // const fontScale = interpolate(
      //   scrollX.value,
      //   [index - 1, index, index + 1].map((i) => i * width),
      //   [1, 1.1, 1],
      //   Extrapolate.CLAMP
      // );

      return {
        color: textColor,
        //   fontWeight,
        // transform: [{ scale: fontScale }],
      };
    });

    return (
      <TouchableOpacity
        key={`${title}-${index}`}
        style={styles.tabBar}
        onPress={() => {
          onTabPress(index);
        }}>
        <View
          key={`${title}-${index}`}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Animated.Text style={[styles.tabHeaderText, textColorStyle]}>
            {title}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTabContent = ({item, index}: {item: any; index: number}) => {
    return (
      // <View style={styles.tabContentContainer}>
      //   <Text>{item.title}</Text>
      // </View>
      <View style={styles.tabContentContainer}>{item.renderScene}</View>
    );
  };

  return (
    <View>
      {/* <View>
        <View style={{marginBottom: 20}}>{TextData.map(renderTabText)}</View>
      </View> */}
      <View style={styles.tabContainer}>
        {/* Tab  Indicator */}
        {<TabIndicator />}
        {/* Tab Header */}
        {tabData.map(renderTabHeader)}
      </View>
      {/* Tab Content */}
      <View style={styles.mainContainer}>
        <Animated.FlatList
          // @ts-ignore
          ref={tabRef}
          data={tabData}
          horizontal
          pagingEnabled
          scrollEventThrottle={32}
          snapToAlignment={'center'}
          // scrollEnabled={Platform.OS === 'ios'}
          showsHorizontalScrollIndicator={false}
          onScroll={useAnimatedScrollHandler(event => {
            scrollX.value = event.contentOffset.x;
          })}
          renderItem={renderTabContent}
        />
      </View>
    </View>
  );
};

export default Tab;
