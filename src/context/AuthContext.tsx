import React, { createContext, useContext, useState } from 'react';

interface User {
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulated users database
  const users = {
    'moreno': { password: '060125', name: 'Your Name' },
    'morena': { password: '220225', name: 'Nome dela' }
  };

  const login = (username: string, password: string): boolean => {
    const user = users[username as keyof typeof users];
    if (user && user.password === password) {
      setUser({ username, name: user.name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};