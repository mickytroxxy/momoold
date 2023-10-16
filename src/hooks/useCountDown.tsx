import {useCallback, useEffect, useRef, useState} from 'react';
import BackgroundTimer from 'react-native-background-timer';

type useCountdownPropType = {
  callback: () => void;
  duration: number;
};

function useCountdown({callback, duration}: useCountdownPropType) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(duration);
  // const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  const start = useCallback(() => {
    setTime(v => duration);
    if (!isRunning) {
      BackgroundTimer.start();
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 300);
      }, 300);
      setIsRunning(true);
    }
  }, [isRunning]);

  const stop = useCallback(async () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      BackgroundTimer.stop();
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    BackgroundTimer.stop();
    setIsRunning(false);
    setTime(duration);
    // setTime(0);
  }, []);

  useEffect(() => {
    return () => {
      BackgroundTimer.stop();
    };
  }, []);

  useEffect(() => {
    if (time - 300 <= 0) {
      setTime(0);
      // if (time === 0) {
      stop();
      callback();
    }
  }, [time]);

  const formattedTime = () => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {start, stop, reset, formattedTime, time};
}

export default useCountdown;

//   const formattedTime = useMemo(() => {
//     const minutes = Math.floor(time / 60000)
//       .toString()
//       .padStart(2, '0');
//     const seconds = Math.floor((time % 60000) / 1000)
//       .toString()
//       .padStart(2, '0');
//     return `${minutes}:${seconds}`;
//   }, [time]);
