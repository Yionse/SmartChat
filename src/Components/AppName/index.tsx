import React from 'react';
import {Text} from 'native-base';
import {StyleSheet} from 'react-native';

export default function AppName() {
  const styles = StyleSheet.create({
    titleText: {
      height: 60,
      lineHeight: 60,
      fontSize: 30,
      color: 'white',
    },
  });
  return (
    <>
      <Text style={styles.titleText} marginLeft={18}>
        Welcome to{' '}
      </Text>
      <Text style={styles.titleText} marginLeft={30}>
        智聊 App{' '}
      </Text>
    </>
  );
}
