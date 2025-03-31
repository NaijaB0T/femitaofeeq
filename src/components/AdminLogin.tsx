
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cinema-yellow">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin area</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                placeholder="Username"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                  <EyeOff size={18} className="text-gray-500" /> : 
                  <Eye size={18} className="text-gray-500" />
                }
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cinema-black text-cinema-yellow px-4 py-3 text-lg font-medium hover:bg-opacity-90 transition-colors duration-300 disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Default credentials for demo:</p>
          <p className="font-medium text-gray-700">Username: admin | Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
