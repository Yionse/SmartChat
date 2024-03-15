import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'native-base';
import {
  getBaseOs,
  getBatteryLevel,
  getBrand,
  getCarrier,
  getDeviceName,
  getFreeDiskStorage,
  getManufacturer,
} from 'react-native-device-info';
import {styles} from '@/Components/DrawerContent';
import {getIpLocation} from '@/apis/login';
import {transform} from '@/apis/utils';

export default function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<any>();
  useEffect(() => {
    async function init() {
      const location = await getIpLocation();
      setDeviceInfo({
        baseOs: (await getBaseOs()) || '未知',
        batteryLevel: (await getBatteryLevel()) * 100 || '未知',
        brand: getBrand() || '未知',
        carrier: (await getCarrier()) || '未知',
        deviceName: (await getDeviceName()) || '未知',
        diskStorage: (await getFreeDiskStorage()) || 0,
        ip: location?.query,
        position: await transform({
          query: `${location?.country} ${location?.regionName} ${location.city}`,
          isTranslateEnglish: false,
          isNotLocation: false,
        }),
        manufacturer: (await getManufacturer()) || '未知',
      });
    }
    init();
  }, []);
  return (
    <ScrollView height={'full'} py={4} px={2}>
      <Text style={styles.menuTitle}>当前系统：{deviceInfo?.baseOs}</Text>
      <Text style={styles.menuTitle}>当前IP：{deviceInfo?.ip}</Text>
      <Text style={styles.menuTitle}>当前位置：{deviceInfo?.position}</Text>
      <Text style={styles.menuTitle}>当前品牌：{deviceInfo?.brand}</Text>
      <Text style={styles.menuTitle}>当前电量：{deviceInfo?.batteryLevel}</Text>
      <Text style={styles.menuTitle}>当前运营商：{deviceInfo?.carrier}</Text>
      <Text style={styles.menuTitle}>
        设备制造商：{deviceInfo?.manufactrer}
      </Text>
      <ScrollView
        width={'100%'}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // 隐藏垂直滚动条
      >
        <Text style={styles.menuTitle}>
          当前设备名称：{deviceInfo?.deviceName}
        </Text>
      </ScrollView>
      <Text style={styles.menuTitle}>
        当前设备存储空间剩余：
        {deviceInfo?.diskStorage !== 0
          ? (deviceInfo?.diskStorage / 1000 / 1000 / 1000).toFixed(2) + 'GB'
          : '未知'}
      </Text>
    </ScrollView>
  );
}
