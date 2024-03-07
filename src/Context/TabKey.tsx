import React, {createContext, useState} from 'react';

export const TabKeyContext = createContext(
  {} as {
    tabKey: 'message' | 'contact' | 'square';
    setTabKey: React.Dispatch<
      React.SetStateAction<'message' | 'contact' | 'square'>
    >;
  },
);

export const TabKeyProvide = (props: any) => {
  const [tabKey, setTabKey] = useState<'message' | 'contact' | 'square'>(
    'message',
  );
  return (
    <TabKeyContext.Provider value={{tabKey, setTabKey}}>
      {props.children}
    </TabKeyContext.Provider>
  );
};
