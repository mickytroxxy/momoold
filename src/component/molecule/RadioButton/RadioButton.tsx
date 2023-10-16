import {
  controlsRadioButtonChecked,
  controlsRadioButtonInactive,
  controlsRadioButtonUnchecked,
} from '@/style-dictionary-dist/momoStyle';
import {Box, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import React, {useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

type RadioButtonType = {
  options: {
    multiText?:string;
    label?:string;
    value?:string;
  }[];
  selectedOption: any;
  setSelectedOption: any;
  showLabel?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const RadioButton = ({
  options,
  selectedOption,
  setSelectedOption,
  containerStyle,
  showLabel,
  disabled,
}: RadioButtonType) => {
  const {colors} = useTheme();

  const rippleScale = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(rippleScale, {
      toValue: 1,
      speed: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = (option: any) => {
    Animated.spring(rippleScale, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    if (disabled) return;
    // Check if the pressed option is already selected
    if (selectedOption === option.label) {
      // Same option is selected, deselect it
      setSelectedOption(null);
    } else {
      // Different option is selected, update the selection
      setSelectedOption(option.label);
    }
  };

  return (
    <Box flexDirection={'row'} gap={'hm'} style={containerStyle}>
      {options.map((option: any, index: number) => (
        <TouchableWithoutFeedback
          key={`${option.label}-${index}`}
          onPressIn={handlePressIn}
          onPressOut={() => handlePressOut(option)}>
          <Box alignItems={'center'} flexDirection={'row'} gap={'vs'}>
            <Box
              style={[
                styles.radioButton,
                selectedOption === option.label && styles.selected,
                disabled && {borderColor: controlsRadioButtonInactive},
              ]}>
              {selectedOption === option.label && (
                <View
                  style={[
                    styles.dot,
                    disabled && {
                      backgroundColor: controlsRadioButtonInactive,
                    },
                  ]}
                />
              )}
              {/* <Animated.View
                style={[styles.ripple, {transform: [{scale: rippleScale}]}]}
              /> */}
            </Box>
            {showLabel && (
              <View>
                {option.multiText && <Text fontFamily={'MTNBrighterSans-Regular'} style={{color: selectedOption === option.label ? colors.momoBlue : colors.grey}} fontSize={13}>{option.multiText} </Text>}
                <Text fontFamily={'MTNBrighterSans-Medium'} style={{color: selectedOption === option.label ? colors.momoBlue : colors.grey}} fontSize={14}>{option?.label} </Text>
              </View>
            )}
          </Box>
        </TouchableWithoutFeedback>
      ))}
      {/* {selectedOption && <Text>Selected option: {selectedOption}</Text>} */}
    </Box>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderColor: controlsRadioButtonChecked,
  },
  ripple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: controlsRadioButtonChecked,
    opacity: 0.2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: controlsRadioButtonChecked,
  },
});

export default RadioButton;
