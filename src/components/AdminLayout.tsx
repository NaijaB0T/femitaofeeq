
import { ReactNode, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Toaster } from 'sonner';
import { 
  BarChart, Film, FolderOpen, Home, 
  LogOut, MessageSquare, Menu, X, 
  Settings, ChevronDown
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <BarChart className="h-5 w-5" />
    },
    {
      label: 'Portfolio Items',
      path: '/admin/portfolio',
      icon: <Film className="h-5 w-5" />
    },
    {
      label: 'Messages',
      path: '/admin/messages',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-cinema-black text-cinema-yellow rounded-md"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-cinema-black text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-gray-700">
            <Link to="/" className="flex items-center space-x-2">
              <FolderOpen className="h-8 w-8 text-cinema-yellow" />
              <span className="text-xl font-bold text-cinema-yellow">FemiTaofeeq</span>
            </Link>
          </div>
          
          <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center py-3 px-4 hover:bg-gray-700 rounded-md transition-colors ${
                    isActive ? 'bg-gray-700 text-cinema-yellow' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="p-5 border-t border-gray-700">
            <div className="mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-cinema-yellow text-cinema-black p-2 rounded-full">
                  <span className="font-bold text-sm">AT</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-gray-400">admin@femitaofeeq.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-gray-700 rounded-md transition-colors text-gray-300"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Log Out</span>
            </button>
            
            <Link
              to="/"
              className="mt-2 flex items-center py-2 px-4 hover:bg-gray-700 rounded-md transition-colors text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span className="ml-3">View Website</span>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
