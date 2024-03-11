import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import {UserInfoContext} from '../../Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Message() {
  const {setToken, setStatus} = useContext(UserInfoContext);
  return (
    <>
      <Text>信息</Text>
      <Button onPress={async () => setStatus('SetUser')}>去个人信息</Button>
      <Button
        onPress={async () => {
          setToken('');
          await AsyncStorage.setItem('ZL_APP_TOKEN', '');
          setStatus('Login');
        }}>
        去登录
      </Button>
    </>
  );
}
