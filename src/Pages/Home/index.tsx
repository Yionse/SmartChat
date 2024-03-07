import React, {useCallback, useContext, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, PanResponder} from 'react-native';
import {Image, Text, View, useTheme} from 'native-base';
import {UserInfoContext} from '../../Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Message from '../Message';
import Contact from '../Contact';
import Square from '../Square';
import TabHeader from '../../Components/TabHeader';
import {TabKeyProvide} from '../../Context/TabKey';

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
  const {colors} = useTheme();
  return (
    <TabKeyProvide>
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
              return (
                <AntDesign
                  name={iconName}
                  size={size}
                  color={focused ? colors.primary[300] : colors.primary[900]}
                />
              );
            },
            tabBarItemStyle: ({focused}: any) => {
              return {
                height: 60,
                borderTopColor: focused ? '#0891b2' : 'transparent',
                borderTopWidth: focused ? 2 : 0,
              };
            },
            tabBarLabelStyle: {
              fontSize: 12, // Adjust the fontSize of the tabBar labels
            },
            tabBarLabel: () => null,
            tabBarActiveTintColor: '#0891b2',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="message"
            component={Message}
            options={{
              header() {
                return (
                  <TabHeader
                    title="消息"
                    leftElement={
                      <View position={'relative'} flex={1}>
                        <Image
                          source={{
                            uri: `https://q1.qlogo.cn/g?b=qq&nk=${2458015575}&s=5`,
                          }}
                          borderRadius={'full'}
                          alt="头像"
                          width={'40px'}
                          height={'40px'}
                          position={'absolute'}
                          left={1}
                          marginTop={'5px'}
                        />
                      </View>
                    }
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="contact"
            component={Contact}
            options={{
              header() {
                return (
                  <TabHeader
                    title="联系人"
                    rightElement={
                      <View
                        flex={1}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'flex-end'}
                        paddingTop={'8px'}>
                        <AntDesign
                          name="adduser"
                          size={30}
                          color={colors.primary[200]}
                        />
                      </View>
                    }
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="square"
            component={Square}
            options={{
              header() {
                return (
                  <TabHeader
                    title="广场"
                    rightElement={
                      <View
                        flex={1}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'flex-end'}
                        paddingTop={'8px'}>
                        <AntDesign
                          name="addfile"
                          size={30}
                          color={colors.primary[200]}
                        />
                      </View>
                    }
                  />
                );
              },
            }}
          />
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
    </TabKeyProvide>
  );
}
