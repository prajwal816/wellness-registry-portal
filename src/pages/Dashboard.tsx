
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { FileCheck, FileEdit, FilePlus2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-200 text-gray-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileEdit size={18} />;
      case 'submitted':
        return <FileCheck size={18} />;
      case 'under-review':
        return <FileCheck size={18} />;
      case 'approved':
        return <FileCheck size={18} />;
      case 'rejected':
        return <AlertCircle size={18} />;
      default:
        return <FileEdit size={18} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="ayush-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ayush-blue">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome, {user.fullName}! Manage your AYUSH startup applications.
            </p>
          </div>
          
          <Tabs defaultValue="applications">
            <TabsList className="mb-8">
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              {user.role === 'official' || user.role === 'regulator' ? (
                <TabsTrigger value="review">Applications for Review</TabsTrigger>
              ) : null}
            </TabsList>
            
            <TabsContent value="applications">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">My Applications</h2>
                <Button
                  className="bg-ayush-green hover:bg-ayush-blue text-white"
                  onClick={() => navigate('/application/new')}
                >
                  <FilePlus2 className="mr-2" size={16} />
                  New Application
                </Button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 flex flex-col items-center justify-center">
                    <div className="mb-4 p-4 bg-gray-100 rounded-full">
                      <FileEdit className="text-gray-500" size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md">
                      You haven't created any AYUSH startup applications yet. Start by creating your first application.
                    </p>
                    <Button
                      className="bg-ayush-green hover:bg-ayush-blue text-white"
                      onClick={() => navigate('/application/new')}
                    >
                      <FilePlus2 className="mr-2" size={16} />
                      Create New Application
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.map((app) => (
                    <Card key={app.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{app.companyName}</CardTitle>
                            <CardDescription className="mt-1 capitalize">{app.type} Startup</CardDescription>
                          </div>
                          <Badge className={getStatusColor(app.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(app.status)}
                              <span className="ml-1 capitalize">{app.status.replace('-', ' ')}</span>
                            </span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600">
                          <p><strong>Application ID:</strong> {app.id}</p>
                          <p><strong>Created:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                          <p><strong>Last Updated:</strong> {new Date(app.updatedAt).toLocaleDateString()}</p>
                          <p><strong>Documents:</strong> {app.documents.length} uploaded</p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50 py-3">
                        <Button
                          variant="outline"
                          className="w-full border-ayush-green text-ayush-green hover:bg-ayush-light-green"
                          onClick={() => navigate(`/application/${app.id}`)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and account settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="text-gray-900">{user.fullName}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Role</h3>
                      <p className="text-gray-900 capitalize">{user.role}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t py-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/profile/edit')}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/change-password')}
                  >
                    Change Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {user.role === 'official' || user.role === 'regulator' ? (
              <TabsContent value="review">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications for Review</CardTitle>
                    <CardDescription>
                      {user.role === 'official' 
                        ? 'Government officials can review and process applications' 
                        : 'Regulatory authorities can approve or reject applications'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 py-8 text-center">
                      No applications are currently assigned for your review.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ) : null}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
