import {View} from 'native-base';
import React from 'react';

export default function FlatButton({children}: {children: React.ReactNode}) {
  return (
    <View className="absolute bottom-12 flex flex-row justify-center w-full ">
      {children}
    </View>
  );
}
