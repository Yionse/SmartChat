import React from 'react';
import {Image, Text, View} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {FlatList, Pressable} from 'react-native';
import {TMessageList, messagesStore} from '@/Store/messages';
import moment from 'moment';

const computedTime = (time: number) => {
  const dayOfStartData = moment().startOf('days');
  const sendMsgData = moment(time).startOf('hours');
  let timeStr = moment(time).format('MM/DD HH:mm');

  // 消息的发送时间，和今天零点之间的差距
  const diff = sendMsgData.diff(dayOfStartData, 'hour');

  // console.log(sendMsgData.format('YYYY-MM-DD HH:mm:ss'));
  // console.log(dayOfStartData.format('YYYY-MM-DD HH:mm:ss'));

  // console.log(sendMsgData.diff(dayOfStartData, 'hour'), 'diff');
  // console.log(diff);

  // console.log(-24 - moment().hours());

  if (diff >= 0) {
    timeStr = moment(time).format('HH:mm');
  } else if (diff > -24) {
    //  发送的时间小于今天0点，大于昨天0点
    timeStr = '昨天';
  }
  return timeStr;
};

export default function Message() {
  const navigation = useNavigation<any>();
  const renderItem = ({item}: {item: TMessageList}) => {
    return (
      <>
        <Pressable
          onPress={() => navigation.navigate('DialogMessage', {user: item.qq})}>
          <View
            className="flex flex-row p-1 items-center"
            style={{
              borderBottomColor: '#ccc',
              borderStyle: 'solid',
              borderBottomWidth: 1,
            }}>
            <Image
              source={{uri: item.userInfo.userImg}}
              width={12}
              height={12}
              borderRadius={'full'}
            />
            <View className="flex flex-col ml-4  w-1/2 ">
              <Text>{item.userInfo.userName}</Text>
              <Text fontSize={'xs'} color={'gray.400'}>
                {item.lastMessage.length > 13
                  ? item.lastMessage.slice(0, 13) + '...'
                  : item.lastMessage}
              </Text>
            </View>
            <Text className="ml-2 w-20 text-right">
              {computedTime(Number(item.lastMessageTime))}
            </Text>
            {item.unreadCount > 0 && (
              <Text
                className="ml-4 w-6 h-5 text-center bg-red-500 rounded-full"
                color="white">
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            )}
          </View>
        </Pressable>
      </>
    );
  };
  return (
    <>
      <FlatList
        data={messagesStore.contactList}
        renderItem={renderItem}
        className="mt-2"
      />
    </>
  );
}
