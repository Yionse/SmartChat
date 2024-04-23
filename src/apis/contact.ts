import {useMutation, useQuery} from 'react-query';
import {get, post} from '.';
import {TContactList, TRequestAddContact, TUserInfo} from './types';

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
