import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function AnimateBackBox(props: any) {
  const [locations, setLocations] = useState<number[]>([0.1, 0.9]);
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const timer = useRef<null>();
  (() => {
    clearInterval(timer.current as any);
    timer.current = setInterval(() => {
      let [x, y] = locations;
      if (isAdd) {
        x += 0.01;
        y -= 0.01;
        if (x >= 0.41) {
          setIsAdd(false);
        }
      } else {
        x -= 0.01;
        y += 0.01;
        if (x <= 0.1) {
          setIsAdd(true);
        }
      }
      setLocations(() => [x, y]);
    }, 150) as any;
  })();
  useEffect(() => {
    return () => clearInterval(timer.current as any);
  }, []);
  return (
    <LinearGradient
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
      colors={['#cffafe', '#22d3ee']}
      locations={locations}
      start={{x: 0.99, y: 0}}
      end={{x: 0, y: 0.99}}>
      {props.children}
    </LinearGradient>
  );
}
