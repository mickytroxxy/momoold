import {Platform, ViewStyle} from 'react-native';
import More from '@/screens/main/More';
import Profile from '@/screens/main/Profile';
import Transact from '@/screens/main/SettingScreen';
import Transfer from '@/screens/main/Transfer';
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import icon from '@/constants/icon';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {AddButton} from './AnimatedTransactButton';
import {Box, Icon, Text} from '@atom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {Shadow} from 'react-native-shadow-2';
import {getFontSizeByWindowWidth} from '@/style/theme';
import HomeScreenNavigator from '@/screens/main/Homescreen';
import TransferScreenNavigator from '@/screens/main/Transfer';

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
  const {colors, spacing} = useTheme<Theme>();
  const {bottom} = useSafeAreaInsets();
  const {
    HomeIcon,
    TransactIcon,
    HomeFilledIcon,
    SendIcon,
    OffersIcon,
    MoreIcon,
    DashMenuIcon,
    DashProfileIcon,
    DashTransferIcon
  } = icon;

  function renderTabIcon({label, focused}: tabIconProp) {
    switch (label) {
      case 'Home':
        return focused ? (
          <HomeFilledIcon width={24} height={24} fill={colors.sunshineYellow} />
        ) : (
          <HomeFilledIcon width={24} height={24} stroke={colors.white} />
        );
        break;
      case 'Transfer':
        console.log(focused)
        return focused ? (
          <DashTransferIcon width={24} height={24} stroke={colors.sunshineYellow} />
        ) : (
          <DashTransferIcon width={24} height={24}  />
        );
        break;
      case 'Transact':
        return <TransactIcon stroke={colors.sunshineYellow} />;
        break;
      case 'Profile':
        return focused ? (
          <DashProfileIcon width={24} height={24} stroke={colors.sunshineYellow} />
        ) : (
          <DashProfileIcon width={24} height={24} />
        );
        break;
      case 'More':
        return focused ? (
          <DashMenuIcon width={24} height={24} stroke={colors.sunshineYellow} />
        ) : (
          <DashMenuIcon width={24} height={24} />
        );
        break;
      default:
        return 'foo';
    }
  }

  
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
      component: HomeScreenNavigator,
      // containerStyle: {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
    },
    {
      route: 'Transfer',
      component: TransferScreenNavigator,
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
      // containerStyle: {borderTopRightRadius: 20, borderBottomRightRadius: 20},
    },
  ];
  function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
    // console.log('state', state)
    return (
      <Shadow
        distance={bottom + 20}
        // distance={30}
        startColor={'#00000020'}
        offset={[10, -60]}
        containerStyle={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          // bottom: 10,
          // left: 10,
          // right: 10,
          left: 0,
          right: 0,
          backgroundColor: 'white',
        }}>
        <Box
          borderRadius={0}
          backgroundColor={'momoDarkBlue'}
          py={'vs'}
          style={{
            flexDirection: 'row',
            paddingBottom: spacing.vs + bottom,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            // const label =
            //   options.tabBarLabel !== undefined
            //     ? options.tabBarLabel
            //     : options.title !== undefined
            //     ? options.title
            //     : route.name;
            const label = route.name as tabIconProp['label'];

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                // @ts-ignore
                navigation.navigate({name: route.name, merge: true});
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return index === 2 ? (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                key={`index-${index}`}
                onLongPress={onLongPress}
                style={[
                  {
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                    position: 'relative',
                    // backgroundColor: "red"
                  },
                ]}>
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
                <Text
                  fontSize={moderateScale(9)}
                  lineHeight={moderateScale(11.7)}
                  style={{
                    color: isFocused ? colors.sunshineYellow : colors.white,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                key={`index-${index}`}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  },
                  index === 0 && {
                    borderTopLeftRadius: getFontSizeByWindowWidth(9),
                  },
                  index === 4 && {
                    borderTopRightRadius: getFontSizeByWindowWidth(9),
                  },
                ]}>
                {renderTabIcon({label, focused: isFocused})}

                <Text
                  fontSize={moderateScale(9)}
                  lineHeight={moderateScale(11.7)}
                  style={{
                    color: isFocused ? colors.sunshineYellow : colors.white,marginTop:5
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Box>
      </Shadow>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
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
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;


// import {Platform, ViewStyle} from 'react-native';
// import More from '@/screens/main/More';
// import Profile from '@/screens/main/Profile';
// import Transact from '@/screens/main/SettingScreen';
// import Transfer from '@/screens/main/Transfer';
// import {
//   BottomTabBarButtonProps,
//   BottomTabBarProps,
//   createBottomTabNavigator,
// } from '@react-navigation/bottom-tabs';
// import icon from '@/constants/icon';
// import {Theme} from '@/typings/globalTheme';
// import {useTheme} from '@shopify/restyle';
// import {TouchableOpacity} from 'react-native';
// import {View} from 'react-native-animatable';
// import {AddButton} from './AnimatedTransactButton';
// import {Box, Text} from '@atom';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {moderateScale} from 'react-native-size-matters';
// import {Shadow} from 'react-native-shadow-2';
// import HomeStackNavigator from '../HomeStackNavigator';

// const Tab = createBottomTabNavigator();
// type CustomButtonProps = BottomTabBarButtonProps & {
//   containerStyle?: ViewStyle;
//   isFloat?: boolean;
//   label: 'Home' | 'Transfer' | 'More' | 'Profile' | 'Transact' | 'Transactions';
// };

// type tabIconProp = {
//   label: CustomButtonProps['label'];
//   focused: boolean;
// };

// const Tabs = () => {
//   const {colors, spacing} = useTheme<Theme>();
//   const {bottom} = useSafeAreaInsets();
//   const {
//     HomeIcon,
//     TransactIcon,
//     HomeFilledIcon,
//     DashMenuIcon,
//     DashProfileIcon,
//     DashTransferIcon
//   } = icon;

//   function renderTabIcon({label, focused}: tabIconProp) {
//     switch (label) {
//       case 'Home':
//         return focused ? (
//           <HomeFilledIcon width={18} height={18} fill={colors.sunshineYellow} />
//         ) : (
//           <HomeIcon width={18} height={18} stroke={colors.white} />
//         );
//         break;
//       case 'Transfer':
//         return focused ? (
//           <DashTransferIcon fill={colors.sunshineYellow} />
//         ) : (
//           <DashTransferIcon fill={colors.white} />
//         );
//         break;
//       case 'Transact':
//         return <TransactIcon fill={colors.sunshineYellow} />;
//         break;
//       case 'Profile':
//         return focused ? (
//           <DashProfileIcon fill={colors.sunshineYellow} />
//         ) : (
//           <DashProfileIcon stroke={colors.white} />
//         );
//         break;
//       case 'More':
//         return focused ? (
//           <DashMenuIcon fill={colors.sunshineYellow} />
//         ) : (
//           <DashMenuIcon fill={colors.white} />
//         );
//         break;
//       default:
//         return 'foo';
//     }
//   }

//   type TabarRoutesProps = {
//     route: 'Home' | 'Transfer' | 'More' | 'Profile' | 'Transact' | 'Transactions';
//     // component: any;
//     component: () => React.JSX.Element;
//     containerStyle?: ViewStyle;
//     isFloat?: boolean;
//   };

//   const TabarRoutes: TabarRoutesProps[] = [
//     {
//       route: 'Home',
//       component: HomeStackNavigator,
//       containerStyle: {borderTopLeftRadius: 9},
//       // containerStyle: {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
//     },
//     {
//       route: 'Transfer',
//       component: Transfer,
//     },
//     {
//       route: 'Transact',
//       component: Transact,
//       isFloat: true,
//     },
//     {
//       route: 'Profile',
//       component: Profile,
//     },
//     {
//       route: 'More',
//       component: More,
//       containerStyle: {borderTopRightRadius: 9},
//     }
//   ];
//   function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
//     // console.log('state', state)
//     return (
//       <Shadow
//         distance={bottom + 20}
//         // distance={30}
//         startColor={'#00000020'}
//         offset={[10, -60]}
//         containerStyle={{
//           flexDirection: 'row',
//           position: 'absolute',
//           bottom: 0,
//           // bottom: 10,
//           // left: 10,
//           // right: 10,
//           left: 0,
//           right: 0,
//           backgroundColor: 'white',
//         }}>
//         <Box
//           borderRadius={20}
//           paddingVertical={'vs'}
//           backgroundColor={'momoDarkBlue'}
//           style={{
//             flexDirection: 'row',
//             paddingBottom: spacing.xxs + bottom,
//             position: 'absolute',
//             bottom: 5,
//             left: 10,
//             right: 10,
//           }}>
//           {state.routes.map((route, index) => {
//             const {options} = descriptors[route.key];
//             const label =
//               options.tabBarLabel !== undefined
//                 ? options.tabBarLabel
//                 : options.title !== undefined
//                 ? options.title
//                 : route.name;

//             const isFocused = state.index === index;

//             const onPress = () => {
//               const event = navigation.emit({
//                 type: 'tabPress',
//                 target: route.key,
//                 canPreventDefault: true,
//               });

//               if (!isFocused && !event.defaultPrevented) {
//                 // The `merge: true` option makes sure that the params inside the tab screen are preserved
//                 navigation.navigate({name: route.name, merge: true});
//               }
//             };

//             const onLongPress = () => {
//               navigation.emit({
//                 type: 'tabLongPress',
//                 target: route.key,
//               });
//             };

//             return index === 2 ? (
//               <TouchableOpacity
//                 accessibilityRole="button"
//                 accessibilityState={isFocused ? {selected: true} : {}}
//                 accessibilityLabel={options.tabBarAccessibilityLabel}
//                 testID={options.tabBarTestID}
//                 onPress={onPress}
//                 key={`index-${index}`}
//                 onLongPress={onLongPress}
//                 style={[
//                   {
//                     flex: 1,
//                     justifyContent: 'flex-end',
//                     alignItems: 'center',
//                     gap: 1,
//                     position: 'relative',
//                     // backgroundColor: "red"
//                   },
//                 ]}>
//                 <Box
//                   style={{
//                     position: 'absolute',
//                     top: -33,
//                     backgroundColor: colors.white,
//                     width: 51,
//                     height: 51,
//                     borderRadius: 25,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     //borderWidth:50,
//                   }}>
//                   <AddButton />
//                 </Box>
//                 <Text
//                   fontSize={moderateScale(9)}
//                   lineHeight={moderateScale(11.7)}
//                   style={{color: isFocused ? colors.momoBlue : colors.white}}>
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 accessibilityRole="button"
//                 accessibilityState={isFocused ? {selected: true} : {}}
//                 accessibilityLabel={options.tabBarAccessibilityLabel}
//                 testID={options.tabBarTestID}
//                 key={`index-${index}`}
//                 onPress={onPress}
//                 onLongPress={onLongPress}
//                 style={[
//                   {
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: 1,
//                   },
//                   index === 0 && {borderTopLeftRadius: 9},
//                   index === 4 && {borderTopRightRadius: 9},
//                 ]}>
//                 {renderTabIcon({label, focused: isFocused})}

//                 <Text
//                   fontSize={moderateScale(9)}
//                   lineHeight={moderateScale(11.7)}
//                   style={{color: isFocused ? colors.sunshineYellow : colors.white}}>
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </Box>
//       </Shadow>
//     );
//   }

//   return (
//     <View style={{flex:1}}>
//       <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={props => <MyTabBar {...props} />}>
//         {TabarRoutes.map((_, index) => (
//           <Tab.Screen
//             key={index}
//             name={_.route}
//             component={_.component}
//             listeners={({}) => ({
//               tabPress: e => {
//                 _.route === 'Transact' && e.preventDefault();
//               },
//             })}
//           />
//         ))}
//     </Tab.Navigator>
//     </View>
//   );
// };

// export default Tabs;
