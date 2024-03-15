import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabHome from '../TabHome';
import DeviceInfo from '../DeviceInfo';
import DrawerContent from '@/Components/DrawerContent';
import {Text, View} from 'native-base';
import TabHeader from '@/Components/TabHeader';
import {Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserInfo from '../UserInfo';

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="TabHome"
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="TabHome" component={TabHome} />
      <Drawer.Screen
        name="DeviceInfo"
        component={DeviceInfo}
        options={{
          header({navigation}) {
            return (
              <TabHeader
                title="设备信息"
                leftElement={
                  <View flex={1} paddingTop={'12px'}>
                    <Pressable onPress={() => navigation.goBack()}>
                      <AntDesign name="arrowleft" size={26} />
                    </Pressable>
                  </View>
                }
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          header({navigation}) {
            return (
              <TabHeader
                title="个人资料"
                leftElement={
                  <View flex={1} paddingTop={'12px'}>
                    <Pressable onPress={() => navigation.goBack()}>
                      <AntDesign name="arrowleft" size={26} />
                    </Pressable>
                  </View>
                }
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
