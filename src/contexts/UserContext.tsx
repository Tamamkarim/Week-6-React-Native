import React, {createContext, useContext, useState, ReactNode} from 'react';

type User = {
  username: string;
  name?: string;
  email?: string;
};

type UserContextType = {
  user: User | null;
  handleLogout: () => void;
  setUser: (u: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>({
    username: 'jdoe',
    name: 'John Doe',
    email: 'jdoe@example.com',
  });

  const handleLogout = () => setUser(null);

  return (
    <UserContext.Provider value={{user, handleLogout, setUser}}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};

export default UserContext;
