import React, {createContext, useContext, useState, ReactNode} from 'react';

type User = {
  id: number;
  username: string;
  email: string;
  name?: string;
};

type UserContextType = {
  user: User | null;
  handleLogout: () => void;
  handleLogin: (u: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>({
    id: 1,
    username: 'jdoe',
    email: 'jdoe@example.com',
    name: 'John Doe',
  });

  const handleLogout = () => setUser(null);
  const handleLogin = (u: User) => setUser(u);

  return (
    <UserContext.Provider value={{user, handleLogout, handleLogin}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};

export default UserContext;
