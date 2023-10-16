import icon from '@/constants/icon';
import useDimension from '@/hooks/useDimension';
import {Theme} from '@/typings/globalTheme';
import {SpacingProps, useTheme} from '@shopify/restyle';
import React, {FC, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atom/Box';
import Text from '../../atom/Text';

// const INPUT_HEIGHT = 4;
// const INPUT_HEIGHT = 48;

interface Props {
  placeHolder?: string;
  displayKey?: any;
  hasError?: boolean;
  data: Array<{label: string; value: string}>;
  onSelect?: (item: {label: string; value: string}) => void;
  renderItem: any;
  INPUT_HEIGHT?: number;
  paddingContainer: keyof Theme['spacing'];
}
export type selectRenderItemType = {
  item: any;
  onItemPress: (item: any) => void;
};
const Dropdown: FC<Props> = ({
  placeHolder = 'Select Options',
  displayKey = 'label',
  hasError,
  data,
  onSelect,
  renderItem,
  INPUT_HEIGHT = 48,
  paddingContainer = 'hxl',
}: Props) => {
  const [visible, setVisible] = useState(false);
  const {colors, spacing} = useTheme<Theme>();
  const {height} = useDimension();
  const {top} = useSafeAreaInsets();
  const dropdownButton = useRef<any>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState<any>(undefined);
  const {DropdownIcon, UparrowIcon} = icon;

  const topInset = Platform.select({
    ios: 0,
    android: top,
  });
  const dropdownHEIGHT = 200;
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
    // setSelected(item[displayKey]);
    onSelect && onSelect(item);
    setVisible(false);
  };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={{
            height: '100%',
          }}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        />
        <Box
          paddingHorizontal={paddingContainer}
          // px={'hxl'}
          width="100%"
          style={[styles.dropdown, {top: dropdownTop}]}>
          <Box
            paddingHorizontal="hs"
            width="100%"
            alignSelf="center"
            backgroundColor="white"
            borderWidth={1}
            height={dropdownHEIGHT}
            borderColor={'momoBlue'}
            borderRadius={15}
            pt={'vs'}
            py={'vxs'}>
            <Box
              alignItems={'center'}
              flexDirection={'row'}
              pb={'vs'}
              justifyContent={'space-between'}>
              <Text color="black">Select your country</Text>
              <UparrowIcon />
            </Box>
            <FlatList
              data={data || []}
              renderItem={({item}) => renderItem({item, onItemPress})}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box
      flexDirection="row"
      backgroundColor="transparent"
      alignItems="center"
      borderWidth={visible ? 2 : 1}
      borderColor={hasError ? 'red100' : 'momoBlue'}
      borderRadius={15}
      // bg={'red100'}
      ref={dropdownButton}
      collapsable={false}
      height={INPUT_HEIGHT + 2}>
      <TouchableOpacity
        // ref={dropdownButton}
        onPress={toggleDropdown}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          // paddingHorizontal: spacing.hsm,
          // height: '100%',
          borderRadius: 15,
        }}>
        {data ? renderDropdown() : <Box />}
        {selected?.icon ? (
          <selected.icon />
        ) : (
          <Text color={'black'}>{selected?.[displayKey] || placeHolder}</Text>
        )}
        {<DropdownIcon />}
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    shadowColor: '#000000',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Dropdown;

{
  /* <View
    //   ref={dropdownButton}
      style={{
        flexDirection: 'row',
        backgroundColor: 'red100',
        alignItems: 'center',
        borderColor: colors.momoBlue,
        paddingLeft: spacing.l,
        paddingRight: spacing.hm,
        borderRadius: 15,
        height: INPUT_HEIGHT,
      }}> */
}
