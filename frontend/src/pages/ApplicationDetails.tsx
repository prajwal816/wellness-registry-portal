
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/db';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  File, 
  Calendar, 
  Building,
  User,
  Briefcase
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchApplication = async () => {
      try {
        if (id) {
          const app = await db.getApplicationById(id);
          
          if (!app) {
            navigate('/dashboard');
            return;
          }
          
          // Check if the application belongs to the current user
          if (app.userId !== user.id) {
            navigate('/dashboard');
            return;
          }
          
          setApplication(app);
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, user, navigate]);

  if (!user || loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50 flex items-center justify-center">
          <p>Loading application details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50 flex items-center justify-center">
          <p>Application not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-200 text-gray-800">Draft</Badge>;
      case 'submitted':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center"><Clock size={14} className="mr-1" /> Pending</Badge>;
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

  // Dummy data for application timeline
  const timeline = [
    {
      date: new Date(application.createdAt).toLocaleDateString(),
      event: 'Application Submitted',
      description: 'Your application has been successfully submitted.',
      icon: <FileText size={16} className="text-ayush-green" />,
    },
    ...(application.status === 'under-review' || application.status === 'approved' || application.status === 'rejected' ? [
      {
        date: new Date(new Date(application.updatedAt).getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        event: 'Under Review',
        description: 'Your application is being reviewed by our team.',
        icon: <Clock size={16} className="text-blue-500" />,
      }
    ] : []),
    ...(application.status === 'approved' ? [
      {
        date: new Date(application.updatedAt).toLocaleDateString(),
        event: 'Application Approved',
        description: 'Congratulations! Your AYUSH startup registration has been approved.',
        icon: <CheckCircle size={16} className="text-green-500" />,
      }
    ] : []),
    ...(application.status === 'rejected' ? [
      {
        date: new Date(application.updatedAt).toLocaleDateString(),
        event: 'Application Rejected',
        description: 'Your application has been rejected. Please check the feedback for details.',
        icon: <AlertCircle size={16} className="text-red-500" />,
      }
    ] : []),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="ayush-container">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center text-ayush-blue hover:text-ayush-green transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{application.companyName}</h1>
                  <p className="text-gray-600">
                    Application ID: {formatApplicationId(application.id)} • <span className="capitalize">{application.type}</span>
                  </p>
                </div>
                <div>
                  {getStatusBadge(application.status)}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Application Progress</h2>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Status: <span className="capitalize">{application.status.replace('-', ' ')}</span></span>
                  <span>{getProgressValue(application.status)}%</span>
                </div>
                <Progress value={getProgressValue(application.status)} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Company Name</p>
                      <div className="flex items-center">
                        <Building size={16} className="text-gray-400 mr-2" />
                        <p className="font-medium">{application.companyName}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Business Type</p>
                      <div className="flex items-center">
                        <Briefcase size={16} className="text-gray-400 mr-2" />
                        <p className="font-medium capitalize">{application.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Submission Date</p>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <p className="font-medium">{new Date(application.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <p className="font-medium">{new Date(application.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Applicant</p>
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <p className="font-medium">{user.fullName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Documents</h2>
                  
                  {application.documents.length === 0 ? (
                    <p className="text-gray-600">No documents uploaded.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {application.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center p-3 border border-gray-200 rounded-md bg-gray-50">
                          <File size={18} className="text-ayush-blue mr-2" />
                          <span className="text-sm truncate">{doc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Timeline</h2>
                  
                  <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    <ul className="space-y-4">
                      {timeline.map((item, index) => (
                        <li key={index} className="relative pl-6">
                          {index !== timeline.length - 1 && (
                            <div className="absolute left-[7px] top-[24px] bottom-0 w-[2px] bg-gray-300"></div>
                          )}
                          <div className="absolute left-0 top-1 rounded-full bg-white p-1 border border-gray-300">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.event}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {application.status === 'submitted' && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <h3 className="text-sm font-medium text-yellow-800 mb-1">Application Pending</h3>
                      <p className="text-sm text-yellow-700">
                        Your application is currently pending review. You will be notified once the review process begins.
                      </p>
                    </div>
                  )}
                  
                  {application.status === 'under-review' && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <h3 className="text-sm font-medium text-blue-800 mb-1">Under Review</h3>
                      <p className="text-sm text-blue-700">
                        Your application is currently being reviewed by our team. This process typically takes 7-10 business days.
                      </p>
                    </div>
                  )}
                  
                  {application.status === 'approved' && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                      <h3 className="text-sm font-medium text-green-800 mb-1">Approved</h3>
                      <p className="text-sm text-green-700">
                        Congratulations! Your AYUSH startup application has been approved. You can now proceed with the next steps.
                      </p>
                    </div>
                  )}
                  
                  {application.status === 'rejected' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                      <h3 className="text-sm font-medium text-red-800 mb-1">Application Rejected</h3>
                      <p className="text-sm text-red-700">
                        Your application has been rejected. Please review the feedback and consider reapplying with the necessary changes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
                
                {(application.status === 'draft' || application.status === 'submitted') && (
                  <Button 
                    className="bg-ayush-green hover:bg-ayush-blue"
                    onClick={() => navigate(`/application/${application.id}/edit`)}
                  >
                    Edit Application
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApplicationDetails;
