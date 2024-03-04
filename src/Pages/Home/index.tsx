import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'native-base';
import {UserInfoContext} from '../../Context/UserInfo';

export default function Home() {
  const navigation = useNavigation<any>();
  const {qq, token} = useContext(UserInfoContext);

  return (
    <>
      <Text>主页</Text>
      <Button onPress={() => navigation.navigate('Login')}>去Login</Button>
      <Text>{token}111</Text>
      <Text>{qq}222</Text>
    </>
  );
}
