import React from 'react';
import {Text, View} from 'native-base';

export default function TabHeader({
  title,
  rightElement,
  leftElement,
}: {
  title: string;
  rightElement?: Element;
  leftElement?: Element;
}) {
  return (
    <View
      position={'relative'}
      display={'flex'}
      flexDirection={'row'}
      backgroundColor={'#ffffff'}
      height={'50px'}
      lineHeight={'50px'}
      px={4}>
      <View width={'20%'}>{leftElement}</View>
      <View width={'60%'} flex={1}>
        <Text
          textAlign={'center'}
          height={'50px'}
          lineHeight={'50px'}
          fontSize={'xl'}>
          {title}
        </Text>
      </View>
      <View width={'20%'}>{rightElement}</View>
    </View>
  );
}
