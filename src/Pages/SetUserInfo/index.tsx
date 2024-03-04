import {Text, View} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import AnimateBackBox from '../../Components/AnimateBackBox';

export default function SetUserInfo() {
  const boxHeight = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    titleText: {
      height: 60,
      lineHeight: 60,
      fontSize: 30,
    },
  });
  const startAnimation = () => {
    Animated.timing(boxHeight, {
      toValue: 90, // 40% of the container height
      duration: 1800, // Animation duration in milliseconds
      easing: Easing.bounce, // Easing function (optional)
      useNativeDriver: false, // Set to true for better performance (requires useNativeDriver-compatible properties)
    }).start();
  };
  useEffect(() => {
    startAnimation();
  }, []);
  return (
    <AnimateBackBox>
      <Animated.View
        style={{
          width: '100%',
          height: boxHeight.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#fff',
        }}>
        <Text style={styles.titleText} marginLeft={30} color={'black'}>
          Set Personal Information
        </Text>
        <View
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}></View>
      </Animated.View>
    </AnimateBackBox>
  );
}
