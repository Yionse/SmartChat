import React, {useContext, useEffect, useMemo} from 'react';
import {Pressable, ScrollView, Text, View} from 'native-base';
import {RefreshControl, StyleSheet} from 'react-native';
import {getContactList, getVerifyList} from '@/apis/contact';
import {UserInfoContext} from '@/Context/UserInfo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {TContact} from '@/apis/types';

function User({item}: {item: TContact}) {}

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
  } = getContactList(userInfo.qq);
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
    <RefreshControl refreshing={isLoading} onRefresh={refetchContact} />
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
    </ScrollView>
  );
}
