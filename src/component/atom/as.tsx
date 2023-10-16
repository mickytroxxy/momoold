import React, {FC, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Box from './Box';
import useDimension from '@/hooks/useDimension';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import icon from '@/constants/icon';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// const INPUT_HEIGHT = 4;
const INPUT_HEIGHT = 48;

interface Props {
  label: string;
  displayKey?: any;
  hasError?: boolean;
  data: Array<{label: string; value: string}>;
  onSelect: (item: {label: string; value: string}) => void;
}

export const Dropdown: FC<Props> = ({
  label,
  displayKey = 'label',
  hasError,
  data,
  onSelect,
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
  const openDropdown = async (): Promise<void> => {
    // @ts-ignore
    await dropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      // setDropdownTop(py - topInset! + h);
    });
    setVisible(true);
  };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const onItemPress = (item: any): void => {
    setSelected(item[displayKey]);
    onSelect(item);
    setVisible(false);
  };
  console.log('top', top);

  // @ts-ignore
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{color: '#000'}}>{item[displayKey]}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        {/* <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              zIndex: -1,
            }}
          />
        </TouchableWithoutFeedback> */}
        <Box
          px={'hl'}
          width="100%"
          style={[styles.dropdown, {top: dropdownTop + 10}]}>
          {/* style={[styles.dropdown, {top: dropdownTop + 17}]}> */}
          <Box
            paddingHorizontal="hm"
            width="100%"
            alignSelf="center"
            backgroundColor="white"
            borderWidth={1}
            height={200}
            borderColor={'momoBlue'}
            borderRadius={15}
            pt={'vs'}
            py={'vxs'}>
            <Box
              alignItems={'center'}
              flexDirection={'row'}
              pb={'vs'}
              justifyContent={'space-between'}>
              <Text>Select your country</Text>
              <UparrowIcon />
            </Box>
            <FlatList
              data={data || []}
              renderItem={renderItem}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              // contentContainerStyle={{paddingBottom: 15}}
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
      borderWidth={1}
      borderColor={hasError ? 'red100' : 'momoBlue'}
      borderRadius={15}
      // bg={'red100'}
      ref={dropdownButton}
      collapsable={false}
      height={INPUT_HEIGHT}>
      <TouchableOpacity
        // ref={dropdownButton}
        onPress={toggleDropdown}
        style={{
          // backgroundColor: 'green',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: spacing.hl,
          height: '100%',
          borderRadius: 15,
        }}>
        {data ? renderDropdown() : null}
        <Text style={{color: '#ffffff'}}>{selected || label}</Text>
        <DropdownIcon />
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    // position: 'absolute',
    shadowColor: '#000000',
    // shadowColor: '#000000',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderBottomWidth: 1,
  },
});

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
