import React, {useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import Login from './src/Pages/Login';
import Home from './src/Pages/Home';
import {UserInfoContext, UserInfoProvide} from './src/Context/UserInfo';
import SetUserInfo from './src/Pages/SetUserInfo';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function Main() {
  const {token, qq} = useContext(UserInfoContext);
  const navigation = useNavigation<any>();
  useEffect(() => {
    if (!token && !qq) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [token, qq]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SetUser" component={SetUserInfo} />
      <Stack.Screen name="Home" component={Home} />
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
