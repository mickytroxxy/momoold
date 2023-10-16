import lightThemes from '@/style/theme';
import { Theme } from '@/typings/globalTheme';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const tabDatas = [{ title: 'Tab 1' }, { title: 'Tab 2000' }, { title: 'Tab 3' }];
const TextData = ['Tab 1', 'Tab 2', 'Tab 3'];
const colors = lightThemes.colors
const Tab3 = () => {
  const scrollX = useSharedValue(0);
  const tabRef = useRef(null);
  const {colors} = useTheme<Theme>();

  const onFeedTabPress = useCallback((index) => {
    tabRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  }, []);

  const tabIndicatorStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, 
      tabDatas.map((_, i) => i * width),
      [4, (width - 80) / 3, (2 * (width - 80)) / 3 - 4],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View>
      <View>
        <View style={{ marginBottom: 20 }}>
          {TextData.map((item, index) => {
            const textOpacity = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const outputRange = [0, 1, 0];
              return {
                opacity: interpolate(scrollX.value, inputRange, outputRange, Extrapolate.CLAMP),
              };
            });

            return (
              <Animated.View key={item} style={[styles.textContainer, textOpacity]}>
                <Text>{item}</Text>
              </Animated.View>
            );
          })}
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
        {tabDatas.map(({ title }, index) => {
          const textColorStyle = useAnimatedStyle(() => {
            const textColor = interpolate(
              scrollX.value,
              [index - 1, index, index + 1].map((i) => i * width),
              [colors.grey, colors.momoBlue, colors.grey],
              Extrapolate.CLAMP
            );

            // const fontWeight = interpolate(
            //   scrollX.value,
            //   [index - 1, index, index + 1].map((i) => i * width),
            //   ['500', '600', '500'],
            //   Extrapolate.CLAMP
            // );

            const fontScale = interpolate(
              scrollX.value,
              [index - 1, index, index + 1].map((i) => i * width),
              [1, 1.1, 1],
              Extrapolate.CLAMP
            );

            return {
              color: textColor,
            //   fontWeight,
              transform: [{ scale: fontScale }],
            };
          });

          return (
            <TouchableOpacity
              key={`${title}-${index}`}
              style={styles.tabButton}
              onPress={() => {
                onFeedTabPress(index);
              }}
            >
              <Animated.Text style={[styles.tabButtonText, textColorStyle]}>
                {title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.tabContentContainer}>
        <Animated.FlatList
          ref={tabRef}
          data={tabDatas}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          onScroll={useAnimatedScrollHandler((event) => {
            scrollX.value = event.contentOffset.x;
          })}
          renderItem={({ item }) => {
            return (
              <View style={styles.tabContent}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
  },
  tabIndicator: {
    position: 'absolute',
    height: '85%',
    width: (width - 80) / 3,
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
  tabButton: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  tabButtonText: {
    textAlign: 'center',
  },
  tabContentContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 80,
    borderColor: colors.grey,
    height: 150,
    borderRadius: 15,
  },
});

export default Tab3;
