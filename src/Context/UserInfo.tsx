import React, {createContext, useState} from 'react';

const [token, setToken] = useState<string>('');
const [qq, setQQ] = useState<string>('');

interface TUserInfo {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  qq: string;
  setQQ: React.Dispatch<React.SetStateAction<string>>;
}

const UserInfoContext = createContext<TUserInfo>({} as TUserInfo);

export function UserInfoProvide(props: any) {
  return (
    <UserInfoContext.Provider value={{qq, token, setQQ, setToken}}>
      {props.children}
    </UserInfoContext.Provider>
  );
}
