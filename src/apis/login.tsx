import {useMutation} from 'react-query';
import {ClientError, get} from '.';

export function fetchSendCode() {
  return useMutation<any, ClientError, {qq: string}>(data =>
    get('/login/send', data),
  );
}
