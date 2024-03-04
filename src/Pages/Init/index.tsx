import AnimateBackBox from '../../Components/AnimateBackBox';
import React, {useContext, useEffect} from 'react';
import {UserInfoContext} from '../../Context/UserInfo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Init() {
  const {setToken, setQQ} = useContext(UserInfoContext);
  const navigation = useNavigation<any>();
  useEffect(() => {
    async function getToken() {
      const token = (await AsyncStorage.getItem('ZL_APP_TOKEN')) || '';
      const qq = (await AsyncStorage.getItem('ZL_APP_QQ')) || '';
      setToken(token);
      setQQ(() => qq);
      if (token && qq) {
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
      }
    }
    getToken();
  }, []);
  return <AnimateBackBox></AnimateBackBox>;
}
