import React, {useContext, useState} from 'react';
import {Box, Button, Image, Input, Text, Toast, View} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchRequestAddContact} from '@/apis/contact';
import {UserInfoContext} from '@/Context/UserInfo';

interface TUserList {
  userName: string;
  userImg: string;
  qq: string;
  sex: string;
  desc: string;
}

export default function Verify() {
  const [verifyInfo, setVerifyInfo] = useState<string>();
  const [fromRemark, setFromRemark] = useState<string>();
  const {userInfo} = useContext(UserInfoContext);
  const route = useRoute<
    RouteProp<
      {
        Verify: TUserList;
      },
      'Verify'
    >
  >();
  const {mutateAsync: addContact} = fetchRequestAddContact();
  const navigation = useNavigation<any>();
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
          value={verifyInfo}
          onChangeText={e => setVerifyInfo(e)}
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
          value={fromRemark}
          onChangeText={e => setFromRemark(e)}
        />
        <Text fontSize={'lg'}>备注：</Text>
      </Box>
      <View className="absolute bottom-12 flex flex-row justify-center w-full">
        <Button
          className="w-4/5"
          onPress={async () => {
            await addContact({
              from: userInfo.qq,
              target: route.params.qq,
              verifyInfo:
                verifyInfo || `${route.params.userName}申请添加你为好友`,
              status: 0,
              fromRemark,
            });
            Toast.show({description: '发起好友申请成功', duration: 1000});
            navigation.navigate('Search');
          }}>
          提交
        </Button>
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
