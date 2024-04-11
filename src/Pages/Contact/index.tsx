import React from 'react';
import {Pressable, ScrollView, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';

export default function Contact() {
  const styles = StyleSheet.create({
    contact: {
      height: 50,
      lineHeight: 50,
      fontSize: 18,
      backgroundColor: '#fff',
    },
  });
  return (
    <ScrollView height={'full'}>
      <Pressable>
        <View position={'relative'} mt={2}>
          <Text style={styles.contact} pl={4}>
            好友申请
          </Text>
          <Text
            style={{
              width: 30,
              height: 30,
              lineHeight: 30,
              backgroundColor: 'red',
              textAlign: 'center',
              marginTop: 10,
            }}
            position={'absolute'}
            right={4}
            borderRadius={'lg'}
            color={'white'}>
            1
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}
