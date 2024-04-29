import React, {useEffect, useState} from 'react';
import {Box, Button, FlatList, Input, Pressable, Text, View} from 'native-base';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TabHeader from '@/Components/TabHeader';
import {messagesStore} from '@/Store/messages';
import {observer} from 'mobx-react-lite';

function DialogMessage() {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const [value, setValue] = useState<string>();
  const route =
    useRoute<
      RouteProp<
        {info: {user: string; userImg: string; userName: string}},
        'info'
      >
    >();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
      if (e.data.action.type === 'GO_BACK') {
        navigation.navigate('message');
      }
    });
    return unsubscribe;
  }, [navigation]);
  const messages = messagesStore.getCurrentContextMsg(route.params?.user);
  const currentChatContext = messagesStore.getCurrentChatContext(
    route.params?.user,
  );
  const renderItem = ({item}: {item: any}) => {
    return <Text>{item?.message}</Text>;
  };

  const sendMsgHandle = () => {
    messagesStore.sendMessage(value || '', route.params?.user);
    setValue('');
  };
  return (
    <Box className="flex flex-col h-full">
      <TabHeader
        title={currentChatContext?.userInfo?.userName}
        leftElement={
          <View flex={1} paddingTop={'12px'}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={26} />
            </Pressable>
          </View>
        }
        rightElement={
          <View
            flex={1}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
            paddingTop={'8px'}>
            <Pressable>
              <AntDesign name="bars" size={30} color={colors.primary[200]} />
            </Pressable>
          </View>
        }
      />
      <FlatList data={messages} renderItem={renderItem} />
      <View className="flex flex-row px-1">
        <Input flex={1} value={value} onChangeText={e => setValue(e)} />
        <Button className="w-20 ml-1" onPress={sendMsgHandle}>
          发送
        </Button>
      </View>
    </Box>
  );
}

export default observer(DialogMessage);
