import React, {useContext} from 'react';
import {Text} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';

export default function DrawerContent() {
  const {userInfo} = useContext(UserInfoContext);
  console.log(userInfo);
  return <Text>{userInfo.userName}</Text>;
}
