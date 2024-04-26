import React, {useContext, useEffect, useMemo} from 'react';
import {Box, Image, Pressable, ScrollView, Text, View} from 'native-base';
import {RefreshControl, StyleSheet} from 'react-native';
import {useGetContactList, getVerifyList} from '@/apis/contact';
import {UserInfoContext} from '@/Context/UserInfo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {TContact} from '@/apis/types';
import AntDesign from 'react-native-vector-icons/AntDesign';

function User({item}: {item: TContact}) {
  const navigation = useNavigation<any>();
  const {userInfo} = item;
  const {qq, userName, signature, sex, userImg} = userInfo || {};
  return (
    <Pressable>
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
            <Text ml={2}>{item?.remark || userName}</Text>
          </Box>
          <Text>{signature}</Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default function Contact() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const {userInfo} = useContext(UserInfoContext);
  const styles = StyleSheet.create({
    contact: {
      height: 50,
      lineHeight: 50,
      fontSize: 18,
      backgroundColor: '#fff',
    },
  });
  const {data: verifyList, refetch} = getVerifyList(userInfo.qq);
  const {
    data: contactList,
    refetch: refetchContact,
    isLoading,
  } = useGetContactList(userInfo.qq);
  const verifyListLength = useMemo(
    () =>
      verifyList?.filter(
        verify => verify.target === userInfo.qq && verify.status === 0,
      ).length || 0,
    [verifyList],
  );
  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchContact();
    }
  }, [isFocused]);

  const refreshControl = (
    <RefreshControl
      refreshing={isLoading}
      onRefresh={() => {
        refetchContact();
        refetch();
      }}
    />
  );
  return (
    <ScrollView height={'full'} refreshControl={refreshControl}>
      <Pressable onPress={() => navigation.navigate('ContactManagement')}>
        <View position={'relative'} mt={2}>
          <Text style={styles.contact} pl={4}>
            好友申请
          </Text>
          {verifyListLength > 0 && (
            <Text
              style={{
                width: 30,
                height: 30,
                lineHeight: 30,
                backgroundColor: 'red',
                textAlign: 'center',
                marginTop: 10,
              }}
              position={'absolute'}
              right={4}
              borderRadius={'lg'}
              color={'white'}>
              {verifyListLength}
            </Text>
          )}
        </View>
      </Pressable>
      <Box mt={2}>
        <Text pl={4}>我的好友</Text>
      </Box>
      {contactList?.map(item => (
        <User key={item?.userInfo?.qq} item={item} />
      ))}
    </ScrollView>
  );
}
