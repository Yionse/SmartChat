import React from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider, Pressable, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Login from '@/Pages/Login';
import {UserInfoProvide} from '@/Context/UserInfo';
import SetUserInfo from '@/Pages/SetUserInfo';
import DeviceInfo from '@/Pages/DeviceInfo';
import TabHeader from '@/Components/TabHeader';
import UserInfo from '@/Pages/UserInfo';
import Forum from '@/Pages/Forum';
import Search from '@/Pages/Search';
import Append from '@/Pages/Append';
import ContactManagement from '@/Pages/ContactManagement';
import TabHome from '@/Pages/TabHome';
import UserCenter from '@/Pages/UserCenter';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetUser"
        component={SetUserInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
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
      <Stack.Screen
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
      <Stack.Screen
        name="Forum"
        component={Forum}
        options={{
          header({navigation}) {
            return (
              <TabHeader
                title="发表"
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
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Center"
        component={UserCenter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Append"
        component={Append}
        options={{
          header({navigation}) {
            return (
              <TabHeader
                title="添加好友"
                leftElement={
                  <View flex={1} paddingTop={'12px'}>
                    <Pressable
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <AntDesign name="arrowleft" size={26} />
                    </Pressable>
                  </View>
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ContactManagement"
        component={ContactManagement}
        options={{
          header({navigation}) {
            return (
              <TabHeader
                title="申请列表"
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
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <UserInfoProvide>
            <Main />
          </UserInfoProvide>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
