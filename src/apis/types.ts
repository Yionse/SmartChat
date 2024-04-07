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
  user: string;
  content: string;
  createTime: string;
  userInfo?: TUserInfo;
}
