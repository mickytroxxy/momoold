import icon from '@/constants/icon';
import useDimension from '@/hooks/useDimension';
import {Theme} from '@/typings/globalTheme';
import {Box, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import React, {FC, forwardRef, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {SvgProps} from 'react-native-svg';

// const INPUT_HEIGHT = 4;
// const INPUT_HEIGHT = 48;
export type countryDataType = {
  label: string;
  value: string;
  icon: FC<SvgProps>;
};
interface Props {
  placeHolder?: string;
  displayKey?: any;
  hasError?: boolean;
  data: Array<countryDataType>;
  onSelect?: (item: {label: string; value: string; icon: FC<SvgProps>}) => void;
  renderItem: any;
  INPUT_HEIGHT?: number;
  paddingContainer: keyof Theme['spacing'];
  value: any;
  bgColor?: keyof Theme['colors'];
}
export type selectRenderItemType = {
  item: any;
  onItemPress: (item: any) => void;
};
const CountryDropdown = forwardRef(
  (
    {
      hasError,
      data,
      onSelect,
      renderItem,
      INPUT_HEIGHT = 48,
      paddingContainer = 'hxl',
      value,
      bgColor = 'white',
    }: Props,
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const {colors, spacing} = useTheme<Theme>();
    const {height} = useDimension();
    const {top} = useSafeAreaInsets();
    const dropdownButton = useRef<any>(null);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [selected, setSelected] = useState<any>(value);
    const {DropdownIcon, UparrowIcon, DropIcon} = icon;
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] =
      React.useState(0);

    const indicator = new Animated.Value(0);

    const topInset = Platform.select({
      ios: 0,
      android: top,
    });
    const dropdownHEIGHT = 240;
    const openDropdown = async (): Promise<void> => {
      // @ts-ignore
      await dropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
        if (height - 18 < py + h + dropdownHEIGHT) {
          setDropdownTop(py - 8 - dropdownHEIGHT - topInset!);
        } else {
          setDropdownTop(py + h + 8 - topInset!);
        }
      });
      setVisible(true);
    };

    const toggleDropdown = (): void => {
      visible ? setVisible(false) : openDropdown();
    };

    const onItemPress = (item: any): void => {
      setSelected(item);
      onSelect && onSelect(item);
      setVisible(false);
    };

    const renderDropdown = () => {
      const indicatorSize =
        scrollViewWholeHeight > scrollViewVisibleHeight
          ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
            scrollViewWholeHeight
          : scrollViewVisibleHeight;

      const difference =
        scrollViewVisibleHeight > indicatorSize
          ? scrollViewVisibleHeight - indicatorSize
          : 1;
      return (
        visible && (
          // <Modal visible transparent animationType="none">
          <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity
              style={{
                height: '100%',
              }}
              activeOpacity={1}
              onPress={() => setVisible(false)}
            />
            {dropdownTop !== 0 && (
              <Box
                paddingHorizontal={paddingContainer}
                // px={'hxl'}
                width="100%"
                style={[styles.dropdown, {top: dropdownTop}]}>
                <Box
                  // paddingHorizontal="s"
                  width="100%"
                  alignSelf="center"
                  backgroundColor={bgColor}
                  borderWidth={2}
                  height={dropdownHEIGHT}
                  borderColor={'momoBlue'}
                  borderRadius={15}
                  pt={'vs'}
                  py={'vxs'}>
                  <Box
                    alignItems={'center'}
                    flexDirection={'row'}
                    paddingHorizontal="hs"
                    pb={'vs'}
                    justifyContent={'space-between'}>
                    <Text
                      fontFamily="MTNBrighterSans-Regular"
                      color="black"
                      fontSize={16}>
                      Select your country
                    </Text>
                    {/* <UparrowIcon /> */}
                  </Box>
                  <>
                    <FlatList
                      data={data || []}
                      renderItem={({item}) =>
                        renderItem({
                          item,
                          onItemPress,
                          selected: selected?.['label'],
                        })
                      }
                      bounces={false}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      scrollEventThrottle={16}
                      onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height);
                      }}
                      onLayout={({
                        nativeEvent: {
                          layout: {x, y, width, height},
                        },
                      }) => {
                        setScrollViewVisibleHeight(height);
                      }}
                      onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: indicator}}}],
                        {useNativeDriver: false},
                      )}
                    />
                    {/* Custom Scrollbar */}
                    {data.length > 5 && (
                      <Box
                        style={{
                          width: 5,
                          height: '100%',
                          position: 'absolute',
                          top: '25%',
                          bottom: 0,
                          right: moderateScale(5),
                        }}>
                        <Animated.View
                          style={{
                            width: 5,
                            borderRadius: 5,
                            height: indicatorSize,
                            backgroundColor: colors.momoBlue,
                            transform: [
                              {
                                translateY: Animated.multiply(
                                  indicator,
                                  scrollViewVisibleHeight /
                                    scrollViewWholeHeight,
                                ).interpolate({
                                  inputRange: [0, difference],
                                  outputRange: [0, difference],
                                  extrapolate: 'clamp',
                                }),
                              },
                            ],
                          }}
                        />
                      </Box>
                    )}
                  </>
                </Box>
              </Box>
            )}
          </Modal>
        )
      );
    };

    return (
      <Box
        flexDirection="row"
        backgroundColor="transparent"
        alignItems="center"
        borderColor={hasError ? 'red100' : visible ? 'momoBlue' : 'black'}
        borderRadius={15}
        borderWidth={1}
        ref={dropdownButton}
        collapsable={false}
        height={INPUT_HEIGHT + 2}>
        {/* <TextInput style={styles.invisibleTInput} ref={ref} /> */}
        <Box
          flexDirection={'row'}
          borderWidth={1}
          flex={1}
          borderColor={
            !visible ? 'transparent' : hasError ? 'red100' : 'momoBlue'
          }
          borderRadius={14}
          height={'100%'}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // gap: 10,
              paddingHorizontal: 14,
              borderRadius: 15,
            }}>
            {data ? renderDropdown() : null}
            {selected?.icon && <selected.icon />}
            {
              <DropIcon
                color={visible ? colors.momoBlue : colors.black}
                width={16}
                height={16}
              />
            }
          </TouchableOpacity>
        </Box>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    shadowColor: '#000000',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  invisibleTInput: {height: 0, width: 0},
});

export default CountryDropdown;
