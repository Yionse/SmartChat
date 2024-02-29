import React from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider, Text} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Login';
import Home from './src/Home';

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
