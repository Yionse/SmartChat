import React, {useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider, Toast} from 'native-base';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import Login from './src/Pages/Login';
import Home from './src/Pages/Home';
import {UserInfoContext, UserInfoProvide} from './src/Context/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchVerifyToken} from './src/apis/login';
import SetUserInfo from './src/Pages/SetUserInfo';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function Main() {
  const {status, setStatus, setUserInfo} = useContext(UserInfoContext);
  const navigation = useNavigation<any>();
  const {mutateAsync: verify} = fetchVerifyToken();

  useEffect(() => {
    async function init() {
      const token = (await AsyncStorage.getItem('ZL_APP_TOKEN')) as any;
      // 验证token
      const res = await verify({token});
      if (res.userInfo.hobbyList) {
        setStatus('Home');
        setUserInfo(res.userInfo);
      } else {
        Toast.show({description: '登录已失效'});
        setStatus('Login');
      }
    }
    init();
  }, []);

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{name: status}],
    });
  }, [status]);

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
