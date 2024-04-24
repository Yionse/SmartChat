import React, {useContext, useEffect, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image, Pressable, View, useTheme} from 'native-base';
import TabHeader from '../../Components/TabHeader';
import Contact from '../Contact';
import Square from '../Square';
import Message from '../Message';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {DrawerLayoutAndroid} from 'react-native';
import {UserInfoContext} from '@/Context/UserInfo';
import {fetchUpdateUserInfo, getIpLocation} from '@/apis/login';
import {getChineseRegionName} from '@/utils/getChineseRegionName';
import DrawerContent from '@/Components/DrawerContent';
import {fetchContactList} from '@/apis/contact';

const Tab = createBottomTabNavigator();

export default function TabHome() {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const drawerRef = useRef<any>(null);
  const {userInfo, setUserInfo} = useContext(UserInfoContext);

  const {mutateAsync} = fetchUpdateUserInfo();
  const {data} = fetchContactList(userInfo.qq);
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
  }, [data]);
  return (
    <>
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerPosition="left"
        drawerWidth={300}
        renderNavigationView={() => <DrawerContent />}>
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
            component={() => <Message drawerRef={drawerRef} />}
            options={{
              header() {
                return (
                  <TabHeader
                    title="消息"
                    leftElement={
                      <Pressable onPress={() => drawerRef.current.openDrawer()}>
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
                    // rightElement={
                    //   <View
                    //     flex={1}
                    //     display={'flex'}
                    //     flexDirection={'row'}
                    //     justifyContent={'flex-end'}
                    //     paddingTop={'8px'}>
                    //     <AntDesign
                    //       name="search1"
                    //       size={30}
                    //       color={colors.primary[200]}
                    //     />
                    //   </View>
                    // }
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
                        <Pressable
                          onPress={() => navigation.navigate('Search')}>
                          <AntDesign
                            name="adduser"
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
          <Tab.Screen
            name="square"
            component={Square}
            options={{
              unmountOnBlur: true,
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
      </DrawerLayoutAndroid>
    </>
  );
}
