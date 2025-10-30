
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { db, Application } from '@/lib/db';
import IdeaExplanation from '@/components/IdeaExplanation';
import { scoreApplication } from '@/lib/ai-scoring';

const EditApplication = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    foundingDate: '',
    businessType: 'ayurveda',
    address: '',
    website: '',
    description: '',
    founderName: '',
    founderEmail: '',
    founderPhone: '',
    ideaExplanation: '',
  });

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to edit applications",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const fetchApplication = async () => {
      try {
        if (id) {
          const app = await db.getApplicationById(id);
          
          if (!app) {
            toast({
              title: "Application Not Found",
              description: "The requested application does not exist.",
              variant: "destructive",
            });
            navigate('/dashboard');
            return;
          }
          
          if (app.userId !== user.id) {
            toast({
              title: "Access Denied",
              description: "You don't have permission to edit this application.",
              variant: "destructive",
            });
            navigate('/dashboard');
            return;
          }
          
          setApplication(app);
          
          // Set form data from application
          setFormData({
            companyName: app.companyName || '',
            registrationNumber: app.registrationNumber || '',
            foundingDate: app.foundingDate || '',
            businessType: app.type || 'ayurveda',
            address: app.address || '',
            website: app.website || '',
            description: app.description || '',
            founderName: app.founderName || '',
            founderEmail: app.founderEmail || '',
            founderPhone: app.founderPhone || '',
            ideaExplanation: app.ideaExplanation || '',
          });
        }
      } catch (error) {
        console.error('Error fetching application:', error);
        toast({
          title: "Error",
          description: "Failed to load application data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, user, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdeaExplanationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, ideaExplanation: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!application || !id) return;

      // Validate required fields
      if (!formData.companyName || !formData.registrationNumber) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Score the application
      const { overallScore, status } = scoreApplication(
        formData.ideaExplanation,
        formData.description,
        formData.businessType,
        application.documents
      );

      // Update application
      const updatedApplication = await db.updateApplication(id, {
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        foundingDate: formData.foundingDate,
        type: formData.businessType as 'ayurveda' | 'yoga' | 'unani' | 'siddha' | 'homeopathy',
        address: formData.address,
        website: formData.website,
        description: formData.description,
        founderName: formData.founderName,
        founderEmail: formData.founderEmail,
        founderPhone: formData.founderPhone,
        ideaExplanation: formData.ideaExplanation,
        status: status as 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected',
        aiScore: overallScore,
      });

      toast({
        title: "Application Updated",
        description: "Your application has been successfully updated.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-8">
          <div className="ayush-container">
            <div className="text-center py-12">
              <p>Loading application data...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-8">
          <div className="ayush-container">
            <div className="text-center py-12">
              <p>Application not found.</p>
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="mt-4"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-2xl font-bold text-center text-ayush-blue mb-2">Edit Application</h1>
            <p className="text-center text-gray-600 mb-8">
              Update your AYUSH startup registration application. Fields marked with an asterisk (*) are required.
            </p>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-ayush-blue mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input 
                      id="companyName" 
                      name="companyName" 
                      value={formData.companyName} 
                      onChange={handleInputChange} 
                      placeholder="Enter your company name" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input 
                      id="registrationNumber" 
                      name="registrationNumber" 
                      value={formData.registrationNumber} 
                      onChange={handleInputChange} 
                      placeholder="Enter company registration number" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="foundingDate">Founding Date *</Label>
                    <Input 
                      id="foundingDate" 
                      name="foundingDate" 
                      type="date" 
                      value={formData.foundingDate} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select 
                      value={formData.businessType} 
                      onValueChange={(value) => handleSelectChange('businessType', value)}
                    >
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ayurveda">Ayurveda</SelectItem>
                        <SelectItem value="yoga">Yoga & Naturopathy</SelectItem>
                        <SelectItem value="unani">Unani</SelectItem>
                        <SelectItem value="siddha">Siddha</SelectItem>
                        <SelectItem value="homeopathy">Homeopathy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-ayush-blue mb-4">Business Details</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address *</Label>
                    <Textarea 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      placeholder="Enter your business address" 
                      className="min-h-[80px]" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleInputChange} 
                      placeholder="https://yourcompany.com" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Brief description of your company and its activities" 
                      className="min-h-[120px]" 
                      required 
                    />
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Founder Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="founderName">Founder Name *</Label>
                      <Input 
                        id="founderName" 
                        name="founderName" 
                        value={formData.founderName} 
                        onChange={handleInputChange} 
                        placeholder="Enter founder's name" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="founderEmail">Founder Email *</Label>
                      <Input 
                        id="founderEmail" 
                        name="founderEmail" 
                        type="email" 
                        value={formData.founderEmail} 
                        onChange={handleInputChange} 
                        placeholder="founder@company.com" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="founderPhone">Founder Phone *</Label>
                      <Input 
                        id="founderPhone" 
                        name="founderPhone" 
                        value={formData.founderPhone} 
                        onChange={handleInputChange} 
                        placeholder="Enter contact number" 
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-ayush-blue mb-4">Idea Explanation</h2>
                <IdeaExplanation 
                  value={formData.ideaExplanation}
                  onChange={handleIdeaExplanationChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmit}
                  className="bg-ayush-green hover:bg-ayush-blue"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditApplication;
