import {useMutation, useQuery} from 'react-query';
import {get, post} from '.';
import {
  TContact,
  TContactList,
  TContactStatus,
  TRequestAddContact,
  TUserInfo,
} from './types';

export function getRecommendContact({user}: {user: string}) {
  return useQuery(['recommend', user], async () =>
    post<TContactList[]>('/contact/recommend', {user}),
  );
}

export function fetchSearchUser() {
  return useMutation(async (param: {key: string; from: string}) =>
    get<TContactList[]>('/contact/search', param),
  );
}

export function fetchRequestAddContact() {
  return useMutation(async (requestData: TRequestAddContact) =>
    post('/contact/request', requestData),
  );
}

export function getVerifyList(target: string) {
  return useQuery(['verifyList', target], async () =>
    get<TRequestAddContact[]>('contact/verifyList', {target}),
  );
}

export function fetchUpdateContactStatus() {
  return useMutation(
    async (data: {id: number; status: number; targetRemark?: string}) =>
      post('/contact/verify', data),
  );
}

export function useGetContactList(qq: string) {
  return useQuery(['contactList', qq], async () =>
    get<TContact[]>('/contact/list', {qq}),
  );
}

export function getUserInfo(qq: string) {
  return useQuery(['userInfo', qq], async () =>
    get<TUserInfo>('/contact/detail', {qq}),
  );
}

export function fetchQueryContactStatus(from: string, target?: string) {
  if (!target) {
    return {data: {status: 'info'}}; // 如果 target 为空，则直接返回空的 data 对象
  }
  return useQuery(['status', from, target], async () =>
    post<TContactStatus>('/contact/status', {from, target}),
  );
}
