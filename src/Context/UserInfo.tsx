import React, {createContext, useEffect, useState} from 'react';

interface TUserInfo {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  qq: string;
  setQQ: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInfoContext = createContext<TUserInfo>({} as TUserInfo);

export function UserInfoProvide(props: any) {
  const [token, setToken] = useState<string>('');
  const [qq, setQQ] = useState<string>('');
  return (
    <UserInfoContext.Provider value={{qq, token, setQQ, setToken}}>
      {props.children}
    </UserInfoContext.Provider>
  );
}
