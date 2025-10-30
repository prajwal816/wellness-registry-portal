
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Link2, HelpCircle, Book } from 'lucide-react';

const Resources = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="ayush-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ayush-blue">Resources</h1>
            <p className="text-gray-600 mt-2">
              Access guidelines, regulations, and resources for AYUSH startups.
            </p>
          </div>
          
          <Tabs defaultValue="guidelines">
            <TabsList className="mb-8">
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="sectors">AYUSH Sectors</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guidelines">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Registration Guidelines</CardTitle>
                        <CardDescription>Step-by-step guide to registering your AYUSH startup</CardDescription>
                      </div>
                      <div className="bg-ayush-light-green p-2 rounded-full">
                        <FileText className="text-ayush-green" size={24} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-green" />
                        <span>Registration Procedure (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-green" />
                        <span>Required Documents Checklist (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-green" />
                        <span>Application Form Guide (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Link2 size={16} className="mr-2 text-ayush-green" />
                        <span>Online Registration Tutorial</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Compliance Guidelines</CardTitle>
                        <CardDescription>Ensure your startup meets all AYUSH compliance requirements</CardDescription>
                      </div>
                      <div className="bg-ayush-light-blue p-2 rounded-full">
                        <FileText className="text-ayush-blue" size={24} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-blue" />
                        <span>Quality Standards Guide (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-blue" />
                        <span>Safety Requirements (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-blue" />
                        <span>Facility Requirements (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Link2 size={16} className="mr-2 text-ayush-blue" />
                        <span>Compliance Webinar Series</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Funding Opportunities</CardTitle>
                        <CardDescription>Discover funding schemes for AYUSH startups</CardDescription>
                      </div>
                      <div className="bg-ayush-light-saffron p-2 rounded-full">
                        <FileText className="text-ayush-saffron" size={24} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-saffron" />
                        <span>Government Schemes (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-saffron" />
                        <span>Grant Application Templates (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-saffron" />
                        <span>Startup India Benefits (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Link2 size={16} className="mr-2 text-ayush-saffron" />
                        <span>Investor Connect Program</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Marketing Guidelines</CardTitle>
                        <CardDescription>Understand legal requirements for marketing AYUSH products</CardDescription>
                      </div>
                      <div className="bg-ayush-light-green p-2 rounded-full">
                        <FileText className="text-ayush-green" size={24} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-green" />
                        <span>Advertising Standards (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-green" />
                        <span>Label Requirements (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Download size={16} className="mr-2 text-ayush-green" />
                        <span>Claim Verification Process (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <Link2 size={16} className="mr-2 text-ayush-green" />
                        <span>Digital Marketing Best Practices</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="regulations">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>AYUSH Sector Regulations</CardTitle>
                  <CardDescription>
                    Key regulations governing AYUSH businesses in India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-3">Drugs and Cosmetics Act</h3>
                      <p className="text-gray-600 mb-4">
                        The Drugs and Cosmetics Act, 1940 and Rules 1945 regulate the import, manufacture, distribution and sale of drugs and cosmetics, including AYUSH medicines.
                      </p>
                      <div className="flex items-center text-sm text-ayush-green">
                        <Link2 size={16} className="mr-2" />
                        <span>View regulation details</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-3">AYUSH Manufacturing License</h3>
                      <p className="text-gray-600 mb-4">
                        Requirements for obtaining manufacturing licenses for Ayurvedic, Siddha, Unani, and Homeopathic medicines under state licensing authorities.
                      </p>
                      <div className="flex items-center text-sm text-ayush-green">
                        <Link2 size={16} className="mr-2" />
                        <span>View licensing guide</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-3">Good Manufacturing Practices (GMP)</h3>
                      <p className="text-gray-600 mb-4">
                        Specific GMP guidelines for AYUSH manufacturers to ensure quality, safety, and efficacy of products.
                      </p>
                      <div className="flex items-center text-sm text-ayush-green">
                        <Link2 size={16} className="mr-2" />
                        <span>View GMP guidelines</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-3">FSSAI Regulations for AYUSH Food Products</h3>
                      <p className="text-gray-600 mb-4">
                        Food Safety and Standards Authority of India regulations for AYUSH-based food supplements and nutraceuticals.
                      </p>
                      <div className="flex items-center text-sm text-ayush-green">
                        <Link2 size={16} className="mr-2" />
                        <span>View FSSAI guidelines for AYUSH products</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Updates</CardTitle>
                  <CardDescription>
                    Recent changes and updates to AYUSH regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-ayush-green pl-4 py-1">
                      <p className="text-sm text-gray-500">May 15, 2023</p>
                      <h4 className="font-medium">Updated Quality Standards for Ayurvedic Medicines</h4>
                      <p className="text-gray-600 text-sm">
                        New quality standards for 53 Ayurvedic formulations published by the Ministry of AYUSH.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-ayush-green pl-4 py-1">
                      <p className="text-sm text-gray-500">March 10, 2023</p>
                      <h4 className="font-medium">New Export Guidelines for AYUSH Products</h4>
                      <p className="text-gray-600 text-sm">
                        Simplified procedures for exporting AYUSH products with reduced documentation.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-ayush-green pl-4 py-1">
                      <p className="text-sm text-gray-500">January 22, 2023</p>
                      <h4 className="font-medium">E-Commerce Regulations for AYUSH Products</h4>
                      <p className="text-gray-600 text-sm">
                        New guidelines for selling AYUSH products through e-commerce platforms.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-ayush-green pl-4 py-1">
                      <p className="text-sm text-gray-500">December 5, 2022</p>
                      <h4 className="font-medium">Revised Clinical Trial Requirements</h4>
                      <p className="text-gray-600 text-sm">
                        Updated protocols for conducting clinical trials for AYUSH medicines.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sectors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card id="ayurveda">
                  <CardHeader className="bg-ayush-light-green">
                    <CardTitle>Ayurveda</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Ayurveda is a traditional Indian system of medicine that emphasizes prevention and holistic healing. It uses herbal compounds, special diets, and other unique health practices.
                    </p>
                    <h4 className="font-medium text-ayush-blue mb-2">Key Resources:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-green" />
                        <span>Ayurvedic Formulary of India</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-green" />
                        <span>Ayurvedic Pharmacopoeia</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-green" />
                        <span>Manufacturing Guidelines</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card id="yoga">
                  <CardHeader className="bg-ayush-light-blue">
                    <CardTitle>Yoga & Naturopathy</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Yoga combines physical postures, breathing exercises, and meditation to improve health. Naturopathy focuses on natural healing methods and lifestyle modifications.
                    </p>
                    <h4 className="font-medium text-ayush-blue mb-2">Key Resources:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-blue" />
                        <span>Common Yoga Protocol</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-blue" />
                        <span>Naturopathy Practice Guidelines</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-blue" />
                        <span>Center Establishment Guide</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card id="unani">
                  <CardHeader className="bg-ayush-light-saffron">
                    <CardTitle>Unani</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Unani is a Greco-Arabic medical tradition that has evolved within the Muslim world. It emphasizes the balance of bodily fluids and natural treatment methods.
                    </p>
                    <h4 className="font-medium text-ayush-blue mb-2">Key Resources:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-saffron" />
                        <span>National Formulary of Unani Medicine</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-saffron" />
                        <span>Unani Pharmacopoeia</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-saffron" />
                        <span>Production Standards</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card id="siddha">
                  <CardHeader className="bg-ayush-light-green">
                    <CardTitle>Siddha</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Siddha is one of the oldest systems of medicine in India, originating in Tamil Nadu. It uses herbal, mineral, and animal products for treatment and emphasizes healthy lifestyle.
                    </p>
                    <h4 className="font-medium text-ayush-blue mb-2">Key Resources:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-green" />
                        <span>Siddha Formulary of India</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-green" />
                        <span>Siddha Pharmacopoeia</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-green" />
                        <span>Quality Control Guidelines</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card id="homeopathy">
                  <CardHeader className="bg-ayush-light-blue">
                    <CardTitle>Homoeopathy</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">
                      Homoeopathy is a medical system based on the principle that "like cures like." It uses highly diluted substances to trigger the body's natural healing processes.
                    </p>
                    <h4 className="font-medium text-ayush-blue mb-2">Key Resources:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-blue" />
                        <span>Homoeopathic Pharmacopoeia</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-blue" />
                        <span>Clinical Research Guidelines</span>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-ayush-blue" />
                        <span>Manufacturing Standards</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>Common questions about AYUSH startup registration</CardDescription>
                    </div>
                    <div className="bg-ayush-light-saffron p-2 rounded-full">
                      <HelpCircle className="text-ayush-saffron" size={24} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-2">What is the AYUSH Startup Registration Portal?</h3>
                      <p className="text-gray-600">
                        The AYUSH Startup Registration Portal is a comprehensive online platform designed to streamline the registration process for startups in the AYUSH sector (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy). It enhances efficiency, transparency, and accessibility while ensuring compliance with AYUSH regulations.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-2">Who can register on the portal?</h3>
                      <p className="text-gray-600">
                        The portal is designed for startups in the AYUSH sector, including manufacturers of Ayurvedic, Unani, Siddha, and Homeopathic medicines, yoga and wellness centers, AYUSH healthcare service providers, and other businesses related to the AYUSH ecosystem.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-2">What documents are required for registration?</h3>
                      <p className="text-gray-600">
                        Required documents typically include business registration certificates, founder identification documents, product or service details, manufacturing facility information (if applicable), and compliance certifications relevant to your specific AYUSH sector. The exact requirements vary based on the type of startup.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-2">How long does the registration process take?</h3>
                      <p className="text-gray-600">
                        The typical processing time is 30-45 days from the date of complete application submission, depending on the complexity of your business and the completeness of documentation. Applications requiring additional verification may take longer.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-2">Are there any fees for registration?</h3>
                      <p className="text-gray-600">
                        Yes, registration fees vary based on the type and size of your AYUSH startup. The fee structure is available on the registration page. Certain categories of startups, such as those from underserved regions or led by women entrepreneurs, may be eligible for fee concessions.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-ayush-blue mb-2">What benefits do I get after registration?</h3>
                      <p className="text-gray-600">
                        Registered AYUSH startups gain access to various benefits including government schemes, funding opportunities, regulatory assistance, marketing support, networking opportunities with industry stakeholders, and participation in government-sponsored events and trade shows.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
