import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'native-base';

export default function Login() {
  const navigation = useNavigation();
  return (
    <>
      <Text>登录</Text>
      <Button
        onPress={() => {
          navigation.navigate('Home' as never);
        }}>
        去Home
      </Button>
    </>
  );
}
