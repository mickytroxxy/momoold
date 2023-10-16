import {removeMessage, selectMessage} from '@/features/alert/alertSlice';
import {useTypedDispatch, useTypedSelector} from '@/store/store';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Animated,
  PanResponder,
} from 'react-native';

type SnackbarType = {
  title: string;
  description: string;
  // visible?: boolean;
  // onFinish: () => void;
  position?: 'top' | 'bottom';
};

const Snackbar = ({title, description}: SnackbarType) => {
  const positionY = useRef(new Animated.Value(0)).current;
  const dispatch = useTypedDispatch();
  const message = useTypedSelector(selectMessage);
  const [pan] = useState(new Animated.ValueXY());
  const [animation] = useState(new Animated.Value(0));

  // const [pan] = useState(new Animated.ValueXY());
  const translateY = positionY.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 60],
  });
  // const timeout = useRef<NodeJS.Timeout | null>();
  // const showSnack = () => {
    // Animated.parallel([
    //   Animated.sequence([
    //     Animated.timing(positionY, {
    //       toValue: 1,
    //       useNativeDriver: false,
    //     }),
    //     Animated.delay(3000),
    //     Animated.timing(positionY, {
    //       toValue: 0,
    //       useNativeDriver: false,
    //     }),
    //   ]),
    //   Animated.spring(pan.y, {
    //     toValue: 0,
    //     friction: 5,
    //     useNativeDriver: false,
    //   }),
    // ]).start(() => {
    //   dispatch(removeMessage());
    // });

  //   Animated.spring(positionY, {
  //     toValue: 1,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     timeout.current = setTimeout(() => {
  //       Animated.timing(positionY, {
  //         toValue: 0,
  //         useNativeDriver: false,
  //       }).start();
  //       dispatch(removeMessage());
  //     }, 4000);
  //   });
  // };
  // useEffect(() => {
  //   message && showSnack();
  // }, [message]);
  // useEffect(() => {
  //   return () => {
  //     if (timeout.current) {
  //       Animated.timing(positionY, {
  //         toValue: 0,
  //         useNativeDriver: false,
  //       }).start();
  //       clearTimeout(timeout.current);
  //     }
  //   };
  // }, []);

  // const resetSnackbarPosition = () => {
  //   Animated.spring(pan.y, {
  //     toValue: 0,
  //     friction: 5,
  //     useNativeDriver: false,
  //   }).start();
  // };
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => false,
  //     onPanResponderMove: Animated.event([null, {dy: pan.y}], {
  //       useNativeDriver: false,
  //     }),
  //     onPanResponderRelease: (e, gesture) => {
  //       const {dy} = gesture;
  //       if (dy > 20) {
  //         Animated.timing(positionY, {
  //           toValue: 0,
  //           useNativeDriver: false,
  //         }).start();
  //         dispatch(removeMessage());
  //       } else {
  //         resetSnackbarPosition();
  //       }
  //     },
  //   }),
  // ).current;


  useEffect(() => {
    if (message?.text) {
      showSnackbar();
    } else {
      hideSnackbar();
    }
  }, [message?.text]);

  const showSnackbar = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        dispatch(removeMessage())
      }, 3000);
    });
  };

  const hideSnackbar = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => false,
  //   onPanResponderMove: Animated.event([null, { dy: pan.y }], {
  //     useNativeDriver: false,
  //   }),
  //   onPanResponderRelease: (_, gestureState) => {
  //     if (gestureState.dy > 50) {
  //       hideSnackbar();
  //     } else {
  //       showSnackbar();
  //     }
  //   },
  // });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        const {dy} = gesture;
        if (dy > 20) {
          // Animated.timing(positionY, {
          //   toValue: 0,
          //   useNativeDriver: false,
          // }).start();
          // dispatch(removeMessage());
        } else {
          // resetSnackbarPosition();
        }
      },
    }),
  ).current;

  const interpolatedAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 60],
  });


  // if (!message) return null;

  return (
    //   <SafeAreaView style={styles.safeArea}>
    <Animated.View
      style={[
        styles.container,
        {
          //   transform: [{translateY}],
          transform: pan.getTranslateTransform(),
          bottom: interpolatedAnimation,
          // bottom: translateY,
        },
      ]}
      {...panResponder.panHandlers}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{message?.text}</Text>
    </Animated.View>
    //   </SafeAreaView>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'orange',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'orange',
    height: 50,
    position: 'absolute',
    // width: '100%',
    bottom: 60,
    zIndex: 800,
    marginHorizontal: 20,
    left: 0,
    right: 0,
    borderRadius: 10,
  },
  title: {color: 'white', fontWeight: 'bold'},
  description: {color: 'white'},
});
