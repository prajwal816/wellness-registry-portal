
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Clipboard, Globe, Lightbulb, ShieldCheck, Briefcase, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-ayush-blue py-16 md:py-24 text-white">
          <div className="ayush-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About AYUSH Startup Portal
              </h1>
              <p className="text-xl opacity-90">
                Empowering innovation in traditional medicine and wellness through simplified registration and robust support.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision section */}
        <section className="py-16 bg-white">
          <div className="ayush-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="bg-ayush-light-green p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Clipboard className="text-ayush-green" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-ayush-blue mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg">
                  To streamline the registration process for AYUSH startups by providing a transparent, efficient, and user-friendly platform that ensures compliance with regulations while fostering innovation in traditional medicine systems.
                </p>
              </div>
              
              <div>
                <div className="bg-ayush-light-saffron p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Globe className="text-ayush-saffron" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-ayush-blue mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg">
                  To position India as the global leader in AYUSH by creating a vibrant ecosystem that nurtures startups, promotes research and development, and facilitates the global acceptance of traditional Indian medicine systems.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16 bg-gray-50">
          <div className="ayush-container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-ayush-blue mb-4">Our Core Values</h2>
              <p className="text-gray-600 text-lg">
                The principles that guide our approach to supporting AYUSH startups
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-ayush-green">
                <CardContent className="pt-6">
                  <div className="bg-ayush-light-green p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                    <Lightbulb className="text-ayush-green" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We embrace innovation that respects traditional knowledge while adapting to modern healthcare needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-ayush-blue">
                <CardContent className="pt-6">
                  <div className="bg-ayush-light-blue p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                    <ShieldCheck className="text-ayush-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Integrity</h3>
                  <p className="text-gray-600">
                    We uphold the highest standards of honesty, transparency, and ethical conduct in all our operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-ayush-saffron">
                <CardContent className="pt-6">
                  <div className="bg-ayush-light-saffron p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                    <Users className="text-ayush-saffron" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Collaboration</h3>
                  <p className="text-gray-600">
                    We foster meaningful partnerships between startups, regulators, academia, and industry to create a thriving ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Organization section */}
        <section className="py-16 bg-white">
          <div className="ayush-container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-ayush-blue mb-4">About the Ministry of AYUSH</h2>
              <p className="text-gray-600 text-lg">
                The driving force behind the AYUSH Startup Registration Portal
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gray-600 mb-6">
                  The Ministry of AYUSH was formed on 9th November 2014 to ensure the optimal development and propagation of AYUSH systems of healthcare. The Ministry is committed to promoting India's indigenous systems of medicine.
                </p>
                
                <p className="text-gray-600 mb-6">
                  AYUSH stands for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy. These systems are based on definite medical philosophies and represent a way of healthy living with established concepts on prevention of diseases and promotion of health.
                </p>
                
                <p className="text-gray-600">
                  The Ministry's objectives include upgrading educational standards, quality control and standardization of drugs, improving the availability of medicinal plant materials, research and development, and raising awareness about the efficacy of the AYUSH systems.
                </p>
              </div>
              
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-ayush-blue mb-4">Key Initiatives</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-ayush-light-green p-2 rounded-full">
                        <Briefcase className="text-ayush-green" size={18} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">National AYUSH Mission (NAM)</h4>
                      <p className="text-gray-600 text-sm">
                        Promoting AYUSH healthcare services and education throughout the country.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-ayush-light-blue p-2 rounded-full">
                        <Globe className="text-ayush-blue" size={18} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">International Cooperation</h4>
                      <p className="text-gray-600 text-sm">
                        Promoting AYUSH systems globally through cooperation with foreign countries and WHO.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-ayush-light-saffron p-2 rounded-full">
                        <Lightbulb className="text-ayush-saffron" size={18} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Research & Development</h4>
                      <p className="text-gray-600 text-sm">
                        Supporting scientific research to validate traditional practices and develop new products.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-ayush-light-green p-2 rounded-full">
                        <Users className="text-ayush-green" size={18} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">AYUSH Startup Initiative</h4>
                      <p className="text-gray-600 text-sm">
                        Supporting entrepreneurs in traditional medicine through regulatory simplification and funding.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
