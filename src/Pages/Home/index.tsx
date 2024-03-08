import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabHome from '../TabHome';
import Info from '../Info';
import {Text} from 'native-base';

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="TabHome"
      drawerContent={() => <Text>1</Text>}>
      <Drawer.Screen name="TabHome" component={TabHome} />
      <Drawer.Screen name="Info" component={Info} />
    </Drawer.Navigator>
  );
}
