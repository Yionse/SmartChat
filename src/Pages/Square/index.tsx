import React, {useContext, useRef, useState} from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  Toast,
  View,
  useTheme,
} from 'native-base';
import {fetchCommentForum, useFetchPersonalForum} from '@/apis/forum';
import {UserInfoContext} from '@/Context/UserInfo';
import moment from 'moment';

export default function Square() {
  const {userInfo} = useContext(UserInfoContext);
  const {data, refetch} = useFetchPersonalForum() || [];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const currentForum = useRef<number>();
  const {mutateAsync, isLoading} = fetchCommentForum();
  const {colors} = useTheme();
  return (
    <>
      <ScrollView height="full" zIndex={9999}>
        {data?.map(item => {
          return (
            <Box
              style={{
                borderStyle: 'solid',
                borderColor: '#fff',
                borderBottomWidth: 1,
              }}
              my={2}
              px={2}
              key={item.id}>
              <Pressable
                onPress={() => {
                  currentForum.current = item.id;
                  setIsOpen(true);
                }}>
                <View display={'flex'} flexDirection={'row'}>
                  <Image
                    source={{uri: item?.userImg}}
                    width={10}
                    height={10}
                    borderRadius={'full'}
                    alt={item.user}
                  />
                  <Box mx={2} />
                  <Text fontSize={'xl'}>{item?.userName}</Text>
                </View>
                <Text fontSize={'2xl'}>{item.content}</Text>
                <Text textAlign={'right'} color={'#ccc'}>
                  {moment(Number(item.createTime)).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}
                </Text>
              </Pressable>
              {item?.commentList?.map(comment => {
                return (
                  <View
                    display={'flex'}
                    flexDirection={'row'}
                    my={1}
                    key={comment.id}>
                    <Image
                      source={{uri: comment.userImg}}
                      borderRadius="full"
                      style={{width: 20, height: 20}}
                    />
                    <Box mx={1} />
                    <Text>
                      <Text color={colors.primary[600]}>
                        {comment.userName}
                      </Text>
                      :{comment.commentContent}
                    </Text>
                  </View>
                );
              })}
            </Box>
          );
        })}
      </ScrollView>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setComment('');
        }}
        size="lg">
        <Modal.Content>
          <Modal.Header>发布评论</Modal.Header>
          <Modal.Body>
            <Input value={comment} onChangeText={e => setComment(e)} max={80} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={async () => {
                await mutateAsync({
                  userId: Number(userInfo.qq),
                  forumId: currentForum.current!,
                  commentContent: comment,
                  commentTime: +new Date() + '',
                });
                Toast.show({description: '发布成功', duration: 1000});
                await refetch();
                setComment('');
                setIsOpen(false);
              }}
              isLoading={isLoading}>
              发布
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
