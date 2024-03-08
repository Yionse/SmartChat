import {useMutation, useQuery} from 'react-query';
import {ClientError, get, post} from '.';
import {HobbyList} from './types';

export function fetchSendCode() {
  return useMutation<any, ClientError, {qq: string}>(data =>
    get('/login/send', data),
  );
}

export function fetchLogin() {
  return useMutation(
    async (data: {qq: string; code: string; sendTime: string}) =>
      post<{token: string; isSetUser: boolean}>('/login/lg', data),
  );
}

export function getHobbyList() {
  return useQuery([], async () =>
    get<{hobbyList: HobbyList[]}>('/login/hobby'),
  );
}
