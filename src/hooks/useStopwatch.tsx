import React, {useState, useRef, useEffect} from 'react';
import {Animated} from 'react-native';

type useStopwatchPropType = {
  callback: () => void;
  duration: number;
};
type useStopwatchType = [() => void, () => void, () => void, () => string];

function useStopwatch({callback, duration}: useStopwatchPropType) {
  const [isRunning, setIsRunning] = useState(false);

  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  const start = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(timer => timer + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (time === duration) {
      callback();
      stop();
    }
  }, [time, duration, callback]);

  const formattedTime = () => {
    // const minutes = Math.floor((time / 60000) % 60)
    //   .toString()
    //   .padStart(2, '0');
    // const seconds = Math.floor((time / 1000) % 60)
    //   .toString()
    //   .padStart(2, '0');
    // const milliseconds = Math.floor((time % 1000) / 10)
    //   .toString()
    //   .padStart(2, '0');

    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    // const milliseconds = Math.floor((time % 1000) / 10)
    //   .toString()
    //   .padStart(2, '0');
    return `${minutes}:${seconds}`;
    // return `${minutes}:${seconds}.${milliseconds}`;
  };

  return {start, stop, reset, formattedTime};
}

export default useStopwatch;
