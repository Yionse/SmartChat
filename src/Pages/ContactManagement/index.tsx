import React, {useContext, useMemo} from 'react';
import {Button, ScrollView, Text} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';
import {getVerifyList} from '@/apis/contact';
import {UserList} from '../Append';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const buttonMap = (
  qq: string,
  status: number,
  current: string,
  navigation: any,
  user?: any,
): React.ReactElement => {
  if (user) {
    console.log(user);
  }
  if (qq === current) {
    // 是我发出的请求
    return <Text>{status === 0 ? '待同意' : '被拒绝'}</Text>;
  } else {
    // 不是我发出的
    if (status === 0) {
      // 待验证
      return (
        <Button
          onPress={() =>
            navigation.navigate('Append', {
              userName: user.userName,
              userImg: user.userImg,
              qq: user.qq,
              sex: user.sex,
              signature: user.signature,
              isVerify: true,
            })
          }>
          验证
        </Button>
      );
    } else {
      // 已决绝
      return <Text>已拒绝</Text>;
    }
  }
};

export default function ContactManagement() {
  const {userInfo} = useContext(UserInfoContext);
  const {data: verifyList, isLoading, refetch} = getVerifyList(userInfo.qq);
  const navigation = useNavigation<any>();
  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }>
      <Text className="m-1">我发出的</Text>
      {verifyList
        ?.filter(item => item.from === userInfo.qq)
        ?.map(verify => {
          return (
            <UserList
              info={
                {
                  ...verify.userInfo,
                  signature: `我：${verify.verifyInfo}`,
                } as any
              }
              rightElement={buttonMap(
                verify.from,
                verify.status,
                userInfo.qq,
                navigation,
              )}
            />
          );
        })}
      <Text className="m-1">我接收的</Text>
      {verifyList
        ?.filter(item => item.target === userInfo.qq)
        ?.map(verify => {
          return (
            <UserList
              info={
                {
                  ...verify.userInfo,
                  signature: `消息：${verify.verifyInfo}`,
                } as any
              }
              rightElement={
                buttonMap(verify.from, verify.status, userInfo.qq, navigation, {
                  ...verify.userInfo,
                  signature: verify.verifyInfo || '',
                }) as any
              }
            />
          );
        })}
    </ScrollView>
  );
}