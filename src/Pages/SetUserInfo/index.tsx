import {
  Image,
  View,
  Input,
  Text,
  Radio,
  Button,
  Checkbox,
  Toast,
} from 'native-base';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import AnimateBackBox from '@/Components/AnimateBackBox';
import {fetchSetUserInfo, getHobbyList, getIpLocation} from '@/apis/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getChineseRegionName} from '@/utils/getChineseRegionName';
import {TUserInfo} from '@/apis/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {UserInfoContext} from '@/Context/UserInfo';

export const styles = StyleSheet.create({
  titleText: {
    height: 60,
    lineHeight: 60,
    fontSize: 30,
  },
  formTitle: {
    fontSize: 24,
    height: 40,
    lineHeight: 40,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default function SetUserInfo() {
  const {setUserInfo: setUserInfoContext} = useContext(UserInfoContext);
  const [gender, setGender] = useState('女');
  const [signature, setSignature] = useState('');
  const [hobbies, setHobbies] = useState<any>([]);
  const route = useRoute<RouteProp<{params: {qq: string; token: string}}>>();
  const boxHeight = useRef(new Animated.Value(0)).current;
  const [nickname, setNickname] = useState(route.params?.qq || '');
  const navigation = useNavigation<any>();
  const {data: hobbyList} = getHobbyList();
  const {mutateAsync: setUserInfo} = fetchSetUserInfo();

  const startAnimation = () => {
    Animated.timing(boxHeight, {
      toValue: 90,
      duration: 1800,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    startAnimation();
  }, []);
  const handleSubmit = async () => {
    if (nickname && gender && hobbies.length !== 0) {
      if (nickname.length > 6) {
        Toast.show({description: '昵称不能超过6个字符', duration: 1000});
        return;
      }
      const locationInfo = await getIpLocation();
      const params: TUserInfo = {
        qq: route.params?.qq,
        userImg: `https://q1.qlogo.cn/g?b=qq&nk=2458015575&s=5`,
        userName: nickname,
        sex: gender,
        hobbyList: hobbies.join('-') as any,
        location: getChineseRegionName(locationInfo?.regionName),
        signature,
      };
      const res = await setUserInfo(params);
      if (res.isSuccess) {
        setUserInfoContext(params);
        await AsyncStorage.setItem('ZL_APP_TOKEN', route.params.token);
        navigation.reset({
          route: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        Toast.show({description: '网络错误', duration: 2000});
      }
    } else {
      Toast.show({description: '请填入信息', duration: 1000});
    }
  };
  return (
    <AnimateBackBox>
      <Animated.View
        style={{
          width: '100%',
          height: boxHeight.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#fff',
        }}>
        <Text style={styles.titleText} marginLeft={30} color={'black'}>
          Set Personal Information
        </Text>
        <View
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Image
            source={{uri: `https://q1.qlogo.cn/g?b=qq&nk=2458015575&s=5`}}
            size={'sm'}
            borderRadius={'full'}
            alt="头像"
          />
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>昵称:</Text>
            <Input
              placeholder="昵称"
              value={nickname}
              onChangeText={setNickname}
              width={'70%'}
              height={'40px'}
              flex={1}
              ml={8}
              maxLength={10}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>性别:</Text>
            <Radio.Group
              name="gender"
              defaultValue="女"
              width={'70%'}
              flex={1}
              ml={8}
              display={'flex'}
              flexDirection={'row'}
              height={'40px'}
              paddingTop={'10px'}
              onChange={e => setGender(e)}>
              <Radio value="女" colorScheme={'pink'}>
                女
              </Radio>
              <Radio value="男" colorScheme={'blue'} ml={4}>
                男
              </Radio>
            </Radio.Group>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>个性签名:</Text>
            <Input
              placeholder="个性签名"
              value={signature}
              onChangeText={setSignature}
              width={'70%'}
              height={'40px'}
              maxLength={20}
              flex={1}
              ml={8}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>爱好：</Text>
            <Checkbox.Group
              onChange={setHobbies}
              value={hobbies}
              accessibilityLabel="选择爱好"
              display={'flex'}
              flexDirection={'row'}
              style={{
                flexWrap: 'wrap',
              }}>
              {hobbyList?.hobbyList.map(item => (
                <Checkbox mx={4} value={item.name} key={item.id}>
                  {item.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </View>
          <Button onPress={handleSubmit} my={8} borderRadius={'full'}>
            <Text>提交</Text>
          </Button>
        </View>
      </Animated.View>
    </AnimateBackBox>
  );
}
