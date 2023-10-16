import useDimension from '@/hooks/useDimension';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useCallback, useRef} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../atom';

const tabDatas = [{title: 'Tab 1'}, {title: 'Tab 2000'}, {title: 'Tab 3'}];
const TextData = ['Tab 1', 'Tab 2', 'Tab 3'];

type TabProp = {
  paddingHorizontal: any;
};

const Tab = ({paddingHorizontal}: TabProp) => {
  const {colors, spacing} = useTheme<Theme>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width, height} = useDimension();
  const CONTENT_WIDTH = width - paddingHorizontal * 2;
  const containerRef = useRef<any>();
  const tabRef = useRef<FlatList>(null);
  const tabPosition = Animated.divide(scrollX, CONTENT_WIDTH);

  const onFeedTabPress = useCallback((index: number) => {
    tabRef?.current?.scrollToOffset({
      offset: index * CONTENT_WIDTH,
    });
  }, []);

  const TabIndicator = () => {
    const inputRange = tabDatas.map((_, i) => i * CONTENT_WIDTH);
    const outputRange = [4, CONTENT_WIDTH / 3, (2 * CONTENT_WIDTH) / 3 - 4];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
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
          transform: [
            {
              translateX,
            },
          ],
        }}
      />
    );
  };

  //   const inputRange = tabDatas.map((_, i) => i * CONTENT_WIDTH);

  return (
    <View style={{}}>
      <View style={{}}>
        <View style={{marginBottom: 20}}>
          {TextData.map((item: any, index: any) => {
            const inputRange = [
              (index - 1) * CONTENT_WIDTH,
              index * CONTENT_WIDTH,
              (index + 1) * CONTENT_WIDTH,
            ];
            const outputRange = [0, 1, 0];
            const textOpacity = scrollX.interpolate({
              inputRange,
              outputRange,
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={item}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  opacity: textOpacity,
                }}>
                <Text
                //   style={{
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     // opacity: textOpacity,
                //   }}
                >
                  {item}
                </Text>
              </Animated.View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          backgroundColor: '#F4F4F4',
          borderRadius: 20,
        }}>
        {/* Tab  Indicator */}
        {<TabIndicator />}
        {/* Tab Header */}
        {tabDatas.map(({title}, index) => {
          const textColor = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.grey, colors.momoBlue, colors.grey],
            extrapolate: 'clamp',
          });
          const fontScale = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [1, 1.1, 1],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity
              key={`${title}-${index}`}
              style={{
                width: '33%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}
              onPress={() => {
                console.log('jkdjkdjk');
                onFeedTabPress(index);
              }}>
              <View
                key={`${title}-${index}`}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Animated.Text
                  style={{
                    // color: colors.momoBlue,
                    textAlign: 'center',
                    color: textColor,
                    fontFamily: 'MTNBrighterSans-Regular',
                    // fontWeight,
                  }}>
                  {title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Tab Content */}
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          borderRadius: 15,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.grey,
        }}>
        <Animated.FlatList
          ref={tabRef}
          data={tabDatas}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              //   useNativeDriver: true,
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
                  borderColor: colors.grey,
                  height: 150,
                  borderRadius: 15,
                  backgroundColor: index === 1 ? 'green' : 'blue',
                }}>
                <Text color={'black'}>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Tab;
