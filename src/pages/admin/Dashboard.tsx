
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '../../components/AdminLayout';
import { jsonStorage, ContactMessage, PortfolioItem } from '../../utils/jsonStorage';
import { BarChart, MessageCircle, Film, User } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    portfolioItems: 0,
    featuredItems: 0
  });
  
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [recentWorks, setRecentWorks] = useState<PortfolioItem[]>([]);
  
  useEffect(() => {
    // Load data
    const messages = jsonStorage.getMessages();
    const portfolioItems = jsonStorage.getPortfolioItems();
    
    // Set stats
    setStats({
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => !m.read).length,
      portfolioItems: portfolioItems.length,
      featuredItems: portfolioItems.filter(p => p.featured).length
    });
    
    // Set recent items
    setRecentMessages(messages.slice(0, 3));
    setRecentWorks(portfolioItems.slice(0, 3));
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Femi Taofeeq</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to your portfolio admin panel</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Film className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Portfolio Items</p>
                  <h3 className="text-2xl font-bold">{stats.portfolioItems}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <BarChart className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Featured Works</p>
                  <h3 className="text-2xl font-bold">{stats.featuredItems}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Messages</p>
                  <h3 className="text-2xl font-bold">{stats.totalMessages}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Unread Messages</p>
                  <h3 className="text-2xl font-bold">{stats.unreadMessages}</h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Recent Messages</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentMessages.length > 0 ? (
                  recentMessages.map((message) => (
                    <div key={message.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{message.name}</h3>
                          <p className="text-sm text-gray-500">{message.email}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(message.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{message.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No messages yet.
                  </div>
                )}
              </div>
              
              {recentMessages.length > 0 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <a 
                    href="/admin/messages" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all messages
                  </a>
                </div>
              )}
            </div>
            
            {/* Recent Works */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Recent Portfolio Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentWorks.length > 0 ? (
                  recentWorks.map((work) => (
                    <div key={work.id} className="p-6 flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 mr-4 rounded-md overflow-hidden">
                        <img 
                          src={work.thumbnail} 
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{work.title}</h3>
                        <p className="text-sm text-gray-500">{work.category}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {work.featured ? '⭐ Featured' : 'Not Featured'} • {work.year}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No portfolio items yet.
                  </div>
                )}
              </div>
              
              {recentWorks.length > 0 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <a 
                    href="/admin/portfolio" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all portfolio items
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
