import React, {useContext, useState} from 'react';
import {Button, ScrollView, TextArea, Toast} from 'native-base';
import {fetchCreateForumChat} from '@/apis/forum';
import {UserInfoContext} from '@/Context/UserInfo';
import {useNavigation} from '@react-navigation/native';

export default function Forum() {
  const {userInfo} = useContext(UserInfoContext);
  const [content, setContent] = useState<string>('');
  const {mutateAsync, isLoading} = fetchCreateForumChat();
  const navigation = useNavigation<any>();
  return (
    <ScrollView height="full" px={2}>
      <TextArea
        h={80}
        placeholder="输入内容"
        value={content}
        onChangeText={e => setContent(e)}
      />
      <Button
        mt={4}
        isLoading={isLoading}
        disabled={!content}
        onPress={async () => {
          if (isLoading) {
            Toast.show({description: '当前正在发布中', duration: 1000});
            return;
          }
          await mutateAsync({
            user: userInfo.qq,
            content,
            createTime: +new Date() + '',
          });
          Toast.show({description: '发布成功', duration: 1000});
          navigation.goBack();
        }}>
        发布
      </Button>
    </ScrollView>
  );
}
