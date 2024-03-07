import React, {useCallback, useContext, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, PanResponder} from 'react-native';
import {View} from 'native-base';
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
  const swipeDistance = useRef<number>(0);
  const swipeStartDistance = useRef<number>(0);
  const [drawerLeftDistance, setDrawerLeftDistance] = useState<number>(0);
  const drawerMove = useCallback(
    (x: number) => {
      setDrawerLeftDistance(
        prevDistance => prevDistance + x - swipeDistance.current,
      );
    },
    [drawerLeftDistance],
  );
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          gestureState.dx > 30 &&
          Math.abs(gestureState.dy) < 10 &&
          gestureState.vx > 0
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        if (swipeDistance.current === 0) {
          swipeStartDistance.current = gestureState.dx;
        }
        // 处理右滑动作的逻辑
        drawerMove(gestureState.dx);
        // setDrawerLeftDistance(
        //   () => drawerLeftDistance + (gestureState.dx - swipeDistance.current),
        // );
        swipeDistance.current = gestureState.dx;
      },
      onPanResponderEnd: () => {
        if (swipeDistance.current - swipeStartDistance.current > 200) {
          setDrawerLeftDistance(300);
        } else {
          setDrawerLeftDistance(0);
          swipeDistance.current = 0;
          swipeStartDistance.current = 0;
        }
      },
    }),
  ).current;
  return (
    <>
      <View
        flex={1}
        {...panResponder.panHandlers}
        position={'relative'}
        // 奇怪-必须要设置background才可以覆盖住下面的Tab
        background={'blue.100'}>
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
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [
            {translateX: -Dimensions.get('window').width + drawerLeftDistance},
          ],
          width: '100%',
          height: Dimensions.get('window').height,
          backgroundColor: 'skyblue',
        }}></View>
    </>
  );
}
