
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '../../components/AdminLayout';
import { jsonStorage, ContactMessage } from '../../utils/jsonStorage';
import { Trash2, Check, Search, Mail, MailOpen } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const Messages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    loadMessages();
  }, []);
  
  const loadMessages = () => {
    const allMessages = jsonStorage.getMessages();
    setMessages(allMessages);
  };
  
  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      jsonStorage.deleteMessage(id);
      loadMessages();
      toast.success('Message deleted successfully');
    }
  };
  
  const handleMarkAsRead = (id: string) => {
    jsonStorage.updateMessage(id, { read: true });
    loadMessages();
  };
  
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      jsonStorage.updateMessage(message.id, { read: true });
      loadMessages();
    }
  };
  
  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <Helmet>
        <title>Messages | Admin | Femi Taofeeq</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-gray-600 mt-1">Manage contact form submissions</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full md:w-64"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {messages.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Status</TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow 
                        key={message.id}
                        className={message.read ? "" : "bg-blue-50"}
                      >
                        <TableCell>
                          {message.read ? (
                            <MailOpen className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Mail className="h-5 w-5 text-blue-500" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <p className={message.read ? "" : "font-semibold"}>{message.name}</p>
                            <p className="text-sm text-gray-500">{message.email}</p>
                          </div>
                        </TableCell>
                        <TableCell 
                          className="cursor-pointer max-w-md truncate"
                          onClick={() => handleViewMessage(message)}
                        >
                          {message.subject}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-500">
                          {new Date(message.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {!message.read && (
                              <button
                                onClick={() => handleMarkAsRead(message.id)}
                                className="p-2 text-green-600 hover:text-green-800"
                                title="Mark as read"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="p-2 text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Mail className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                <p className="mt-1 text-gray-500">
                  Messages sent through the contact form will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
      
      {/* Message Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(selectedMessage.date).toLocaleString()}
                </p>
              </div>
              
              <div className="py-2 whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Messages;
