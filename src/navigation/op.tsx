import React, {Component, useRef} from 'react';
import {Animated, TouchableHighlight, View} from 'react-native';
// import Icon from '@expo/vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import icon from '@/constants/icon';
// const SIZE = 80;
const SIZE = 48;

const {TransactIcon} = icon;

const AddButton = () => {
  // const {TransactIcon} = icon
  const mode = useRef(new Animated.Value(0)).current;
  const toggleView = () => {
    Animated.timing(mode, {
      toValue: mode._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const firstX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -40],
  });
  const firstY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const secondX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 20],
  });
  const secondY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55],
  });
  const thirdX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 80],
  });
  const thirdY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const opacity = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        bottom: 6,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: firstX,
          top: firstY,
          opacity,
        }}>
        <TouchableHighlight
          onPress={() => {}}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: SIZE / 2,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            backgroundColor: '#48A2F8',
          }}>
          <Icon name="rocket" size={16} color="#F8F8F8" />
        </TouchableHighlight>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: secondX,
          top: secondY,
          opacity,
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
            backgroundColor: '#48A2F8',
          }}>
          <Icon name="home" size={16} color="#F8F8F8" />
        </TouchableHighlight>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: thirdX,
          top: thirdY,
          opacity,
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
            backgroundColor: '#48A2F8',
          }}>
          <Icon name="archive" size={16} color="#F8F8F8" />
        </TouchableHighlight>
      </Animated.View>
      <TouchableHighlight
        onPress={toggleView}
        underlayColor="#2882D8"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
        //   position: 'absolute',
          // top: -40,
          backgroundColor: '#FFCB05',
        }}>
        <Animated.View
          style={{
            transform: [{rotate: rotation}],
          }}>
          <TransactIcon />
        </Animated.View>
      </TouchableHighlight>
    </View>
  );
};
export {AddButton};
