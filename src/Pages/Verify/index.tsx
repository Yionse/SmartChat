import React from 'react';
import {Box, Button, Image, Input, Text, View} from 'native-base';
import {RouteProp, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {transform} from 'lodash';

interface TUserList {
  userName: string;
  userImg: string;
  qq: string;
  sex: string;
  desc: string;
}

export default function Verify() {
  const route = useRoute<
    RouteProp<
      {
        Verify: TUserList;
      },
      'Verify'
    >
  >();
  return (
    <View flex={1} position={'relative'}>
      <UserList info={route.params} />
      <Box className="flex flex-row items-center bg-white mt-2 p-4">
        <Text fontSize={'lg'} width={24} textAlign={'right'}>
          验证消息：
        </Text>
        <Input
          mr={24}
          placeholder="请输入验证消息"
          pl={4}
          variant={'underlined'}
        />
      </Box>
      <Box className="flex flex-row items-center bg-white mt-2 p-4">
        <Text fontSize={'lg'} width={24} textAlign={'right'}>
          备注：
        </Text>
        <Input
          mr={24}
          placeholder="请输入对方的备注"
          pl={4}
          variant={'underlined'}
        />
        <Text fontSize={'lg'}>备注：</Text>
      </Box>
      <View className="absolute bottom-12 flex flex-row justify-center w-full">
        <Button className="w-4/5">提交</Button>
      </View>
    </View>
  );
}

export function UserList({info}: {info: TUserList}) {
  const {userName, userImg, sex, qq, desc} = info;
  return (
    <Box className="flex flex-row items-center bg-white" mt={2} p={2}>
      <Image
        source={{uri: userImg}}
        width={16}
        height={16}
        borderRadius={'full'}
        alt="头像"
      />
      <Box ml={4}>
        <Box className="flex flex-row">
          <AntDesign
            name={sex === '男' ? 'man' : 'woman'}
            color={sex === '男' ? 'blue' : 'pink'}
            size={16}
          />
          <Text ml={2}>
            {qq}({userName})
          </Text>
        </Box>
        <Text>{desc}</Text>
      </Box>
    </Box>
  );
}
