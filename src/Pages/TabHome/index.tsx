import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image, Pressable, Text, View, useTheme} from 'native-base';
import TabHeader from '../../Components/TabHeader';
import Contact from '../Contact';
import Square from '../Square';
import Message from '../Message';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TabHome() {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  return (
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
        tabBarLabelStyle: {
          fontSize: 12, // Adjust the fontSize of the tabBar labels
        },
        tabBarLabel: () => null,
        // tabBarActiveTintColor: '#0891b2',
        // tabBarInactiveTintColor: 'gray',
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
                  <Pressable onPress={() => navigation.openDrawer()}>
                    <Image
                      source={{
                        uri: `https://q1.qlogo.cn/g?b=qq&nk=${2458015575}&s=5`,
                      }}
                      borderRadius={'full'}
                      alt="头像"
                      width={'40px'}
                      height={'40px'}
                      marginTop={'5px'}
                    />
                  </Pressable>
                }
                rightElement={
                  <View
                    flex={1}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    paddingTop={'8px'}>
                    <AntDesign
                      name="search1"
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
                title="论坛"
                rightElement={
                  <View
                    flex={1}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    paddingTop={'8px'}>
                    <Pressable onPress={() => navigation.navigate('Forum')}>
                      <AntDesign
                        name="addfile"
                        size={30}
                        color={colors.primary[200]}
                      />
                    </Pressable>
                  </View>
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
