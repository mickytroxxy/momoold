import Box from '@/component/atom/Box';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import Text from '@/component/atom/Text';
import CheckBox from '@/component/molecule/CheckBox/CheckBox';
import icon from '@/constants/icon';
import {ThemeContext} from '@/context/themeContext';
import useDimension from '@/hooks/useDimension';
import {palette} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import LinearProgressBar from '@molecule/LinearProgressBar/LinearProgressBar';
import {useTheme} from '@shopify/restyle';
import {useContext, useState} from 'react';
import {
  StatusBar,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IOScrollView} from 'react-native-intersection-observer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Homescreen() {
  const [theme, setTheme, setPrimaryColor] = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('italy');
  const {HomeFilledIcon, DollarDownIcon, MoreFilledIcon} = icon;
  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain', leftIconComponent: <DollarDownIcon />},
    {label: 'Madrid', value: 'madrid', leftIconComponent: <HomeFilledIcon />},
    {label: 'Ikeja', value: 'Ikeja', leftIconComponent: <MoreFilledIcon />},
    {
      label: 'Barcelona',
      value: 'barcelona',
      leftIconComponent: <HomeFilledIcon />,
    },
    {label: 'Lagos', value: 'Lagos', leftIconComponent: <HomeFilledIcon />},
    // { label: 'Barcelonaw', value: 'barcelonaw', parent: 'spain' },
    {label: 'Italy', value: 'italy', leftIconComponent: <HomeFilledIcon />},
    // { label: 'Rome', value: 'rome', parent: 'italy' },
    {
      label: 'Finlands',
      value: 'finlands',
      leftIconComponent: <HomeFilledIcon />,
    },

    {label: 'Finland', value: 'finland', leftIconComponent: <HomeFilledIcon />},
  ]);
  const [active, setActive] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {width, height} = useDimension();
  const countries = ['Male', 'Hells', 'Cis', 'Hells', 'HermaPhrodite'];
  const {HomeIcon, MenuIcon, TransactIcon, TransferIcon, UserIcon} = icon;

  const techStack = [
    {label: 'React', value: 'React'},
    {label: 'Redux', value: 'React'},
    {label: 'Redux Toolkit', value: 'React'},
    {label: 'RTK Query', value: 'React'},
    {label: 'React Navigation', value: 'React'},
    {label: 'msw', value: 'React'},
    {label: 'testing-library/react-native', value: 'React'},
  ];
  const {colors, spacing} = useTheme<Theme>();

  return (
    <SafeAreaContainer bg={'primaryColor'}>
      <IOScrollView
        // flex={1}
        // bg={'primaryColor'}
        style={{
          flex: 1,
          backgroundColor: colors.primaryColor,
        }}
        contentContainerStyle={{
          paddingBottom: 900,
        }}>
        <Box bg={'primaryColor'} style={{flex: 1}}>
          <StatusBar translucent={true} backgroundColor={colors.primaryColor} />
          <Box>
            <Box bg={'primaryColor'} height={insets.top} width={'100%'} />

            <Box
              flexDirection={'row'}
              pl={'hm'}
              mt={'vm'}
              mb={'vm'}
              alignItems={'center'}
              gap={'hsm'}>
              <Text variant={'medium'}>Color Mode</Text>
              <Switch
                value={theme === 'dark'}
                onValueChange={() =>
                  setTheme(theme === 'light' ? 'dark' : 'light')
                }
                testID="themeswitch"
              />
            </Box>
          </Box>
          {/* <HomeIcon /> */}
          {/* COLOR PALETTE */}
          <TouchableWithoutFeedback
            onPress={() => open && setOpen(false)}
            style={{flex: 1}}>
            <Box>
              <Box>
                <Text variant={'body'} mt={'vl'} pl={'hm'}>
                  Color Palette
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginTop: 5,
                  }}>
                  {[
                    palette.orange100,
                    palette.green80,
                    palette.red100,
                    palette.orange100,
                    palette.white,
                  ].map((item: any) => (
                    <TouchableOpacity
                      key={item}
                      style={{
                        backgroundColor: item,
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        borderWidth: 0.5,
                        marginRight: 5,
                      }}
                      onPress={() => setPrimaryColor(item)}
                    />
                  ))}
                </View>
              </Box>

              {/* SWITCH */}
              {/* <Box>
            <Text variant={'header'} marginVertical={'vl'}>
              Control
            </Text>
            <Box flexDirection={'row'} px={'hxl'} justifyContent={'space-between'}>
              <CustomSwitch
                active={active}
                onPress={() => {
                  setActive(v => !v);
                }}
              />
              <CustomSwitch
                active={active}
                onPress={() => {
                  setActive(v => !v);
                }}
              />
              <CustomSwitch
                active={active}
                onPress={() => {
                  setActive(v => !v);
                }}
              />
            </Box>
          </Box> */}

              {/* CHECKBOX */}
              <Box>
                <Text variant={'header'} marginVertical={'vl'}>
                  CheckBox
                </Text>
                <Box
                  flexDirection={'row'}
                  px={'hxl'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <CheckBox
                    // label="Like"
                    checked={!toggleCheckBox}
                    onChange={() => setToggleCheckBox(v => !v)}
                  />
                  <CheckBox
                    label="Like"
                    checked={!toggleCheckBox}
                    onChange={() => setToggleCheckBox(v => !v)}
                  />
                  <CheckBox
                    label="Like"
                    checked={!toggleCheckBox}
                    onChange={() => setToggleCheckBox(v => !v)}
                  />
                </Box>
              </Box>
              {/* INPUT */}
              {/* <Box>
                <Text variant={'header'} marginVertical={'vl'}>
                  TextInput
                </Text>
                <Box px={'hxl'} justifyContent={'space-between'}>
                  <TxInput />
                </Box>
              </Box> */}

              {/* <Box px={'hxl'}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  // searchable={true}
                  listMode="SCROLLVIEW"
                  zIndex={3000}
                  zIndexInverse={1000}
                  // listItemContainerStyle
                  listItemLabelStyle={{marginLeft: 10}}
                  containerStyle={{
                    // backgroundColor: 'blue',
                    borderWidth: 0,
                  }}
                  icon
                  style={{
                    borderWidth: 0,
                    borderBottomWidth: 0.5,
                    // backgroundColor: 'transparent',
                    backgroundColor: open ? '#004f711A' : 'transparent',
                    // backgroundColor: '#fff',
                    zIndex: 10000,
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    marginBottom: open ? 20 : 0,
                  }}
                  searchContainerStyle={{
                    // backgroundColor: '#F4F4F4',
                    borderBottomColor: '#fff',
                  }}
                  searchTextInputProps={{
                    maxLength: 25,
                    style: {
                      borderWidth: 0,
                      flex: 1,
                    },
                  }}
                  // TickIconComponent={}
                  // lis
                  dropDownContainerStyle={{
                    backgroundColor: '#F4F4F4',
                    borderWidth: 0,
                  }}
                  // addCustomItem={true}
                  customItemContainerStyle={{
                    // backgroundColor: '#dfdfdf',
                    height: 40,
                  }}
                />
              </Box> */}
              {/* SELECT */}
              <Box zIndex={-1}>
                <Text
                  variant={'header'}
                  textDecorationLine={'underline'}
                  marginVertical={'vl'}>
                  SELECT
                </Text>
                {/* <Box px={'hxl'} justifyContent={'space-between'}>
                  <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: colors.momoBlue,
                      justifyContent: 'flex-start',
                      paddingHorizontal: 0,
                      margin: 0,
                      width: '100%',
                    }}
                    buttonTextStyle={{
                      textAlign: 'left',
                      padding: 0,
                      marginHorizontal: 0,
                      fontSize: 16,
                      color: colors.momoBlue,
                    }}
                    renderDropdownIcon={() => (
                      <Icon name="expand-more" size={30} color={colors.momoBlue} />
                    )}
                    dropdownStyle={{
                      borderRadius: 10,
                      backgroundColor: '#F4F4F4',
                      marginVertical: 10,
                      paddingVertical: 8,
                      // height: '15%',
                    }}
                    showsVerticalScrollIndicator={true}
                    defaultButtonText="Select Gender"
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowStyle={{
                      paddingHorizontal: 4,
                      marginHorizontal: 10,
                      borderBottomWidth: 0,
                    }}
                    // renderCustomizedRowChild={(item, index) => {
                    //   console.log('item', item, index)
                    //   return (
                    //     <View>
                    //       <Text color={'black'}>{item}</Text>
                    //     </View>
                    //   );
                    // }}
                    rowTextStyle={{
                      textAlign: 'left',
                    }}
                    selectedRowStyle={{
                      backgroundColor: '#004f711A',
                      marginHorizontal: 10,
                      borderRadius: 13,
                      borderBottomWidth: 0,
                      elevation: 0,
                      marginTop: 5,
                      // height: 50
                      // margi
                    }}
                    selectedRowTextStyle={{
                      textAlign: 'left',
                    }}
                    dropdownOverlayColor="transparent"
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                  />
                </Box> */}
              </Box>

              {/* SELECT  & SEARCH*/}
              {/* <Box zIndex={-2}>
                <Text
                  variant={'header'}
                  textDecorationLine={'underline'}
                  marginVertical={'vl'}>
                  SELECT & SEARCH
                </Text>
                <Box px={'hxl'} justifyContent={'space-between'}>
                  <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonStyle={{
                      // backgroundColor: 'transparent',
                      borderBottomWidth: 1,
                      borderBottomColor: colors.momoBlue,
                      justifyContent: 'flex-start',
                      paddingHorizontal: 0,
                      margin: 0,
                      backgroundColor: '#004F711A',
                      width: '100%',
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                    }}
                    buttonTextStyle={{
                      textAlign: 'left',
                      padding: 0,
                      marginHorizontal: 0,
                      fontSize: 16,
                      color: colors.momoBlue,
                      // backgroundColor: 'white',
                    }}
                    renderDropdownIcon={() => (
                      <Icon name="expand-more" size={30} color={colors.momoBlue} />
                    )}
                    dropdownStyle={{
                      borderRadius: 10,
                      backgroundColor: '#F4F4F4',
                      marginVertical: 10,
                      paddingBottom: 8,
                      // paddingTop: 10
                      // height: '15%',
                    }}
                    showsVerticalScrollIndicator={true}
                    defaultButtonText="Select Gender"
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowStyle={{
                      paddingHorizontal: 4,
                      marginHorizontal: 10,
                      borderBottomWidth: 0,
                    }}
                    // renderCustomizedRowChild={(item, index) => {
                    //   console.log('item', item, index)
                    //   return (
                    //     <View>
                    //       <Text color={'black'}>{item}</Text>
                    //     </View>
                    //   );
                    // }}
                    rowTextStyle={{
                      textAlign: 'left',
                    }}
                    selectedRowStyle={{
                      backgroundColor: '#004f711A',
                      marginHorizontal: 10,
                      borderRadius: 13,
                      borderBottomWidth: 0,
                      elevation: 0,
                      marginTop: 10,
                    }}
                    selectedRowTextStyle={{
                      textAlign: 'left',
                    }}
                    dropdownOverlayColor="transparent"
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    search
                    searchPlaceHolder="Search country"
                    searchInputStyle={{
                      // borderBottomWidth: 1,
                      borderBottomColor: colors.momoBlue,
                      // paddingBottom:1030
                      // marginBottom: 50
                    }}
                    searchInputTxtStyle={{fontSize: 17}}
                    searchPlaceHolderColor={colors.momoBlue}
                    renderSearchInputLeftIcon={() => (
                      <Icon name="search" size={30} color={colors.momoBlue} />
                    )}
                    // renderSearchInputRightIcon
                  />
                </Box>
              </Box> */}

              {/* <Box px={'hxl'}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              searchable={true}
              listMode="SCROLLVIEW"
              zIndex={3000}
              zIndexInverse={1000}
              containerStyle={{
                // backgroundColor: 'blue',
                borderWidth: 0,
              }}
              style={{
                borderWidth: 0,
                borderBottomWidth: 0.5,
                backgroundColor: '#fff',
              }}
              labelStyle={{
                fontWeight: 'bold',
              }}
              searchContainerStyle={{
                // backgroundColor: '#dfdfdf',
                borderBottomColor: '#fff',
              }}
              searchTextInputProps={{
                maxLength: 25,
                style: {
                  borderWidth: 0,
                  flex: 1,
                },
              }}
              addCustomItem={true}
              customItemContainerStyle={{
                // backgroundColor: '#dfdfdf',
                height: 40,
              }}
              theme="DARK"
              // multiple={true}
              // mode="BADGE"
              // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            />
          </Box> */}

              {/* Tab */}
              <Box>
                <Text
                  variant={'header'}
                  textDecorationLine={'underline'}
                  marginVertical={'vl'}
                  mt={'vxl'}>
                  Tab
                </Text>
                <Box px={'hxl'} justifyContent={'space-between'}>
                  {/* <Tab2 /> */}
                </Box>
              </Box>

              {/*  Linear Progress Indicator */}
              <Box>
                <Text
                  variant={'header'}
                  textDecorationLine={'underline'}
                  marginVertical={'vl'}
                  mt={'vxl'}>
                  Linear Progress Indicator
                </Text>
                <Box px={'hxl'}>
                  <LinearProgressBar
                    backgroundColor={'#004f711A'}
                    height={10}
                    progress={70675}
                    barColor={colors.green80}
                    title={'Weekly Account'}
                    total={100000}
                    unit={'Gh'}
                  />
                </Box>
                <Box px={'hxl'} mt={'vm'}>
                  <LinearProgressBar
                    backgroundColor={'#004f711A'}
                    height={10}
                    progress={40675}
                    barColor={colors.red100}
                    title={'Monthly Account'}
                    total={100000}
                    unit={'Gh'}
                  />
                </Box>
                <Box px={'hxl'} mt={'vm'}>
                  <LinearProgressBar
                    backgroundColor={'#004f711A'}
                    height={10}
                    progress={30675}
                    barColor={colors.momoBlue}
                    title={'Yearly Account'}
                    total={100000}
                    unit={'Gh'}
                  />
                </Box>
              </Box>

              <Box px={'hxl'}>
                {/* <Tab3 /> */}
                {/* <Tab2 /> */}
              </Box>
            </Box>
          </TouchableWithoutFeedback>
          {/*  */}
          {/* <Box style={{
            // marginLeft: 100
            paddingHorizontal: 40
          }}>
            <Text
              variant={'header'}
              textDecorationLine={'underline'}
              marginVertical={'vl'}
              mt={'vxl'}>
              Linear Progress Indicator
            </Text>
            <BottomTabMenu />
          </Box> */}
        </Box>
      </IOScrollView>
    </SafeAreaContainer>
  );
}

export default Homescreen;

// <CheckBox
// disabled={false}
// value={toggleCheckBox}
// onValueChange={newValue => setToggleCheckBox(newValue)}
// boxType="square"
// onCheckColor={colors.green80}
// onTintColor={colors.grey}
// />
