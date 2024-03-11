import React, {useState, createContext} from 'react';

interface TUserInfo {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  status: 'Login' | 'Home' | 'SetUser';
  setStatus: React.Dispatch<React.SetStateAction<'Login' | 'Home' | 'SetUser'>>;
  qq: string;
  setQQ: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInfoContext = createContext<TUserInfo>({} as TUserInfo);

export function UserInfoProvide(props: any) {
  const [token, setToken] = useState<string>('');
  const [status, setStatus] = useState<'Login' | 'Home' | 'SetUser'>('Login');
  const [qq, setQQ] = useState<string>('');
  return (
    <UserInfoContext.Provider
      value={{setToken, token, status, setStatus, qq, setQQ}}>
      {props.children}
    </UserInfoContext.Provider>
  );
}
