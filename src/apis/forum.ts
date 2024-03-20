import {useMutation} from 'react-query';
import {post} from '.';
import {TForumChat} from './types';

export function fetchCreateForumChat() {
  return useMutation(async (data: TForumChat) => post('/forum/create', data));
}
