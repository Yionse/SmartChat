import React, {useContext, useEffect} from 'react';
import {Button, Image, Pressable, ScrollView, Text, View} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {getRadomColors} from '@/utils/getRadomColors';
import {getFetchPersonalForum} from '@/apis/forum';
import FlatButton from '@/Components/FlatButton';

export default function UserCenter() {
  const navigation = useNavigation<any>();
  const route = useRoute<
    RouteProp<
      {
        user: {user?: string};
      },
      'user'
    >
  >();
  let {userInfo} = useContext(UserInfoContext);
  const {data} = getFetchPersonalForum(userInfo.qq);
  return (
    <View flex={1} className=" bg-white pt-16 relative ">
      <ScrollView
        flex={1}
        className="bg-gray-200 p-8"
        style={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}>
        <Text fontSize={'2xl'} textAlign={'center'}>
          <AntDesign
            name={userInfo.sex === '男' ? 'man' : 'woman'}
            color={userInfo.sex === '男' ? 'blue' : 'pink'}
            size={22}
          />
          {userInfo.userName}
        </Text>
        <Text fontSize={'xl'} px={4}>
          {userInfo.signature}
        </Text>
        <View px={4} mb={2}>
          <View display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            {userInfo?.hobbyList?.split('-')?.map(item => (
              <Text
                p={1}
                px={4}
                bg={getRadomColors()}
                m={1}
                color={'white'}
                borderRadius={12}
                key={item}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View>
          <Text>发布的论坛：</Text>
          {data?.slice(0, 5)?.map(item => (
            <Text
              pl={4}
              key={item.id}
              my={2}
              fontSize={'lg'}
              style={{borderBottomWidth: 2, borderColor: '#eee'}}>
              {item.content}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View
        position={'absolute'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        top={0}
        zIndex={2}
        width={'100%'}
        px={4}>
        <Pressable onPress={() => navigation.goBack()} mt={-10}>
          <AntDesign name="arrowleft" size={26} />
        </Pressable>
        <View p={2} bg={'white'} borderRadius={'full'}>
          <Image
            source={{uri: userInfo.userImg}}
            width={20}
            height={20}
            borderRadius={'full'}
            alt="头像"
          />
        </View>
        <Text fontSize={'xs'}>IP:{userInfo.location}</Text>
      </View>
      <FlatButton>
        {/* 不传用户名，说明是自己看自己主页，显示修改资料按钮 */}
        {!route.params?.user && (
          <Button
            className="w-4/5"
            onPress={() => navigation.navigate('UserInfo')}>
            修改资料
          </Button>
        )}
        {/* 可能还会有 加为好友 - 发送消息 俩按钮 */}
      </FlatButton>
    </View>
  );
}
