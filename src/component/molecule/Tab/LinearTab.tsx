import useDimension from '@/hooks/useDimension';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box} from '@atom';
import {useTheme} from '@shopify/restyle';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  findNodeHandle,
} from 'react-native';

type LinearTabType = {
  gap?: any;
  pH?: any;
  spaceEvenly?: boolean;
  headerStyle?: StyleProp<ViewStyle>;
  tabData: {
    title: string;
    renderScene: () => JSX.Element;
  }[];
};

interface TabItem {
  title: string;
  ref: React.RefObject<View> | null;
  renderScene: () => JSX.Element;
}
const LinearTab = ({
  tabData,
  pH,
  gap,
  headerStyle = {},
  spaceEvenly,
}: LinearTabType) => {
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
          height: getFontSizeByWindowHeight(4),
          top: getFontSizeByWindowHeight(29),
          // top: getFontSizeByWindowWidth(31),
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
      <Box
        ref={containerRef}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: pH,
          },
          headerStyle,
          spaceEvenly && {flex: 1, justifyContent: 'space-between'},
        ]}>
        {/* Tab  Indicator */}
        {measureLayout.length > 0 && <TabIndicator />}
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
              <Box
                ref={ref}
                pt={'vxxs'}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animated.Text
                  style={{
                    color: textColor,
                    fontFamily: 'MTNBrighterSans-Bold',
                    fontSize: getFontSizeByWindowWidth(12),
                    lineHeight: getFontSizeByWindowWidth(15.6),
                    textAlign: 'center',
                  }}>
                  {title}
                </Animated.Text>
              </Box>
            </TouchableOpacity>
          );
        })}
      </Box>

      {/* Details */}

      <View
        style={{
          backgroundColor: 'white',
          marginTop: getFontSizeByWindowWidth(14),
          borderRadius: 15,
          paddingTop: gap,
        }}>
        <Animated.FlatList
          ref={tabRef}
          data={tabData}
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
          renderItem={({item: {title, renderScene}, index}) => {
            return (
              <View
                style={{
                  width: CONTENT_WIDTH,
                  // width: '100%',
                  maxWidth: CONTENT_WIDTH,
                  backgroundColor: '#e8e8e8',
                }}>
                {renderScene()}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default LinearTab;
