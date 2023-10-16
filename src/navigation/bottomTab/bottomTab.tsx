import { Platform, ViewStyle, Image } from 'react-native';
import More from '@/screens/main/More';
import Profile from '@/screens/main/Profile';
import Transact from '@/screens/main/SettingScreen';
import Transfer from '@/screens/main/Transfer';
import {
  BottomTabBar,
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import icon from '@/constants/icon';
import MainStackNavigator from '@/screens/main/Homescreen';
import { Theme } from '@/typings/globalTheme';
import { useTheme } from '@shopify/restyle';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { AddButton } from './AnimatedTransactButton';
import TabCenter from './TabCenter.svg'
import { Box } from '@atom';
const Tab = createBottomTabNavigator();
type CustomButtonProps = BottomTabBarButtonProps & {
  containerStyle?: ViewStyle;
  isFloat?: boolean;
  label: 'Home' | 'Transfer' | 'More' | 'Profile' | 'Transact';
};

type tabIconProp = {
  label: CustomButtonProps['label'];
  focused: boolean;
};

const Tabs = () => {
  const {colors} = useTheme<Theme>();
  const {
    HomeIcon,
    MenuIcon,
    TransactIcon,
    TransferIcon,
    UserIcon,
    BottomTabIcon,
    HomeFilledIcon,
    MoreFilledIcon,
    TransferFilledIcon,
    ProfileFilledIcon,
  } = icon;

  function renderTabIcon({label, focused}: tabIconProp) {
    switch (label) {
      case 'Home':
        return focused ? <HomeFilledIcon /> : <HomeIcon fill={colors.white} />;
        break;
      case 'Transfer':
        return focused ? <TransferFilledIcon /> : <TransferIcon />;
        break;
      case 'Transact':
        return <TransactIcon />;
        break;
      case 'Profile':
        return focused ? <ProfileFilledIcon /> : <UserIcon />;
        break;
      case 'More':
        return focused ? <MoreFilledIcon /> : <MenuIcon />;
        break;
      default:
        return 'foo';
    }
  }

  const CustomButton = (props: CustomButtonProps) => {
    const {onPress, accessibilityState, containerStyle, isFloat, label} = props;

    const focused = accessibilityState?.selected as boolean;
    return isFloat ? (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: colors.momoBlue,
          // backgroundColor: 'transparent',
          ...containerStyle,
        }}>
          {/* <TabCenter width={'100%'} stroke={colors.momoBlue}/> */}
          <Box
                  style={{
                    position: 'absolute',
                    top: -33,
                    backgroundColor: colors.sunshineYellow,
                    width: 51,
                    height: 51,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AddButton />
                </Box>
          <Image source={require('./Subtract.png')} style={{width:'100%', height:'100%'}}  />

        {/* <BottomTabIcon /> */}
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            top: -13,
            backgroundColor: colors.sunshineYellow,
            justifyContent: 'center',
            alignItems: 'center',
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
          onPress={onPress}
          activeOpacity={1}>
          <AddButton />
        </TouchableOpacity> */}
        <Text
          style={{
            color: focused ? colors.sunshineYellow : colors.white,
            marginTop: 5,
            // position: 'absolute',
            // top: 33,
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.momoBlue,
          paddingVertical: 10,
          ...containerStyle,
        }}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.momoBlue,
            ...containerStyle,
          }}>
          {renderTabIcon({label, focused})}
          <Text
            style={{
              color: focused ? colors.sunshineYellow : colors.white,
              marginTop: 5,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const CustomTabBar = (props: any) => {
    return (
      <View>
        {/* <Text>shdhhjd</Text> */}
        <BottomTabBar {...props} />
      </View>
    );
  };

  type TabarRoutesProps = {
    route: 'Home' | 'Transfer' | 'More' | 'Profile' | 'Transact';
    // component: any;
    component: () => React.JSX.Element;
    containerStyle?: ViewStyle;
    isFloat?: boolean;
  };

  const TabarRoutes: TabarRoutesProps[] = [
    {
      route: 'Home',
      component: MainStackNavigator,
      containerStyle: {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
    },
    {
      route: 'Transfer',
      component: Transfer,
    },
    {
      route: 'Transact',
      component: Transact,
      isFloat: true,
    },
    {
      route: 'Profile',
      component: Profile,
    },
    {
      route: 'More',
      component: More,
      containerStyle: {borderTopRightRadius: 20, borderBottomRightRadius: 20},
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: 'transparent',
          borderRadius: 20,
          right: 16,
          left: 16,
          height: Platform.OS === 'ios' ? 90 : 61,
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarShowLabel: false,
      }}
      // tabBar={props => <CustomTabBar {...props} />}
    >
      {TabarRoutes.map((_, index) => (
        <Tab.Screen
          key={index}
          name={_.route}
          component={_.component}
          listeners={({}) => ({
            tabPress: e => {
              _.route === 'Transact' && e.preventDefault();
            },
          })}
          options={{
            tabBarButton: props => (
              <CustomButton
                containerStyle={_.containerStyle}
                isFloat={_.isFloat}
                label={_.route}
                {...props}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;



    // screenOptions={{
      // headerShown: false,
      // tabBarStyle: {
      //   position: 'absolute',
      //   // elevation: 0,
      //   backgroundColor: 'transparent',
      //   // backgroundColor: 'white',
      //   borderRadius: 20,
      //   right: 16,
      //   left: 16,
      //   height: Platform.OS === 'ios' ? 90 : 61,
      //   marginBottom: Platform.OS === 'ios' ? 0 : 10,
      //   elevation: 15,
      //   // overflow: 'hidden',
      //   shadowColor: Platform.select({
      //     ios: '#9b9b9b', //878787  9b9b9b efefef extraLightGrey
      //     // ios: '#e8e8e8', //878787  9b9b9b efefef extraLightGrey
      //     android: 'shadow', // 5b5b5b 4f4f4f
      //   }),
      //   shadowOffset: {
      //     width: 0,
      //     height: -5,
      //   },
      //   shadowOpacity: 0.3,
      // },  tabBarShowLabel: false,
      // }}