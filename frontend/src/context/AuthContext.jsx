import { createContext, useContext, useState } from 'react';
import { loginAdmin } from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('amge-token'));

  const login = async (username, password) => {
    const data = await loginAdmin(username, password);
    setToken(data.token);
    localStorage.setItem('amge-token', data.token);
    return data;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('amge-token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);