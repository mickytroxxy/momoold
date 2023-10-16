import icon from '@/constants/icon';
import {Theme} from '@/typings/globalTheme';
import {Box, Text} from '@atom';
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';
import {TouchableOpacity, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Shadow} from 'react-native-shadow-2';
import {moderateScale} from 'react-native-size-matters';
import EmptyScreen from './EmptyScreen';
import {AddButton} from '@/navigation/bottomTab/AnimatedTransactButton';
import {getFontSizeByWindowWidth} from '@/style/theme';
import TestScreen from './TestScreen';

const Tab = createBottomTabNavigator();
type CustomButtonProps = BottomTabBarButtonProps & {
  containerStyle?: ViewStyle;
  isFloat?: boolean;
  label: 'Home' | 'Send' | 'More' | 'Offers' | 'MoMoPay';
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
  } = icon;

  function renderTabIcon({label, focused}: tabIconProp) {
    switch (label) {
      case 'Home':
        return focused ? (
          <HomeFilledIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            fill={colors.momoBlue}
          />
        ) : (
          <HomeIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            stroke={colors.lightGrey}
          />
        );
        break;
      case 'Send':
        return focused ? (
          <SendIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            color={colors.momoBlue}
          />
        ) : (
          <SendIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            color={colors.lightGrey}
          />
        );
        break;
      case 'MoMoPay':
        return (
          <TransactIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            fill={colors.momoBlue}
          />
        );
        break;
      case 'Offers':
        return focused ? (
          <OffersIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            stroke={colors.momoBlue}
          />
        ) : (
          <OffersIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            stroke={colors.lightGrey}
          />
        );
        break;
      case 'More':
        return focused ? (
          <MoreIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            color={colors.momoBlue}
          />
        ) : (
          <MoreIcon
            width={getFontSizeByWindowWidth(18)}
            height={getFontSizeByWindowWidth(18)}
            color={colors.lightGrey}
          />
        );
        break;
      default:
        return 'foo';
    }
  }

  type TabarRoutesProps = {
    route: 'Home' | 'Send' | 'More' | 'Offers' | 'MoMoPay';
    // component: any;
    component: () => React.JSX.Element;
    containerStyle?: ViewStyle;
    isFloat?: boolean;
  };

  const TabarRoutes: TabarRoutesProps[] = [
    {
      route: 'Home',
      component: TestScreen,
      containerStyle: {borderTopLeftRadius: 9},
      // containerStyle: {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
    },
    {
      route: 'Send',
      component: EmptyScreen,
    },
    {
      route: 'MoMoPay',
      component: EmptyScreen,
      isFloat: true,
    },
    {
      route: 'Offers',
      component: EmptyScreen,
    },
    {
      route: 'More',
      component: EmptyScreen,
    },
  ];
  function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
    return (
      <Shadow
        distance={20}
        startColor={'#00000020'}
        offset={[10, -60]}
        containerStyle={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
        }}>
        <Box
          borderTopLeftRadius={9}
          borderTopRightRadius={9}
          // paddingVertical={moderateScale(16)}
          // py={'vs'}
          style={{
            flexDirection: 'row',
            paddingVertical: moderateScale(16),
            // paddingBottom: bottom,
            // paddingBottom: spacing.vs + bottom,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
          }}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
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
                key={`${index}-key`}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  {
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                    position: 'relative',
                  },
                ]}>
                <Box
                  style={{
                    position: 'absolute',
                    top: -34,
                    backgroundColor: colors.sunshineYellow,
                    width: 51,
                    height: 51,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AddButton />
                  {/* {renderTabIcon({label, focused: isFocused})} */}
                </Box>
                {/* {renderTabIcon({label, focused: isFocused})} */}
                <Text
                  fontSize={getFontSizeByWindowWidth(9)}
                  lineHeight={getFontSizeByWindowWidth(11.7)}
                  style={{
                    color: isFocused ? colors.momoBlue : colors.lightGrey,
                    fontFamily: 'MTNBrighterSans-Medium',
                    top: 1,
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
                onPress={onPress}
                key={`${index}-key`}
                onLongPress={onLongPress}
                style={[
                  {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  },
                  index === 0 && {borderTopLeftRadius: 9},
                  index === 4 && {borderTopRightRadius: 9},
                ]}>
                {renderTabIcon({label, focused: isFocused})}

                <Text
                  fontSize={getFontSizeByWindowWidth(9)}
                  lineHeight={getFontSizeByWindowWidth(11.7)}
                  style={{
                    color: isFocused ? colors.momoBlue : colors.lightGrey,
                    fontFamily: 'MTNBrighterSans-Medium',
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
              _.route === 'MoMoPay' && e.preventDefault();
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;
