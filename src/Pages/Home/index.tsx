import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Drawer, Icon, Text} from 'native-base';
import {UserInfoContext} from '../../Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Message from '../Message';
import Contact from '../Contact';
import Square from '../Square';

const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation<any>();
  const {qq, token, setQQ, setToken} = useContext(UserInfoContext);
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = '';
            if (route.name === 'message') {
              iconName = 'message1';
            } else if (route.name === 'contact') {
              iconName = 'contacts';
            } else {
              iconName = 'cloudo';
            }
            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0891b2',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="message" component={Message} />
        <Tab.Screen name="contact" component={Contact} />
        <Tab.Screen name="square" component={Square} />
      </Tab.Navigator>
    </>
  );
}
