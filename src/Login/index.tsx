import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Input, Text, Toast, View} from 'native-base';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimateBackBox from '../Components/AnimateBackBox';
import {fetchSendCode} from '../apis/login';

export default function Login() {
  const [user, setUser] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isDisabledCodeBtn, setIDisabledCodeBtn] = useState(false);
  const [count, setCount] = useState(59);
  const btnTimer = useRef<null>();
  const {} = fetchSendCode();
  const styles = StyleSheet.create({
    titleText: {
      height: 60,
      lineHeight: 60,
      fontSize: 30,
    },
  });

  useEffect(() => {
    return () => clearInterval(btnTimer.current as any);
  }, []);

  const codeBtnHandle = () => {
    setIDisabledCodeBtn(true);
    clearInterval(btnTimer.current as any);
    btnTimer.current = setInterval(() => {
      setCount(countDown => countDown - 1);
    }, 1000) as any;
  };

  useEffect(() => {
    if (count < 1) {
      setCount(60);
      setIDisabledCodeBtn(false);
      clearInterval(btnTimer.current as any);
    }
  }, [count]);

  const loginHandle = () => {
    const regex = /^\d+$/;
    if (regex.test(user) && regex.test(code) && code.length === 6) {
      console.log(user, code);
    } else {
      Toast.show({
        description: '请输入合法的QQ或验证码',
      });
    }
  };

  return (
    <AnimateBackBox>
      <Text style={styles.titleText} marginLeft={18} color="white">
        Welcome to{' '}
      </Text>
      <Text style={styles.titleText} marginLeft={30} color="white">
        智聊 App{' '}
      </Text>
      <Box
        style={{
          width: '100%',
          height: '45%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.titleText} marginLeft={30} color={'black'}>
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
      </Box>
    </AnimateBackBox>
  );
}
