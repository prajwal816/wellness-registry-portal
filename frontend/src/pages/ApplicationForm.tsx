import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/db';
import { FileUploader } from '@/components/FileUploader';
import IdeaExplanation from '@/components/IdeaExplanation';
import { scoreApplication } from '@/lib/ai-scoring';

const ApplicationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
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
    documents: [] as string[],
    ideaExplanation: '',
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<{
    businessPlan: string | null;
    certificateOfIncorporation: string | null;
    panCard: string | null;
    gstCertificate: string | null;
    ayushCertifications: string[] | null;
    otherDocuments: string[] | null;
  }>({
    businessPlan: null,
    certificateOfIncorporation: null,
    panCard: null,
    gstCertificate: null,
    ayushCertifications: null,
    otherDocuments: null,
  });

  React.useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit an application",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

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

  const handleFileUpload = (type: string, files: string | string[]) => {
    setUploadedFiles(prev => ({ ...prev, [type]: files }));
    
    const filesArray = Array.isArray(files) ? files : [files];
    setFormData(prev => ({
      ...prev, 
      documents: [...prev.documents, ...filesArray]
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.companyName || !formData.businessType) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.founderName || !formData.founderEmail || !formData.founderPhone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.ideaExplanation) {
        toast({
          title: "Missing Information",
          description: "Please explain your startup idea",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to submit an application",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      if (!uploadedFiles.certificateOfIncorporation || !uploadedFiles.businessPlan) {
        toast({
          title: "Missing Documents",
          description: "Please upload all required documents",
          variant: "destructive",
        });
        return;
      }

      const { overallScore, status } = scoreApplication(
        formData.ideaExplanation,
        formData.description,
        formData.businessType,
        formData.documents
      );

      const application = await db.createApplication({
        userId: user.id,
        status: status as 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected',
        type: formData.businessType as 'ayurveda' | 'yoga' | 'unani' | 'siddha' | 'homeopathy',
        companyName: formData.companyName,
        documents: formData.documents,
        registrationNumber: formData.registrationNumber,
        foundingDate: formData.foundingDate,
        address: formData.address,
        website: formData.website,
        description: formData.description,
        founderName: formData.founderName,
        founderEmail: formData.founderEmail,
        founderPhone: formData.founderPhone,
        ideaExplanation: formData.ideaExplanation,
        aiScore: overallScore,
      });

      toast({
        title: "Application Submitted",
        description: "Your AYUSH startup application has been submitted successfully",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStepIndicator = (step: number, label: string) => {
    const isCurrent = currentStep === step;
    const isCompleted = currentStep > step;
    
    return (
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${isCompleted ? 'bg-ayush-green text-white' : isCurrent ? 'border-2 border-ayush-green text-ayush-green' : 'bg-gray-200 text-gray-500'}`}>
          {isCompleted ? <CheckCircle2 size={16} /> : <span>{step}</span>}
        </div>
        <span className={`text-sm ${isCurrent ? 'font-medium text-ayush-green' : isCompleted ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
          {label}
        </span>
      </div>
    );
  };

  if (!user) {
    return null;
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
            <h1 className="text-2xl font-bold text-center text-ayush-blue mb-2">AYUSH Startup Registration</h1>
            <p className="text-center text-gray-600 mb-8">
              Complete the following registration form to register your startup in the AYUSH sector. All fields
              marked with an asterisk (*) are required.
            </p>
            
            <div className="flex justify-between mb-8 px-4">
              {renderStepIndicator(1, "Basic Information")}
              {renderStepIndicator(2, "Business Details")}
              {renderStepIndicator(3, "Idea Explanation")}
              {renderStepIndicator(4, "Document Upload")}
              {renderStepIndicator(5, "Review & Submit")}
            </div>
            
            <div className="mt-6">
              {currentStep === 1 && (
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
              )}
              
              {currentStep === 2 && (
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
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-ayush-blue mb-4">Idea Explanation</h2>
                  <IdeaExplanation 
                    value={formData.ideaExplanation}
                    onChange={handleIdeaExplanationChange}
                  />
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-ayush-blue mb-4">Document Upload</h2>
                  
                  <p className="text-sm text-gray-600 mb-6">
                    Please upload the following documents in PDF, JPG, or PNG format. Each file should not exceed 5MB.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Business Plan *</Label>
                      <FileUploader 
                        onFileUpload={(file) => handleFileUpload('businessPlan', file)}
                        uploadedFile={uploadedFiles.businessPlan}
                        label="Business Plan"
                      />
                      <p className="text-xs text-gray-500">Upload your detailed business plan</p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Certificate of Incorporation *</Label>
                      <FileUploader 
                        onFileUpload={(file) => handleFileUpload('certificateOfIncorporation', file)}
                        uploadedFile={uploadedFiles.certificateOfIncorporation}
                        label="Certificate of Incorporation"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>PAN Card *</Label>
                      <FileUploader 
                        onFileUpload={(file) => handleFileUpload('panCard', file)}
                        uploadedFile={uploadedFiles.panCard}
                        label="PAN Card"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>GST Certificate (if applicable)</Label>
                      <FileUploader 
                        onFileUpload={(file) => handleFileUpload('gstCertificate', file)}
                        uploadedFile={uploadedFiles.gstCertificate}
                        label="GST Certificate"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>AYUSH Certifications (if any)</Label>
                      <FileUploader 
                        onFileUpload={(files) => handleFileUpload('ayushCertifications', files)}
                        uploadedFile={uploadedFiles.ayushCertifications}
                        label="AYUSH Certifications"
                        multiple
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Other Relevant Documents</Label>
                      <FileUploader 
                        onFileUpload={(files) => handleFileUpload('otherDocuments', files)}
                        uploadedFile={uploadedFiles.otherDocuments}
                        label="Other Documents"
                        multiple
                      />
                      <p className="text-xs text-gray-500">You can upload multiple files</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-ayush-blue mb-4">Review & Submit</h2>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">Application Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Company Name</p>
                          <p className="text-gray-800">{formData.companyName}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Registration Number</p>
                          <p className="text-gray-800">{formData.registrationNumber}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Founding Date</p>
                          <p className="text-gray-800">{formData.foundingDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Business Type</p>
                          <p className="text-gray-800 capitalize">{formData.businessType}</p>
                        </div>
                        
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Business Address</p>
                          <p className="text-gray-800">{formData.address}</p>
                        </div>
                        
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Company Description</p>
                          <p className="text-gray-800">{formData.description}</p>
                        </div>

                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Idea Explanation</p>
                          <p className="text-gray-800">{formData.ideaExplanation.length > 200 
                            ? `${formData.ideaExplanation.substring(0, 200)}...` 
                            : formData.ideaExplanation}</p>
                          {formData.ideaExplanation.length > 200 && (
                            <button 
                              className="text-ayush-green text-sm mt-1 hover:underline"
                              onClick={() => alert(formData.ideaExplanation)}
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium text-gray-800 mb-2">Uploaded Documents</h4>
                        <ul className="space-y-2">
                          {uploadedFiles.businessPlan && (
                            <li className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 size={16} className="mr-2 text-green-500" />
                              Business Plan
                            </li>
                          )}
                          {uploadedFiles.certificateOfIncorporation && (
                            <li className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 size={16} className="mr-2 text-green-500" />
                              Certificate of Incorporation
                            </li>
                          )}
                          {uploadedFiles.panCard && (
                            <li className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 size={16} className="mr-2 text-green-500" />
                              PAN Card
                            </li>
                          )}
                          {uploadedFiles.gstCertificate && (
                            <li className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 size={16} className="mr-2 text-green-500" />
                              GST Certificate
                            </li>
                          )}
                          {uploadedFiles.ayushCertifications && uploadedFiles.ayushCertifications.length > 0 && (
                            <li className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 size={16} className="mr-2 text-green-500" />
                              AYUSH Certifications ({uploadedFiles.ayushCertifications.length} files)
                            </li>
                          )}
                          {uploadedFiles.otherDocuments && uploadedFiles.otherDocuments.length > 0 && (
                            <li className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 size={16} className="mr-2 text-green-500" />
                              Other Documents ({uploadedFiles.otherDocuments.length} files)
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        By submitting this application, you certify that all information provided is accurate and complete.
                        Your application will be reviewed by the AYUSH regulatory authorities and our AI scoring system.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="border-ayush-green text-ayush-green"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Step
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 5 ? (
                  <Button 
                    onClick={nextStep}
                    className="bg-ayush-green hover:bg-ayush-blue"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="bg-ayush-green hover:bg-ayush-blue"
                  >
                    Submit Application
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

export default ApplicationForm;
