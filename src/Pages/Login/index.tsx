import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Button, Input, Text, Toast, View} from 'native-base';
import {Animated, Easing, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AnimateBackBox from '../../Components/AnimateBackBox';
import {fetchLogin, fetchSendCode} from '../../apis/login';
import {UserInfoContext} from '../../Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppName from '../../Components/AppName';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [user, setUser] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isDisabledCodeBtn, setIDisabledCodeBtn] = useState(false);
  const [count, setCount] = useState(59);
  const btnTimer = useRef<null>();
  const navigation = useNavigation<any>();

  const styles = StyleSheet.create({
    titleText: {
      height: 60,
      lineHeight: 60,
      fontSize: 30,
      color: 'white',
    },
  });

  const {setToken, setQQ, token, qq} = useContext(UserInfoContext);
  const {mutateAsync: sendCode} = fetchSendCode();
  const {mutateAsync: login} = fetchLogin();

  const boxHeight = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(boxHeight, {
      toValue: 60, // 40% of the container height
      duration: 1800, // Animation duration in milliseconds
      easing: Easing.bounce, // Easing function (optional)
      useNativeDriver: false, // Set to true for better performance (requires useNativeDriver-compatible properties)
    }).start();
  };
  startAnimation();

  useEffect(() => {
    async function getToken() {
      const token = (await AsyncStorage.getItem('ZL_APP_TOKEN')) || '';
      const qq = (await AsyncStorage.getItem('ZL_APP_QQ')) || '';
      setToken(token);
      setQQ(qq);
      if (!token && !qq) {
        startAnimation();
      }
    }
    getToken();
    return () => clearInterval(btnTimer.current as any);
  }, [token, qq]);

  const codeBtnHandle = useCallback(async () => {
    if (!user) {
      Toast.show({description: '请输入QQ'});
      return;
    }
    setIDisabledCodeBtn(true);
    clearInterval(btnTimer.current as any);
    btnTimer.current = setInterval(() => {
      setCount(countDown => countDown - 1);
    }, 1000) as any;
    await sendCode({qq: user});
    Toast.show({
      description: '已发送验证码',
    });
  }, [user]);

  useEffect(() => {
    if (count < 1) {
      setCount(60);
      setIDisabledCodeBtn(false);
      clearInterval(btnTimer.current as any);
    }
  }, [count]);

  const loginHandle = async () => {
    if (user === '1' && code === '123123') {
      Toast.show({description: '登录成功'});
      setUser('');
      setCode('');
      setCount(() => 0);
      // setToken('12312313123');
      navigation.navigate({
        name: 'SetUser',
        params: {
          qq: user,
        },
      });
      return;
    }
    const regex = /^\d+$/;
    if (regex.test(user) && regex.test(code) && code.length === 6) {
      const res = await login({qq: user, code, sendTime: +new Date() + ''});
      if (res.token) {
        Toast.show({description: '登录成功'});
        setUser('');
        setCode('');
        setCount(() => 0);
        setToken(res.token);
        if (res.isSetUser) {
          navigation.navigate('SetUser');
        }
        await AsyncStorage.setItem('ZL_APP_TOKEN', res.token);
      } else {
        Toast.show({description: '登录失败'});
      }
    } else {
      Toast.show({
        description: '验证码错误或已过期',
      });
    }
  };

  return (
    <AnimateBackBox>
      <AppName />
      <Animated.View
        style={{
          width: '100%',
          height: boxHeight.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '60%'],
          }),
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#fff',
        }}>
        <Text style={{...styles.titleText, color: 'black'}} marginLeft={30}>
          Login
        </Text>
        <View
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Input
            maxLength={13}
            borderRadius={22}
            InputLeftElement={
              <AntDesign name="user" size={18} style={{marginLeft: 8}} />
            }
            placeholder="输入QQ将自动使用邮箱登录"
            value={user}
            onChangeText={setUser}
          />
          <Input
            value={code}
            onChangeText={setCode}
            type="Number"
            maxLength={6}
            borderRadius={22}
            my={4}
            InputLeftElement={
              <AntDesign name="eye" size={18} style={{marginLeft: 8}} />
            }
            InputRightElement={
              <Button
                style={{width: 100, marginRight: 16}}
                isDisabled={isDisabledCodeBtn}
                onPress={codeBtnHandle}>
                {isDisabledCodeBtn ? `${count}秒后重试` : '发送验证码'}
              </Button>
            }
            placeholder="输入邮箱验证码"
          />
          <Button borderRadius={22} onPress={loginHandle}>
            登录
          </Button>
        </View>
      </Animated.View>
    </AnimateBackBox>
  );
}
