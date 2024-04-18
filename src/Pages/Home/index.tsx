import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabHome from '../TabHome';
import DrawerContent from '@/Components/DrawerContent';
import {fetchUpdateUserInfo, getIpLocation} from '@/apis/login';
import {getChineseRegionName} from '@/utils/getChineseRegionName';
import {UserInfoContext} from '@/Context/UserInfo';

const Drawer = createDrawerNavigator();

export default function Home() {
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
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="TabHome" component={TabHome} />
    </Drawer.Navigator>
  );
}
