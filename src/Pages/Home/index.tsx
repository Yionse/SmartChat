import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'native-base';
import {UserInfoContext} from '../../Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation<any>();
  const {qq, token, setQQ, setToken} = useContext(UserInfoContext);
  return (
    <>
      <Text>主页</Text>
      <Button onPress={() => navigation.navigate('Login')}>去Login</Button>
      <Button
        onPress={async () => {
          setToken('');
          setQQ('');
          await AsyncStorage.setItem('ZL_APP_QQ', '');
          await AsyncStorage.setItem('ZL_APP_TOKEN', '');
        }}>
        清除token
      </Button>
      <Text>{token}111</Text>
      <Text>{qq}222</Text>
    </>
  );
}
