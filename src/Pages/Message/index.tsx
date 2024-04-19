import React, {useRef} from 'react';
import {Button, Pressable, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Message({drawerRef}: {drawerRef: any}) {
  const navigation = useNavigation<any>();
  return (
    <>
      <Pressable onPress={() => drawerRef?.current.openDrawer()}>
        <Text>信息</Text>
      </Pressable>
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
