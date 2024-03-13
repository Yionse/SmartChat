import React, {useState, createContext} from 'react';
import {TUserInfo} from '../apis/types';

interface TUserInfoContext {
  userInfo: TUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserInfo>>;
}

export const UserInfoContext = createContext<TUserInfoContext>(
  {} as TUserInfoContext,
);

export function UserInfoProvide(props: any) {
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as TUserInfo);
  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}>
      {props.children}
    </UserInfoContext.Provider>
  );
}
