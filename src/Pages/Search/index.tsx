import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  Toast,
  View,
} from 'native-base';
import {fetchSearchUser, getRecommendContact} from '@/apis/contact';
import {UserInfoContext} from '@/Context/UserInfo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import {getRadomColors} from '@/utils/getRadomColors';
import {TContactList} from '@/apis/types';
import _ from 'lodash';

function UserListSearch({users}: {users: TContactList[]}) {
  const navigation = useNavigation<any>();
  const [colorsRef, setColorsRef] = useState<string[][]>([]);
  useEffect(() => {
    if (colorsRef.length > 0) {
      return;
    }
    const twoArr: string[][] = [];
    users.forEach(user => {
      const oneArr: string[] = [];
      const length = user?.hobbyList?.split('-')?.length;
      for (let i = 0; i < length; i++) {
        oneArr.push(getRadomColors());
      }
      twoArr.push(oneArr);
    });
    setColorsRef(twoArr);
  }, [users]);
  return (
    <>
      {users?.map((user, index) => (
        <Pressable
          onPress={() => navigation.navigate('Center', {user: user.qq})}>
          <View
            my={1}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            p={1}
            key={user.qq}
            style={{
              borderBottomWidth: 1,
              borderStyle: 'solid',
            }}>
            <Image
              source={{uri: user.userImg}}
              width={12}
              height={12}
              borderRadius={'full'}
              alt="用户头像"
            />
            <View mx={1}>
              <Text>
                {user?.userName} &nbsp;&nbsp;&nbsp;ip:{user.location}
              </Text>
              <View display={'flex'} flexDirection={'row'}>
                {user?.hobbyList
                  ?.split('-')
                  .slice(0, 3)
                  ?.map((hobby: string, twoIndex: number) => (
                    <Text
                      key={hobby}
                      bg={colorsRef?.[index]?.[twoIndex]}
                      mx={1}
                      p={1}
                      borderRadius={'xl'}
                      color="black">
                      {hobby}
                    </Text>
                  ))}
                {user?.hobbyList?.split('-').length > 3 && <Text>...</Text>}
              </View>
            </View>
            {user?.isAdd.text === '去验证' || user?.isAdd.isAdd ? (
              <Button
                style={{height: 36, marginLeft: 'auto'}}
                onPress={() => {
                  navigation.navigate('Append', {
                    userName: user.userName,
                    userImg: user.userImg,
                    qq: user.qq,
                    sex: user.sex,
                    signature: user.signature,
                    isVerify: user.isAdd.text === '去验证' ? true : false,
                    id: user?.isAdd?.id,
                  });
                }}>
                {user.isAdd.text === '去验证' ? '去验证' : '添加'}
              </Button>
            ) : (
              <Text style={{marginLeft: 'auto'}}>
                {user?.isAdd?.text || ''}
              </Text>
            )}
          </View>
        </Pressable>
      ))}
    </>
  );
}

export default function Search() {
  const isFocused = useIsFocused();
  const [key, setKey] = useState<string>('');
  const [searchData, setSearchData] = useState<TContactList[]>([]);
  const navigation = useNavigation<any>();
  const styles = StyleSheet.create({
    headerHeight: {
      height: 40,
    },
  });
  const {userInfo} = useContext(UserInfoContext);
  const {data: recommendContact, refetch} = getRecommendContact({
    user: userInfo.qq,
  });
  const {mutateAsync, isLoading} = fetchSearchUser();
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  return (
    <ScrollView height={'full'}>
      <View display={'flex'} flexDirection={'row'} p={2} background={'white'}>
        <View
          style={styles.headerHeight}
          display={'flex'}
          justifyContent={'center'}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={26} />
          </Pressable>
        </View>
        <Input
          placeholder="请输入昵称或QQ"
          flex={1}
          borderRadius={'3xl'}
          style={styles.headerHeight}
          ml={4}
          value={key}
          onChangeText={e => setKey(e)}
          fontSize={12}
        />
        <Button
          borderRadius={'xl'}
          ml={4}
          px={4}
          style={styles.headerHeight}
          isLoading={isLoading}
          onPress={_.debounce(async () => {
            if (!key) {
              Toast.show({description: '请输入关键词', duration: 1000});
              return;
            }
            const res = await mutateAsync({key, from: userInfo.qq});
            setSearchData(res);
            if (res.length === 0) {
              Toast.show({
                description: '没找到用户，换个关键词试试吧',
                duration: 1000,
              });
            }
          }, 500)}>
          搜索
        </Button>
      </View>
      {isLoading && <Spinner />}
      {searchData?.length > 0 && (
        <View mt={2} px={2} py={4} background={'white'}>
          <Text mb={2}>搜索结果：</Text>
          <UserListSearch users={searchData} />
        </View>
      )}
      <View mt={2} px={2} py={4} background={'white'}>
        <Text mb={2}>根据您的爱好为您推荐如下联系人：</Text>
        <UserListSearch users={recommendContact || []} />
      </View>
    </ScrollView>
  );
}
