import React, {useContext} from 'react';
import {Image, Text, View} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';

export default function DrawerContent() {
  const {userInfo} = useContext(UserInfoContext);
  return (
    <View display={'flex'} flexDirection={'column'} flex={1} pt={2}>
      <View
        position={'relative'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        height={'60px'}
        zIndex={2}>
        <Image
          source={{uri: userInfo.userImg}}
          width={20}
          height={20}
          borderRadius={'full'}
          alt="头像"
        />
        <Text position={'absolute'} right={8} bottom={0}>
          IP:{userInfo.location}
        </Text>
      </View>
      <View
        flex={1}
        background={'#eee'}
        style={{borderTopLeftRadius: 32, borderTopRightRadius: 32}}
        pt={6}>
        <Text fontSize={'2xl'} textAlign={'center'}>
          {userInfo.userName}
        </Text>
      </View>
    </View>
  );
}
