import React, {useState, createContext} from 'react';
import {TUserInfo} from '../apis/types';

interface TUserInfoContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  qq: string;
  setQQ: React.Dispatch<React.SetStateAction<string>>;
  status: 'Login' | 'Home' | 'SetUser';
  setStatus: React.Dispatch<React.SetStateAction<'Login' | 'Home' | 'SetUser'>>;
  userInfo: TUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserInfo>>;
}

export const UserInfoContext = createContext<TUserInfoContext>(
  {} as TUserInfoContext,
);

export function UserInfoProvide(props: any) {
  const [token, setToken] = useState<string>('');
  const [status, setStatus] = useState<'Login' | 'Home' | 'SetUser'>('Login');
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as TUserInfo);
  const [qq, setQQ] = useState<string>('');
  return (
    <UserInfoContext.Provider
      value={{
        setToken,
        token,
        status,
        setStatus,
        userInfo,
        setUserInfo,
        qq,
        setQQ,
      }}>
      {props.children}
    </UserInfoContext.Provider>
  );
}
