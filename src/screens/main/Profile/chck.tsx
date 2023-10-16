import {Button} from '@/component/atom/Button/Button';
import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const MyComponent = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: animatedValue,
  };

  return (
    <View style={styles.container}>
      <Text style={{marginTop: 50}}>dbhjbhjdjhb</Text>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={{marginTop: 50, color: 'white'}}>dbhjbhjdjhb</Text>
        <Text style={styles.text}>sss{animatedValue._value}</Text>
        <Button
          label="sjhbsj"
          variant="primary"
          onPress={() => {
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    // backgroundColor: 'red100',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default MyComponent;
