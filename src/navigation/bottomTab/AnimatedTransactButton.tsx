import React, {useRef} from 'react';
import {Animated, TouchableHighlight, View} from 'react-native';
// import Icon from '@expo/vector-icons/FontAwesome';
import icon from '@/constants/icon';
import {moderateScale} from 'react-native-size-matters';
import {Text} from '@atom';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
// const SIZE = 80;
// const SIZE = 48;
const SIZE = getFontSizeByWindowHeight(51);
const RADIUS = getFontSizeByWindowWidth(100);
const ANGLE = 45;

const {TransactIcon, DollarDownIcon, WalletIcon, TabCloseIcon, EyeIcon} = icon;

const AddButton = () => {
  const mode = useRef(new Animated.Value(0)).current;

  const offsetX = RADIUS * Math.cos(ANGLE);
  const offsetY = RADIUS * Math.sin(ANGLE);

  //   const [mode, setfirst] = useState(new Animated.Value(0))
  console.log('mode', {mode});
  const toggleView = () => {
    Animated.timing(mode, {
      //@ts-ignore
      toValue: mode._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const firstX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, getFontSizeByWindowWidth(-110)],
    // outputRange: [20, getFontSizeByWindowWidth(-120)],
    // outputRange: [20, -120],
  });
  const firstY = mode.interpolate({
    inputRange: [0, 1],
    // outputRange: [0, -70],
    outputRange: [0, getFontSizeByWindowHeight(-70)],
    // outputRange: [0, -30],
  });
  const secondX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 20],
  });
  const secondY = mode.interpolate({
    inputRange: [0, 1],
    // outputRange: [0, -100],
    outputRange: [0, getFontSizeByWindowHeight(-100)],
    // outputRange: [0, -55],
  });
  const thirdX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, getFontSizeByWindowWidth(90)],
    // outputRange: [20, getFontSizeByWindowWidth(100)],
  });
  const thirdY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, getFontSizeByWindowHeight(-70)],
    // outputRange: [0, -70],
  });
  const opacity = mode.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });
  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  const opacity1 = mode.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [0, 0, 0, 1],
  });
  const opacity2 = mode.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [1, 0, 0, 0],
  });
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: firstX,
          top: firstY,
          opacity,
          height: getFontSizeByWindowWidth(70),
          width: getFontSizeByWindowWidth(70),
          borderRadius: getFontSizeByWindowWidth(35),
          borderWidth: 4,
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFCB05',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <TouchableHighlight
          onPress={() => {}}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: SIZE / 2,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            // backgroundColor: '#48A2F8',
          }}>
          <DollarDownIcon
            width={getFontSizeByWindowWidth(44)}
            height={getFontSizeByWindowHeight(44)}
            // width={44}
            // height={44}
            fill={'#004F71'}
          />
        </TouchableHighlight>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          //   left: secondX,
          top: secondY,
          opacity,
          // height: 70,
          // width: 70,
          height: getFontSizeByWindowWidth(70),
          width: getFontSizeByWindowWidth(70),
          borderRadius: getFontSizeByWindowWidth(35),
          borderWidth: 4,
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFCB05',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <TouchableHighlight
          onPress={() => {}}
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: SIZE / 2,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            // backgroundColor: '#48A2F8',
          }}>
          <TransactIcon
            width={getFontSizeByWindowWidth(38)}
            height={getFontSizeByWindowHeight(38)}
            fill={'#004F71'}
          />
          {/* <Text>su</Text> */}
        </TouchableHighlight>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: thirdX,
          top: thirdY,
          opacity,
          // height: 70,
          // width: 70,
          height: getFontSizeByWindowWidth(70),
          width: getFontSizeByWindowWidth(70),
          borderRadius: getFontSizeByWindowWidth(35),
          borderWidth: 4,
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFCB05',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <TouchableHighlight
          onPress={() => {}}
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: SIZE / 2,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            // backgroundColor: '#48A2F8',
          }}>
          <WalletIcon
            width={getFontSizeByWindowWidth(44)}
            height={getFontSizeByWindowHeight(44)}
            fill={'#004F71'}
          />
        </TouchableHighlight>
      </Animated.View>
      <TouchableHighlight
        onPress={toggleView}
        underlayColor="#2882D8"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // width: SIZE,
          // height: SIZE,
          height: getFontSizeByWindowHeight(60),
          width: getFontSizeByWindowHeight(60),
          borderRadius: getFontSizeByWindowHeight(35),
          // borderRadius: SIZE / 2,
          backgroundColor: '#FFCB05',
        }}>
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              //   transform: [{rotate: rotation}],
              position: 'absolute',
              opacity: opacity2,
            }}>
            <TransactIcon
              width={getFontSizeByWindowWidth(24)}
              height={getFontSizeByWindowHeight(24)}
              fill={'#004F71'}
            />
          </Animated.View>
          <Animated.View
            style={{
              //   transform: [{rotate: rotation}],
              position: 'absolute',
              opacity: opacity1,
            }}>
            <TabCloseIcon fill={'#004F71'} />
            {/* {mode._value !== 0 ? <TransactIcon /> : <TabCloseIcon />} */}
          </Animated.View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
export {AddButton};
