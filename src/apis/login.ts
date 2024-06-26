import {useMutation, useQuery} from 'react-query';
import {ClientError, get, post} from '.';
import {HobbyList, TUserInfo, TVerify} from './types';
import {Toast} from 'native-base';

export function fetchSendCode() {
  return useMutation<any, ClientError, {qq: string}>(data =>
    get('/login/send', data),
  );
}

export function fetchLogin() {
  return useMutation(
    async (data: {
      qq: string;
      code: string;
      sendTime: string;
      location: string;
    }) =>
      post<{token: string; isSetUser: boolean; userInfo: TUserInfo}>(
        '/login/lg',
        data,
      ),
  );
}

export function getHobbyList() {
  return useQuery([], async () =>
    get<{hobbyList: HobbyList[]}>('/login/hobby'),
  );
}

export function fetchSetUserInfo() {
  return useMutation(async (data: TUserInfo) =>
    post<TVerify>('/login/info', data),
  );
}

export function fetchVerifyToken() {
  return useMutation(async (data: {token: string; location?: string}) =>
    post<{userInfo: TUserInfo}>('/login/verify', data),
  );
}

export async function getIpLocation(): Promise<{
  query: string;
  country: string;
  city: string;
  regionName: string;
}> {
  return (await fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(({query, country, city, regionName}) => {
      return {
        query,
        country,
        city,
        regionName,
      };
    })
    .catch(error => {
      Toast.show({
        description: '获取地理位置信息失败:' + error.message,
        duration: 1000,
      });
    })) as any;
}

export function fetchUpdateUserInfo() {
  return useMutation(async (data: TUserInfo) =>
    post<TVerify>('/login/upInfo', data),
  );
}

export function getUserInfo() {
  return useMutation(async (qq: string) =>
    get<{userInfo: TUserInfo}>('login/getInfo', {qq}),
  );
}
