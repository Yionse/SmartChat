import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabHome from '../TabHome';
import DeviceInfo from '../DeviceInfo';
import DrawerContent from '@/Components/DrawerContent';
import {View} from 'native-base';
import TabHeader from '@/Components/TabHeader';
import {Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserInfo from '../UserInfo';
import Forum from '../Forum';
import {useNavigation} from '@react-navigation/native';
import {fetchUpdateUserInfo, getIpLocation} from '@/apis/login';
import {getChineseRegionName} from '@/utils/getChineseRegionName';
import {UserInfoContext} from '@/Context/UserInfo';
import Search from '../Search';

const Drawer = createDrawerNavigator();

export default function Home() {
  const navigation = useNavigation<any>();
  const {userInfo, setUserInfo} = useContext(UserInfoContext);
  const {mutateAsync} = fetchUpdateUserInfo();
  useEffect(() => {
    async function initLocation() {
      const location = await getIpLocation();
      const params = {
        ...userInfo,
        location: getChineseRegionName(location.regionName),
      };
      await mutateAsync(params);
      setUserInfo(params);
    }
    initLocation();
  }, []);
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
      <Drawer.Screen
        name="Forum"
        component={Forum}
        options={{
          header() {
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
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          unmountOnBlur: true,
          // header() {
          //   return (
          //     <TabHeader
          //       title="搜搜用户"
          //       leftElement={
          //         <View flex={1} paddingTop={'12px'}>
          //           <Pressable onPress={() => navigation.goBack()}>
          //             <AntDesign name="arrowleft" size={26} />
          //           </Pressable>
          //         </View>
          //       }
          //     />
          //   );
          // },
        }}
      />
    </Drawer.Navigator>
  );
}
