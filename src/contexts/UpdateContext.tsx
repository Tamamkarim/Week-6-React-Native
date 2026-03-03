import React, {createContext, useContext, useState, ReactNode} from 'react';

type UpdateContextType = {
  refreshedAt: number;
  touch: () => void;
};

const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

export const UpdateProvider = ({children}: {children: ReactNode}) => {
  const [refreshedAt, setRefreshedAt] = useState<number>(Date.now());

  const touch = () => setRefreshedAt(Date.now());

  return <UpdateContext.Provider value={{refreshedAt, touch}}>{children}</UpdateContext.Provider>;
};

export const useUpdate = () => {
  const ctx = useContext(UpdateContext);
  if (!ctx) throw new Error('useUpdate must be used within UpdateProvider');
  return ctx;
};

export default UpdateContext;
