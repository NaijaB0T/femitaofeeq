
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
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('admin_authenticated');
      const expiry = localStorage.getItem('admin_auth_expiry');
      
      if (authStatus === 'true' && expiry) {
        // Check if the session has expired
        if (new Date().getTime() < parseInt(expiry, 10)) {
          setIsAuthenticated(true);
        } else {
          // Clear expired session
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_auth_expiry');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
    
    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple hard-coded auth for demo purposes
    // In a real app, you would use a proper authentication system
    if (username === 'admin' && password === 'password') {
      // Set session expiry to 24 hours from now
      const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_auth_expiry', expiryTime.toString());
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
    localStorage.removeItem('admin_auth_expiry');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
