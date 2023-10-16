import useDimension from '@/hooks/useDimension';
import {Theme} from '@/typings/globalTheme';
import {ScrollView, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';
// import Animated from 'react-native-reanimated';

const tabData = [
  {title: 'SUGGESTED'},
  {title: 'PAY'},
  {title: 'RECHARGE'},
  {title: 'CHECKING'},
  {title: 'AGAIN'},
  {title: 'LAST'},
  // {title: 'RECssqHARGE'},
  // {title: 'RECHA42RGE'},
];
interface TabItem {
  title: string;
  ref: React.RefObject<View> | null; // Replace 'View' with the type of your component if not a View
}
const LinearTab = () => {
  const {colors} = useTheme<Theme>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width, height} = useDimension();
  const [measureLayout, setmeasureLayout] = useState<
    Array<{x: number; y: number; width: number; height: number}>
  >([]);
  const containerRef = useRef<View | null>(null);
  const CONTENT_WIDTH = width;
  const tabRef = useRef<FlatList>(null);
  const tabPosition = Animated.divide(scrollX, CONTENT_WIDTH);
  const tabDatas: TabItem[] = tabData.map(tab => ({
    ...tab,
    ref: React.createRef(),
  }));

  const onFeedTabPress = useCallback((index: number) => {
    tabRef?.current?.scrollToOffset({
      offset: index * CONTENT_WIDTH,
    });
  }, []);

  useEffect(() => {
    let ml: Array<{x: number; y: number; width: number; height: number}> = [];
    tabDatas.forEach(b => {
      const textRefHandle = findNodeHandle(containerRef.current);
      b?.ref?.current?.measureLayout(textRefHandle!, (x, y, width, height) => {
        ml.push({
          x,
          y,
          width,
          height,
        });
        if (ml.length === tabDatas.length) {
          setmeasureLayout(ml);
        }
      });
    });
  }, [containerRef.current]);

  const TabIndicator = () => {
    const inputRange = tabDatas.map((_, i) => i * CONTENT_WIDTH);
    const outputRange = measureLayout.map(measure => measure.x);
    const outputRange2 = measureLayout.map(measure => measure.width);
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
    const widths = scrollX.interpolate({
      inputRange,
      outputRange: outputRange2,
      extrapolate: 'clamp',
    });
    // console.log('translateX', scrollX);
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: 4,
          top: 27,
          width: widths,
          left: 0,
          borderRadius: 20,
          backgroundColor: '#ffcb05',
          // borderTopLeftRadius: 6,
          // borderTopRightRadius: 6,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          transform: [
            {
              translateX,
            },
          ],
        }}
      />
    );
  };
  // ScrollView
  return (
    <View>
      <ScrollView
        ref={containerRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        // hitSlop={}
        contentContainerStyle={{
          alignItems: 'center',
          // backgroundColor: "red",
          paddingLeft: 30,
          flexGrow: 1,
          paddingBottom: 14,
        }}>
        {/* Tab  Indicator */}
        {tabDatas.map(({title, ref}, index) => {
          const textColor = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.lightGrey, colors.momoBlue, colors.lightGrey],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity
              onPress={() => {
                onFeedTabPress(index);
              }}
              key={`${title}-${index}`}>
              <View
                ref={ref}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15,
                }}>
                <Animated.Text
                  style={{
                    color: textColor,
                    fontFamily: 'MTNBrighterSans-Bold',
                  }}>
                  {title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {measureLayout.length > 0 && <TabIndicator />}
      </ScrollView>

      {/* Details */}

      <View
        style={{
          backgroundColor: 'white',
          // marginTop: 80,
          // marginTop: 14,
          borderRadius: 15,
        }}>
        <Animated.FlatList
          ref={tabRef}
          data={tabDatas}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: CONTENT_WIDTH,
                  backgroundColor: '#e8e8e8',
                  height: 400,
                  //   borderRadius: 15,
                }}>
                <Text
                  color={'momoBlue'}
                  variant={'headings'}
                  lineHeight={36}
                  fontSize={29}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default LinearTab;
