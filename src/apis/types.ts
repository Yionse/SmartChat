export interface HobbyList {
  id: number;
  name: string;
}

export interface TUserInfo {
  qq: string;
  userName: string;
  sex: string;
  userImg: string;
  hobbyList: string;
  location?: string;
  signature: string;
}

export interface TVerify {
  isSuccess: boolean;
}

export interface TForumChat {
  id?: number;
  user: string;
  content: string;
  createTime: string;
  userImg?: string;
  userName?: string;
  userId?: string;
  commentList?: TForumComment[];
}

export interface TForumComment {
  id?: number;
  forumId: number;
  commentContent: string;
  userId: number;
  commentTime: string;
  userImg?: string;
  userName?: string;
}
