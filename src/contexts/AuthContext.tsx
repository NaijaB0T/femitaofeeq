
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('admin_authenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple hard-coded auth for demo purposes
    // In a real app, you would use a proper authentication system
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
