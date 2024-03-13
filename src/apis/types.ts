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
}

export interface TVerify {
  isSuccess: boolean;
}
