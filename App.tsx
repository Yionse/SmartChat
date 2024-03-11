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
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function Main() {
  const {qq, token, setToken, setQQ} = useContext(UserInfoContext);
  const navigation = useNavigation<any>();
  useEffect(() => {
    async function getLocalStorage() {
      const token = await AsyncStorage.getItem('ZL_APP_TOKEN');
      const qq = await AsyncStorage.getItem('ZL_APP_QQ');
      setQQ(qq!);
      setToken(token!);
    }
    getLocalStorage();
  }, []);
  useEffect(() => {
    if (token) {
      // 如果有token的话
      if (qq) {
        // 如果有QQ直接去Home
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'SetUser'}],
        });
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [qq, token]);

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
