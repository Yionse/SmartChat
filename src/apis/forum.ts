import {useMutation, useQuery} from 'react-query';
import {get, post} from '.';
import {TForumChat, TForumComment} from './types';

export function fetchCreateForumChat() {
  return useMutation(async (data: TForumChat) => post('/forum/create', data));
}

export function getFetchPersonalForum(user?: string) {
  return useQuery(
    ['forum', user],
    async () => get<TForumChat[]>('/forum/list', {user}),
    {
      staleTime: 1000 * 60 * 5, // 缓存数据  5 分钟
    },
  );
}

export function fetchCommentForum() {
  return useMutation(async (data: TForumComment) =>
    post('/forum/comment', data),
  );
}
