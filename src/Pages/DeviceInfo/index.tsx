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

export default function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<any>();
  useEffect(() => {
    async function init() {
      const location = await getIpLocation();
      setDeviceInfo({
        baseOs: await getBaseOs(),
        batteryLevel: (await getBatteryLevel()) * 100,
        brand: getBrand(),
        carrier: await getCarrier(),
        deviceName: await getDeviceName(),
        diskStorage: (await getFreeDiskStorage()) || 0,
        ip: location?.query,
        position: `${location?.country} ${location?.regionName} ${location.city}`,
        manufacturer: await getManufacturer(),
      });
    }
    init();
  }, []);
  return (
    <ScrollView height={'full'} py={4} px={2}>
      <Text style={styles.menuTitle}>
        当前系统：{deviceInfo?.baseOs || '未知'}
      </Text>
      <Text style={styles.menuTitle}>当前IP：{deviceInfo?.ip || '未知'}</Text>
      <Text style={styles.menuTitle}>
        当前位置：{deviceInfo?.position || '未知'}
      </Text>
      <Text style={styles.menuTitle}>
        当前品牌：{deviceInfo?.brand || '未知'}
      </Text>
      <Text style={styles.menuTitle}>
        当前电量：{deviceInfo?.batteryLevel || '未知'}
      </Text>
      <Text style={styles.menuTitle}>
        当前运营商：{deviceInfo?.carrier || '未知'}
      </Text>
      <Text style={styles.menuTitle}>
        设备制造商：{deviceInfo?.manufacturer || '未知'}
      </Text>
      <ScrollView
        width={'100%'}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // 隐藏垂直滚动条
      >
        <Text style={styles.menuTitle}>
          当前设备名称：{deviceInfo?.deviceName || '未知'}
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
