import React, {useContext} from 'react';
import {Image, Spacer, Text, View} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';

function getRadomColors() {
  const colors: string[] = [];
  const color: string[] = [
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'error',
    'success',
    'info',
  ];
  const degree: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  color.forEach(colorItem => {
    degree.forEach(degreeItem => {
      colors.push(colorItem + '.' + degreeItem);
    });
  });
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

export default function DrawerContent() {
  const {userInfo} = useContext(UserInfoContext);
  return (
    <View
      display={'flex'}
      flexDirection={'column'}
      flex={1}
      pt={60}
      position={'relative'}>
      <View
        flex={1}
        background={'#eee'}
        style={{borderTopLeftRadius: 32, borderTopRightRadius: 32}}
        py={8}>
        <Text fontSize={'2xl'} textAlign={'center'}>
          {userInfo.userName}
        </Text>
        <View px={4}>
          <View display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            <Text fontSize={'xl'}>
              {userInfo.signature}阿达阿萨德阿达阿萨德阿萨德阿达是的阿是大声道啊
            </Text>
            {userInfo.hobbyList.split('-').map(item => (
              <Text
                p={1}
                px={4}
                bg={getRadomColors()}
                m={1}
                color={'white'}
                borderRadius={12}
                key={item}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View px={4}>
          <Text>设备信息</Text>
        </View>
        <Spacer flex={1} />
        <View px={4}>
          <Text>设置区域</Text>
        </View>
      </View>
      <View
        position={'absolute'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        top={0}
        zIndex={2}
        width={'100%'}>
        <View p={2} bg={'white'} borderRadius={'full'}>
          <Image
            source={{uri: userInfo.userImg}}
            width={20}
            height={20}
            borderRadius={'full'}
            alt="头像"
          />
        </View>
        <Text fontSize={'xs'} position={'absolute'} right={4} bottom={10}>
          IP:{userInfo.location}
        </Text>
      </View>
    </View>
  );
}
