import React, {useContext, useState} from 'react';
import {Box, Button, Image, Input, Text, Toast, View} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchRequestAddContact, fetchUpdateContactStatus} from '@/apis/contact';
import {UserInfoContext} from '@/Context/UserInfo';
import {TUserInfo} from '@/apis/types';

export default function Append() {
  const [verifyInfo, setVerifyInfo] = useState<string>();
  const [fromRemark, setFromRemark] = useState<string>();
  const {userInfo} = useContext(UserInfoContext);
  const route = useRoute<
    RouteProp<
      {
        Append: TUserInfo & {isVerify?: boolean; id?: number};
      },
      'Append'
    >
  >();
  const {mutateAsync: addContact} = fetchRequestAddContact();
  const {mutateAsync: updateContactStatus} = fetchUpdateContactStatus();
  const navigation = useNavigation<any>();
  return (
    <View flex={1} position={'relative'}>
      <UserList info={route.params} />
      {!route.params?.isVerify && (
        <Box className="flex flex-row items-center bg-white mt-2 p-4">
          <Text fontSize={'lg'} width={24} textAlign={'right'}>
            验证理由：
          </Text>
          <Input
            mr={24}
            placeholder="请输入验证理由"
            pl={4}
            variant={'underlined'}
            value={verifyInfo}
            onChangeText={e => setVerifyInfo(e)}
          />
        </Box>
      )}
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
      </Box>
      <View className="absolute bottom-12 flex flex-row justify-center w-full">
        {route.params?.isVerify ? (
          <>
            <Button
              className="w-1/3"
              onPress={async () => {
                await updateContactStatus({
                  id: route.params.id!,
                  status: 1,
                  targetRemark: fromRemark,
                });
                Toast.show({description: '你们已成为好友', duration: 1000});
                navigation.goBack();
              }}>
              同意
            </Button>
            <Button
              colorScheme={'danger'}
              className="w-1/3 ml-4"
              onPress={async () => {
                await updateContactStatus({
                  id: route.params.id!,
                  status: -1,
                });
                Toast.show({description: '已拒绝该申请', duration: 1000});
                navigation.goBack();
              }}>
              拒绝
            </Button>
          </>
        ) : (
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
        )}
      </View>
    </View>
  );
}

export function UserList({
  info,
  rightElement,
}: {
  info: TUserInfo;
  rightElement?: React.ReactElement;
}) {
  const {userName, userImg, sex, qq, signature} = info;
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
        <Text>{signature}</Text>
      </Box>
      <View style={{marginLeft: 'auto'}}>{rightElement}</View>
    </Box>
  );
}
