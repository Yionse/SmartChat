import {useMutation, useQuery} from 'react-query';
import {get, post} from '.';
import {TRequestAddContact, TUserInfo} from './types';

export function getRecommendContact({user}: {user: string}) {
  return useQuery(['recommend', user], async () =>
    post<TUserInfo[]>('/contact/recommend', {user}),
  );
}

export function fetchSearchUser() {
  return useMutation(async (key: string) =>
    get<TUserInfo[]>('/contact/search', {key}),
  );
}

export function fetchRequestAddContact() {
  return useMutation(async (requestData: TRequestAddContact) =>
    post('/contact/request', requestData),
  );
}

export function getVerifyList(target: string) {
  return useQuery(
    ['verifyList', target],
    async () => get<TRequestAddContact[]>('contact/verifyList', {target}),
    {
      staleTime: 1000 * 60 * 10, // 缓存数据 10分钟
    },
  );
}

export function fetchUpdateContactStatus() {
  return useMutation(
    async (data: {id: number; status: number; targetRemark?: string}) =>
      post('/contact/verify', data),
  );
}
