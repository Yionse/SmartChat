import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import {UserInfoContext} from '../../Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Message() {
  const navigation = useNavigation<any>();
  return (
    <>
      <Text>信息</Text>
      <Button
        onPress={async () => {
          await AsyncStorage.setItem('ZL_APP_TOKEN', '');
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }}>
        去登录
      </Button>
    </>
  );
}
