import React from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider, Text} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Login';
import Home from './src/Home';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserInfoProvide} from './src/Context/UserInfo';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function Main() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <UserInfoProvide>
      <NativeBaseProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <Main />
          </QueryClientProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserInfoProvide>
  );
};
export default App;
