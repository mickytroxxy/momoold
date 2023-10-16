import {View, Text, Animated, FlatList, LayoutRectangle} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import useDimension from '@/hooks/useDimension';
// import Animated from 'react-native-reanimated';

const tabData = [{title: 'Tab 1'}, {title: 'Tab 2'}, {title: 'Tab 3'}];

const Tab = () => {
  const {colors} = useTheme<Theme>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width, height} = useDimension();
  const [measureLayout, setmeasureLayout] = useState([]);
  const containerRef = useRef<View>();
  const tabRef = useRef<FlatList>(null);
  const tabPosition = Animated.divide(scrollX, width);
  const tabDatas = tabData.map(tab => ({
    ...tab,
    ref: React.createRef(),
  }));

  const onFeedTabPress = useCallback((index: number) => {
    tabRef?.current?.scrollToOffset({
      offset: index * (width - 80),
    });
  }, []);

  useEffect(() => {
    let ml: LayoutRectangle[] = [];
    tabDatas.forEach(b => {
      b?.ref?.current?.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          //   console.log('x, y, width', x, y, width);
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === tabDatas.length) {
            setmeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  const TabIndicator = () => {
    const inputRange = tabDatas.map((_, i) => i * width);
    const outputRange = measureLayout.map(measure => measure.x);
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
    // console.log('translateX', scrollX);
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: '85%',
          // width: 100,
          width: '33%',
          // flex:1,
          left: 3,
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
          transform: [
            {
              translateX,
              //   translateX : 10,
            },
          ],
          // marginVertical:
        }}
      />
    );
  };
  return (
    <View>
      <View
        ref={containerRef}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          backgroundColor: '#F4F4F4',
          borderRadius: 20,
        }}>
        {/* Tab  Indicator */}
        {measureLayout.length > 0 && <TabIndicator />}
        {tabDatas.map(({title, ref}, index) => {
          const textColor = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.momoBlue, colors.black, colors.momoBlue],
          });
          const fontWeight = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ['500', '800', '500'],

            easing: value => {
              const thousandRounded = value * 1000;
              if (thousandRounded < 500) {
                return 0;
              }

              if (thousandRounded < 800) {
                return 0;
              }

              return 1;
            },
            extrapolate: 'clamp',
          });
          const fontScale = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [1, 1.1, 1],
            extrapolate: 'clamp',
          });
          return (
            <View
              ref={ref}
              key={`${title}-${index}`}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                // flex: 1,
                width: '33%',
              }}>
              <Text
                style={{
                  color: colors.momoBlue,
                  //   textAlign: "center"
                }}>
                {title}
              </Text>
            </View>
          );
        })}
      </View>
      {/* Details */}

      <View
        style={{
          backgroundColor: 'white',
          marginTop: 20,
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
                  width: width - 80,
                  // backgroundColor: 'white',
                  height: 150,
                  //   borderRadius: 15,
                }}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Tab;
