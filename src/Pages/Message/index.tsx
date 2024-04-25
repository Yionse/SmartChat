import React, {useRef, useState} from 'react';
import {Button, Drawer, Pressable, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import DrawerContent from '@/Components/DrawerContent';

export default function Message() {
  const navigation = useNavigation<any>();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <>
      <Pressable onPress={() => setIsOpenDrawer(true)}>
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
