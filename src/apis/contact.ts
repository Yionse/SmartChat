import {useMutation, useQuery} from 'react-query';
import {get, post} from '.';
import {TRequestAddContact, TUserInfo} from './types';

export function getRecommendContact({user}: {user: string}) {
  return useQuery([user], async () =>
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
