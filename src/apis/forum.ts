import {useMutation, useQuery} from 'react-query';
import {get, post} from '.';
import {TForumChat, TForumComment} from './types';

export function fetchCreateForumChat() {
  return useMutation(async (data: TForumChat) => post('/forum/create', data));
}

export function useFetchPersonalForum(user?: string) {
  return useQuery([user], async () => get<TForumChat[]>('/forum/list', {user}));
}

export function fetchCommentForum() {
  return useMutation(async (data: TForumComment) =>
    post('/forum/comment', data),
  );
}
