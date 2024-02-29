import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'native-base';

export default function Home() {
  const navigation = useNavigation();
  return (
    <>
      <Text>主页</Text>
      <Button onPress={() => navigation.navigate('Login' as never)}>
        去Login
      </Button>
    </>
  );
}
