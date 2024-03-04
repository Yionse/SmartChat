import {useMutation} from 'react-query';
import {ClientError, get, post} from '.';

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
