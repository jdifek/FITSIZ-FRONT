import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../src/api/api';

export interface User {
  id?: number;
  telegramId: string;
  first_name?: string;
  phone?: string;
  
  email?: string;
  maskId?: number | null;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUser = { first_name: 'Тестовый', id: 12345 };
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user || mockUser;
    if (telegramUser) {
      api.registerUser(telegramUser.id.toString(), telegramUser.first_name).then((registeredUser) => {
        setUser(registeredUser);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}