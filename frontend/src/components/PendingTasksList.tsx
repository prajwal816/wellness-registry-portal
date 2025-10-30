
import React from 'react';
import { Application } from '@/lib/db';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PendingTasksListProps {
  applications: Application[];
}

const PendingTasksList = ({ applications }: PendingTasksListProps) => {
  const navigate = useNavigate();
  const pendingApplications = applications.filter(app => 
    app.status === 'submitted' || app.status === 'under-review' || app.status === 'draft'
  );
  
  const formatApplicationId = (id: string) => {
    const numPart = id.replace(/\D/g, '').slice(0, 4);
    return `APP${numPart.padStart(3, '0')}`;
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'draft': return 20;
      case 'submitted': return 40;
      case 'under-review': return 70;
      default: return 0;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-200 text-gray-800">Draft</Badge>;
      case 'submitted':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center"><Clock size={14} className="mr-1" /> Pending</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-800 flex items-center"><FileText size={14} className="mr-1" /> Under Review</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (pendingApplications.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
        <FileText size={40} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Pending Tasks</h3>
        <p className="text-gray-600 mb-6">
          You don't have any pending applications that require attention.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingApplications.map((app) => (
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
  );
};

export default PendingTasksList;
