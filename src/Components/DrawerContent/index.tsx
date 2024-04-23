import React, {useContext} from 'react';
import {Image, Pressable, Spacer, Text, View} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {getRadomColors} from '@/utils/getRadomColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const styles = StyleSheet.create({
  menuTitle: {
    width: '100%',
    height: 40,
    lineHeight: 40,
    fontSize: 22,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});

export default function DrawerContent() {
  const navigation = useNavigation<any>();
  const {userInfo, setUserInfo} = useContext(UserInfoContext);

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
          <AntDesign
            name={userInfo.sex === '男' ? 'man' : 'woman'}
            color={userInfo.sex === '男' ? 'blue' : 'pink'}
            size={22}
          />
          {userInfo.userName}
        </Text>
        <Text fontSize={'xl'} px={4}>
          {userInfo.signature}
        </Text>
        <View px={4} mb={4}>
          <View display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            {userInfo?.hobbyList?.split('-')?.map(item => (
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
        <Pressable
          onPress={() => navigation.navigate('UserInfo')}
          _pressed={{bg: 'primary.100'}}>
          <View px={4}>
            <Text style={styles.menuTitle}>修改资料</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('DeviceInfo')}
          _pressed={{bg: 'primary.100'}}>
          <View px={4}>
            <Text style={styles.menuTitle}>设备信息</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={async () => {
            await AsyncStorage.setItem('ZL_APP_TOKEN', '');
            setUserInfo({} as any);
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}
          _pressed={{bg: 'primary.100'}}>
          <View px={4}>
            <Text style={styles.menuTitle}>退出登录</Text>
          </View>
        </Pressable>
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
          <Pressable onPress={() => navigation.navigate('Center')}>
            <Image
              source={{uri: userInfo.userImg}}
              width={20}
              height={20}
              borderRadius={'full'}
              alt="头像"
            />
          </Pressable>
        </View>
        <Text fontSize={'xs'} position={'absolute'} right={4} bottom={10}>
          IP:{userInfo.location}
        </Text>
      </View>
    </View>
  );
}
