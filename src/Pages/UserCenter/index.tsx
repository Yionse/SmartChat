import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import {Button, Image, Pressable, ScrollView, Text, View} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {getRadomColors} from '@/utils/getRadomColors';
import {getFetchPersonalForum} from '@/apis/forum';
import FlatButton from '@/Components/FlatButton';
import {getUserInfo, useGetContactList} from '@/apis/contact';

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
  const {userInfo: me} = useContext(UserInfoContext);
  const {data: userInfo} = getUserInfo(route.params?.user || me.qq);
  const {data: forumData, refetch} = getFetchPersonalForum(
    route.params?.user || me.qq,
  );
  const {data: personalList} = useGetContactList(me.qq);
  const isContact = useMemo(() => {
    return personalList?.some(item => item.userInfo?.qq === userInfo?.qq);
  }, [personalList]);
  useEffect(() => {
    refetch();
  }, [route.params?.user]);
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
            name={userInfo?.sex === '男' ? 'man' : 'woman'}
            color={userInfo?.sex === '男' ? 'blue' : 'pink'}
            size={22}
          />
          {userInfo?.userName}
        </Text>
        <Text fontSize={'lg'} px={4}>
          QQ：{userInfo?.qq}
        </Text>
        <Text fontSize={'lg'} px={4}>
          个性签名：{userInfo?.signature}
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
          {forumData?.slice(0, 5)?.map(item => (
            <Text
              pl={4}
              key={item.id}
              my={2}
              fontSize={'lg'}
              style={{borderBottomWidth: 2, borderColor: '#eee'}}>
              {item.content}
            </Text>
          ))}
          {forumData?.length === 0 && <Text>暂无</Text>}
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
            source={{uri: userInfo?.userImg}}
            width={20}
            height={20}
            borderRadius={'full'}
            alt="头像"
          />
        </View>
        <Text fontSize={'xs'}>IP:{userInfo?.location}</Text>
      </View>
      <FlatButton>
        <Button
          className="w-4/5"
          onPress={() => {
            if (!route?.params?.user) {
              navigation.navigate('UserInfo');
            } else if (isContact) {
              console.log('去消息页面');
            } else {
              navigation.navigate('Append', {
                ...userInfo,
              });
            }
          }}>
          {/* 还有去验证的情况 */}
          {!route?.params?.user
            ? '编辑信息'
            : isContact
            ? '发送消息'
            : '加为好友'}
        </Button>
      </FlatButton>
    </View>
  );
}
