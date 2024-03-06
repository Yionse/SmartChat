import {Image, View, Input, Text, Radio, Button} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import AnimateBackBox from '../../Components/AnimateBackBox';
import {RouteProp, useRoute} from '@react-navigation/native';

export default function SetUserInfo() {
  const [gender, setGender] = useState('');
  const [signature, setSignature] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const boxHeight = useRef(new Animated.Value(0)).current;
  const route = useRoute<RouteProp<{params: {qq: string}}>>();
  const [nickname, setNickname] = useState(route.params.qq || '');
  const styles = StyleSheet.create({
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
    // 处理表单提交，例如验证和发送数据
    // ...
    // 你可以导航到下一个屏幕或根据需要进行处理
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
              flex={1}
              ml={8}
            />
          </View>
        </View>
        <Button onPress={handleSubmit} my={8} mx={4} borderRadius={'full'}>
          <Text>提交</Text>
        </Button>
      </Animated.View>
    </AnimateBackBox>
  );
}
