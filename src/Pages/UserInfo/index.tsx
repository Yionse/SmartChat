import React, {useContext, useRef, useState} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Input,
  Radio,
  Text,
  Toast,
  View,
} from 'native-base';
import {UserInfoContext} from '@/Context/UserInfo';
import {styles} from '../SetUserInfo';
import {fetchUpdateUserInfo, getHobbyList, getUserInfo} from '@/apis/login';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {Pressable} from 'react-native';
import FlatButton from '@/Components/FlatButton';

export default function UserInfo() {
  const {data: hobbyList} = getHobbyList();
  const {userInfo, setUserInfo} = useContext(UserInfoContext);
  const [nickname, setNickname] = useState(userInfo.userName);
  const [gender, setGender] = useState(userInfo.sex);
  const [signature, setSignature] = useState(userInfo.signature);
  const [hobbies, setHobbies] = useState<any>(userInfo.hobbyList.split('-'));
  const {mutateAsync} = fetchUpdateUserInfo();
  const {mutateAsync: getUser} = getUserInfo();
  const navigation = useNavigation<any>();

  const [selectedImage, setSelectedImage] = useState(null);
  // const selectImage = () => {
  //   ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
  //     console.log(response, '123123');
  //     if (!response.didCancel) {
  //       // 处理选择图片后的逻辑
  //       console.log('Selected image URI:', response.assets);
  //     }
  //   });
  // };

  // const uploadImage = async (uri: any) => {
  //   const formData = new FormData();
  //   formData.append('photo', {
  //     uri,
  //     name: 'photo.jpg',
  //     type: 'image/jpeg',
  //   });
  // };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          padding: 10,
          display: 'flex',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {/* <Pressable
          onPress={Toast.show({
            description: '暂无支持修改头像',
            duration: 1000,
          })}> */}
        <Image
          source={{uri: userInfo.userImg}}
          size={'sm'}
          borderRadius={'full'}
          alt="头像"
        />
        {/* </Pressable> */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>昵称:</Text>
          <Input
            placeholder="昵称"
            value={nickname}
            onChangeText={setNickname}
            width={'70%'}
            height={'40px'}
            flex={1}
            ml={8}
            maxLength={10}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>性别:</Text>
          <Radio.Group
            name="gender"
            defaultValue={gender}
            width={'70%'}
            flex={1}
            ml={8}
            display={'flex'}
            flexDirection={'row'}
            height={'40px'}
            paddingTop={'10px'}
            onChange={e => setGender(e)}>
            <Radio value="女" colorScheme={'pink'}>
              女
            </Radio>
            <Radio value="男" colorScheme={'blue'} ml={4}>
              男
            </Radio>
          </Radio.Group>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>个性签名:</Text>
          <Input
            placeholder="个性签名"
            value={signature}
            onChangeText={setSignature}
            width={'70%'}
            height={'40px'}
            maxLength={20}
            flex={1}
            ml={8}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>爱好：</Text>
          <Checkbox.Group
            onChange={setHobbies}
            value={hobbies}
            accessibilityLabel="选择爱好"
            display={'flex'}
            flexDirection={'row'}
            style={{
              flexWrap: 'wrap',
            }}>
            {hobbyList?.hobbyList.map(item => (
              <Checkbox mx={4} value={item.name} key={item.id}>
                {item.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </View>
        <Button
          my={8}
          onPress={async () => {
            if (nickname.length > 6) {
              Toast.show({description: '昵称不能超过6个字符', duration: 1000});
              return;
            }
            await mutateAsync({
              userImg: userInfo.userImg,
              userName: nickname,
              sex: gender,
              hobbyList: hobbies.join('-') as any,
              location: userInfo.location,
              signature,
              qq: userInfo.qq,
            });
            const res = await getUser(userInfo.qq);
            setUserInfo(res.userInfo);
            Toast.show({description: '修改成功', duration: 1000});
            navigation.goBack();
          }}>
          <Text>提交</Text>
        </Button>
      </View>
    </View>
  );
}
