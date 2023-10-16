import icon from '@/constants/icon';
import useDimension from '@/hooks/useDimension';
import {Theme} from '@/typings/globalTheme';
import {SpacingProps, useTheme} from '@shopify/restyle';
import React, {FC, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  // TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atom/Box';
import Text from '../../atom/Text';
import TouchableOpacity from '@/component/atom/TouchableOpacity';

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
  search?: boolean;
  loading?: boolean;
}
export type selectRenderItemType = {
  item: any;
  onItemPress: (item: any) => void;
};
const Dropdown: FC<Props> = ({
  placeHolder = 'Select your option *',
  displayKey = 'label',
  hasError,
  data: sdata,
  onSelect,
  renderItem,
  INPUT_HEIGHT = 48,
  paddingContainer = 'xl',
  search,
  loading,
}: Props) => {
  const [visible, setVisible] = useState(false);
  // const [data, setdata] = useState(sdata)
  const {colors, spacing} = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);
  const {height} = useDimension();
  const {top} = useSafeAreaInsets();
  const dropdownButton = useRef<any>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setfilteredData] = useState<any[]>(sdata);
  const [selected, setSelected] = useState<any>('');
  const {DropdownIcon, SearchIcon, DropIcon} = icon;

  const handleSearchText = (searchTerm: any) => {
    setSearchText(searchTerm);
    setVisible(searchText.length > 0);

    const filteredOptions = sdata.filter(option =>
      option.value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setfilteredData(filteredOptions);
  };

  const topInset = Platform.select({
    ios: 0,
    android: top,
  });
  const dropdownHEIGHT = 200;
  const openDropdown = async (): Promise<void> => {
    // @ts-ignore
    await dropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      if (height - 18 < py + h + dropdownHEIGHT) {
        setDropdownTop(py - dropdownHEIGHT - topInset!);
      } else {
        setDropdownTop(py + h - topInset!);
      }
    });
    setVisible(true);
  };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };
  // const toggleDropdown = (): void => {
  //   visible ? setVisible(false) : openDropdown();
  // };

  const onItemPress = (item: any): void => {
    setSelected(item);
    // console.log('item', item)
    setSearchText(item.label);
    // setSelected(item[displayKey]);
    onSelect && onSelect(item);
    setVisible(false);
  };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        {!isFocus && (
          <TouchableOpacity
            style={{
              height: '100%',
              zIndex: 10,
            }}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          />
        )}
        <Box
          paddingHorizontal={paddingContainer}
          // px={'hxl'}

          width="100%"
          style={[styles.dropdown, {top: dropdownTop}]}>
          <Box
            paddingHorizontal="s"
            bg={'red100'}
            width="100%"
            alignSelf="center"
            backgroundColor="white"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth={2}
            borderTopWidth={0}
            height={dropdownHEIGHT}
            borderColor={'momoBlue'}
            borderRadius={15}
            // pt={'vs'}
            // py={'vxs'}
          >
            {/* <Box
              alignItems={'center'}
              flexDirection={'row'}
              pb={'vs'}
              justifyContent={'space-between'}>
              <Text color="black">Select your country</Text>
              <UparrowIcon />
            </Box> */}
            {!loading ? (
              <FlatList
                data={search ? filteredData : sdata || []}
                renderItem={({item}) => renderItem({item, onItemPress})}
                bounces={false}
                contentContainerStyle={{
                  // backgroundColor: "red",
                  paddingHorizontal: 0,
                }}
                showsVerticalScrollIndicator
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Box>
                <ActivityIndicator />
              </Box>
            )}
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
      // borderWidth={visible ? 2 : 1}
      borderColor={hasError ? 'red100' : visible ? 'momoBlue' : 'black'}
      borderRadius={15}
      borderBottomWidth={visible ? 0 : 1}
      borderBottomLeftRadius={visible ? 0 : 15}
      borderBottomRightRadius={visible ? 0 : 15}
      // bg={'red100'}
      ref={dropdownButton}
      collapsable={false}
      height={INPUT_HEIGHT + 2}>
      <Box
        flexDirection={'row'}
        borderWidth={1}
        flex={1}
        borderColor={!visible ? 'transparent' : hasError ? 'red100' : 'momoBlue'}
        borderRadius={14}
        borderBottomWidth={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        height={'100%'}>
        {!visible && selected?.[displayKey] && (
          <Box
            style={{
              position: 'absolute',
              top: -12,
              left: 13,
              paddingVertical: 2,
              paddingHorizontal: 4,
              backgroundColor: 'white',
            }}>
            <Text fontSize={12}>Subject *</Text>
          </Box>
        )}
        {visible ? renderDropdown() : <Box />}
        <Box
          // onPress={toggleDropdown}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderRadius: 15,
          }}>
          {/* {data ? renderDropdown() : <Box />} */}
          {selected?.icon ? (
            <selected.icon />
          ) : search ? (
            <TouchableOpacity
              onPress={() => {
                setIsFocus(true);
                // inputRef.current?.focus();
                openDropdown();
                console.log('shjbhjsb');
                    
                inputRef.current?.focus();
              }}
              flex={1}
              flexDirection={'row'}>
              <TextInput
                placeholder="Select your option"
                placeholderTextColor={'black'}
                ref={inputRef}
                onBlur={() => setIsFocus(false)}
                style={{
                  // backgroundColor: 'green',
                  flex: 1,
                  height: '70%',
                  fontSize: 16,
                  // zIndex: 10000,
                }}
                value={searchText}
                onFocus={() => {
                  setIsFocus(true);
                  // inputRef.current?.focus();
                  openDropdown();
                }}
                // onFocus={() => setVisible(true)}
                // value={searchText || selected?.[displayKey]}
                onChangeText={handleSearchText}
                // onChangeText={setSearchText}
              />
              <SearchIcon
                onPress={() => {
                    console.log('shjbhjsb');
                    
                  setIsFocus(true);
                  inputRef.current?.focus();
                }}
              />
            </TouchableOpacity>
          ) : (
            <>
              <Text fontSize={16} textTransform={'capitalize'} color={'black'}>
                {selected?.[displayKey] || placeHolder}
              </Text>
              <DropIcon />
            </>
          )}
        </Box>
      </Box>
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

