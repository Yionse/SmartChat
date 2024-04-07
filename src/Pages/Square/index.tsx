import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import {useFetchPersonalForum} from '@/apis/forum';
import {UserInfoContext} from '@/Context/UserInfo';
import moment from 'moment';

export default function Square() {
  const {userInfo} = useContext(UserInfoContext);
  const {data} = useFetchPersonalForum() || [];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <ScrollView height="full" py={4} zIndex={9999}>
        {data?.map(item => {
          return (
            <Pressable onPress={() => setIsOpen(true)}>
              <Box
                style={{
                  borderStyle: 'solid',
                  borderColor: '#fff',
                  borderBottomWidth: 1,
                }}
                my={2}
                px={2}>
                <View display={'flex'} flexDirection={'row'}>
                  <Image
                    source={{uri: item.userInfo?.userImg}}
                    width={10}
                    height={10}
                    borderRadius={'full'}
                  />
                  <Box mx={2} />
                  <Text fontSize={'xl'}>{item.userInfo?.userName}</Text>
                </View>
                <Text fontSize={'2xl'}>{item.content}</Text>
                <Text textAlign={'right'} color={'#ccc'}>
                  {moment(Number(item.createTime)).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </ScrollView>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <Modal.Content>
          <Modal.Header>发布评论</Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button>Save</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
