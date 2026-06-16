import { createContext, useContext, useState } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout, register as authRegister } from '../../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // A sessão é lida de forma síncrona do localStorage — sem estado de "loading".
  const [user, setUser] = useState(() => getCurrentUser());

  const login = async (credentials) => {
    const session = await authLogin(credentials);
    setUser(session);
    return session;
  };

  const register = async (data) => {
    const session = await authRegister(data);
    setUser(session);
    return session;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
