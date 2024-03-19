import axios from 'axios';
import {Toast} from 'native-base';
import Config from 'react-native-config';

const httpInstance = axios.create({
  baseURL: 'https://10.6.0.92:9901',
  // baseURL: 'https://chat.zhangtc.online',
  timeout: 5000,
});

httpInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

httpInstance.interceptors.response.use(
  res => {
    const {result} = res.data;
    return result;
  },
  error => {
    Toast.show({description: error.message, duration: 2000});
    return Promise.reject(error);
  },
);

export type ClientError = {
  code: number;
  msg: string;
};

export const post = <T>(url: string, data?: any): T => {
  return httpInstance.post<T>(url, data) as T;
};

export const get = <T>(url: string, data?: any): T => {
  return httpInstance.get<T>(url, {params: data}) as T;
};

export const fetchFile = async (url: string, data: any, param?: any) => {
  const defaultConfig = {
    method: 'POST',
    body: data,
    Headers: {
      'X-Token': Config.API_TOKEN,
    },
    ...param,
  };
  try {
    const response = await fetch(
      `https://files.zhangtc.online` + url,
      defaultConfig,
    );
    if (!response.ok) {
      throw new Error('请求失败');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
