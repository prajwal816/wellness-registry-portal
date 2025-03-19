
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { 
  LayoutDashboard, 
  User, 
  ClipboardCheck, 
  Clock, 
  LifeBuoy, 
  Settings, 
  LogOut, 
  FileText, 
  FilePlus2, 
  AlertCircle, 
  Clock3,
  CheckCircle 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Stats for the dashboard
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    underReview: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchApplications = async () => {
      try {
        if (user) {
          const userApplications = await db.getApplicationsByUserId(user.id);
          setApplications(userApplications);
          
          // Calculate stats
          setStats({
            total: userApplications.length,
            pending: userApplications.filter(app => app.status === 'submitted').length,
            approved: userApplications.filter(app => app.status === 'approved').length,
            rejected: userApplications.filter(app => app.status === 'rejected').length,
            underReview: userApplications.filter(app => app.status === 'under-review').length,
          });
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, navigate]);

  if (!user) {
    return null; // Will navigate to login via useEffect
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-200 text-gray-800">Draft</Badge>;
      case 'submitted':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center"><Clock3 size={14} className="mr-1" /> Pending</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-800 flex items-center"><FileText size={14} className="mr-1" /> Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 flex items-center"><CheckCircle size={14} className="mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 flex items-center"><AlertCircle size={14} className="mr-1" /> Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'draft': return 20;
      case 'submitted': return 40;
      case 'under-review': return 70;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const formatApplicationId = (id: string) => {
    // Extract just numbers from the id or use a counter
    const numPart = id.replace(/\D/g, '').slice(0, 4);
    return `APP${numPart.padStart(3, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="flex h-[calc(100vh-64px-80px)] overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200 flex flex-col items-center">
              <div className="w-20 h-20 bg-ayush-green rounded-full flex items-center justify-center text-white text-2xl mb-3">
                {user.fullName.charAt(0)}
              </div>
              <h2 className="font-semibold text-gray-800">{user.fullName}</h2>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                <li>
                  <button 
                    className="w-full flex items-center p-3 rounded-md bg-ayush-light-green text-ayush-green font-medium"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LayoutDashboard size={18} className="mr-3" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/profile')}
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/applications')}
                  >
                    <ClipboardCheck size={18} className="mr-3" />
                    Approvals
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/tasks')}
                  >
                    <Clock size={18} className="mr-3" />
                    Pending Tasks
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/faq')}
                  >
                    <LifeBuoy size={18} className="mr-3" />
                    Support
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings size={18} className="mr-3" />
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <button 
                className="w-full flex items-center p-3 rounded-md text-red-600 hover:bg-red-50"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Manage your AYUSH registration applications and profile</p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-center">
                  <div className="mr-4 p-3 bg-white rounded-full">
                    <FileText size={24} className="text-ayush-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.total} Applications</h3>
                    <p className="text-gray-600">Total submissions</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg shadow-sm flex items-center">
                  <div className="mr-4 p-3 bg-white rounded-full">
                    <Clock3 size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.pending} Pending</h3>
                    <p className="text-gray-600">Awaiting review</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg shadow-sm flex items-center">
                  <div className="mr-4 p-3 bg-white rounded-full">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.approved} Approved</h3>
                    <p className="text-gray-600">Successfully registered</p>
                  </div>
                </div>
              </div>
              
              {/* Tabs for Applications and Notifications */}
              <Tabs defaultValue="applications" className="mb-8">
                <TabsList className="border-b border-gray-200 w-full rounded-none bg-transparent p-0 mb-6">
                  <TabsTrigger 
                    value="applications"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-ayush-green rounded-none px-6 py-3 data-[state=active]:shadow-none bg-transparent data-[state=active]:bg-transparent"
                  >
                    Applications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-ayush-green rounded-none px-6 py-3 data-[state=active]:shadow-none bg-transparent data-[state=active]:bg-transparent"
                  >
                    Notifications
                    {notifications.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="applications" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Your Applications</h2>
                    <Button 
                      onClick={() => navigate('/application-form')} 
                      className="bg-ayush-green hover:bg-ayush-blue"
                    >
                      <FilePlus2 size={16} className="mr-2" />
                      New Application
                    </Button>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <p>Loading applications...</p>
                    </div>
                  ) : applications.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                      <FileText size={40} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No Applications Yet</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't submitted any AYUSH startup applications yet. Start by creating a new application.
                      </p>
                      <Button 
                        onClick={() => navigate('/application-form')} 
                        className="bg-ayush-green hover:bg-ayush-blue"
                      >
                        <FilePlus2 size={16} className="mr-2" />
                        Create Application
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {applications.map((app) => (
                        <div key={app.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{app.companyName}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Application ID: {formatApplicationId(app.id)} • <span className="capitalize">{app.type}</span>
                              </p>
                            </div>
                            {getStatusBadge(app.status)}
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{getProgressValue(app.status)}%</span>
                            </div>
                            <Progress value={getProgressValue(app.status)} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                            <span>Submitted: {new Date(app.createdAt).toLocaleDateString()}</span>
                            {app.status === 'under-review' && (
                              <span>Under final review by the committee</span>
                            )}
                            {app.status === 'submitted' && (
                              <span>Additional documentation may be requested</span>
                            )}
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <Button 
                              variant="outline" 
                              className="border-ayush-green text-ayush-green"
                              onClick={() => navigate(`/application/${app.id}`)}
                            >
                              View Details
                            </Button>
                            {(app.status === 'draft' || app.status === 'submitted') && (
                              <Button 
                                className="bg-ayush-green hover:bg-ayush-blue"
                                onClick={() => navigate(`/application/${app.id}/edit`)}
                              >
                                Edit Application
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Notifications</h2>
                  
                  {notifications.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                      <p className="text-gray-600">You have no notifications at this time.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.map((notification, index) => (
                        <div 
                          key={index} 
                          className="bg-white p-4 rounded-lg border border-gray-200 flex"
                        >
                          <div className={`p-2 rounded-full mr-4 ${notification.isRead ? 'bg-gray-100' : 'bg-ayush-light-green'}`}>
                            {notification.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: 'Application Under Review',
    message: 'Your application for Yoga Life Sciences is now under review by our committee.',
    time: '2 hours ago',
    isRead: false,
    icon: <FileText size={20} className="text-ayush-green" />,
  },
  {
    id: 2,
    title: 'Additional Documentation Requested',
    message: 'Please provide additional certifications for your Ayurveda Wellness Solutions application.',
    time: '1 day ago',
    isRead: true,
    icon: <AlertCircle size={20} className="text-yellow-600" />,
  },
];

export default Dashboard;
