
import React from 'react';
import { Application } from '@/lib/db';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ApprovalsListProps {
  applications: Application[];
}

const ApprovalsList = ({ applications }: ApprovalsListProps) => {
  const navigate = useNavigate();
  const approvedApplications = applications.filter(app => app.status === 'approved');
  
  const formatApplicationId = (id: string) => {
    const numPart = id.replace(/\D/g, '').slice(0, 4);
    return `APP${numPart.padStart(3, '0')}`;
  };

  if (approvedApplications.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
        <CheckCircle size={40} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Approved Applications</h3>
        <p className="text-gray-600 mb-6">
          None of your applications have been approved yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {approvedApplications.map((app) => (
        <div key={app.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{app.companyName}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Application ID: {formatApplicationId(app.id)} • <span className="capitalize">{app.type}</span>
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 flex items-center">
              <CheckCircle size={14} className="mr-1" /> Approved
            </Badge>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>Submitted: {new Date(app.createdAt).toLocaleDateString()}</span>
            <span>Approved: {new Date(app.updatedAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              className="border-ayush-green text-ayush-green"
              onClick={() => navigate(`/application/${app.id}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalsList;
