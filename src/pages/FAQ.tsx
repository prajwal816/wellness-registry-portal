
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // FAQ data
  const faqData = [
    {
      category: "Registration Process",
      questions: [
        {
          question: "What is the AYUSH Startup Registration Portal?",
          answer: "The AYUSH Startup Registration Portal is a dedicated platform for startups in the Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy sectors to register their businesses with the Ministry of AYUSH. The portal streamlines the registration process and provides resources for compliance with AYUSH regulations."
        },
        {
          question: "Who can register on the AYUSH Startup Portal?",
          answer: "Any startup operating in the AYUSH sector (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy) can register on the portal. The startup should be incorporated as a legal entity in India and should be focused on products, services, or technologies related to traditional medicine systems."
        },
        {
          question: "What documents are required for registration?",
          answer: "Required documents include: Certificate of Incorporation, Business Plan, PAN Card, GST Registration (if applicable), AYUSH-related certifications (if any), Product/Service documentation, and Proof of address. Additional documents may be required based on your specific business category."
        },
        {
          question: "How long does the registration process take?",
          answer: "The initial review typically takes 15-30 business days from the date of submission of a complete application. If additional information is requested, the timeline may be extended."
        }
      ]
    },
    {
      category: "Benefits & Support",
      questions: [
        {
          question: "What benefits do I get after registering my AYUSH startup?",
          answer: "Registered AYUSH startups can access various benefits including: Funding opportunities through government schemes, Regulatory support and guidance, Networking with industry experts and mentors, Access to incubation facilities, Participation in national and international exhibitions, Marketing support, and Simplified compliance processes."
        },
        {
          question: "Are there any funding opportunities available?",
          answer: "Yes, registered AYUSH startups can access various funding opportunities including grants from the Ministry of AYUSH, BIRAC funding for biotechnology startups, Startup India Seed Fund, and venture capital funding through government-backed funds focused on traditional medicine and wellness."
        },
        {
          question: "How does the AI scoring system evaluate my application?",
          answer: "Our AI scoring system evaluates applications based on multiple factors: Innovation (25%), Market Viability (25%), Compliance with AYUSH standards (25%), Team Strength (15%), and Relevance to AYUSH sectors (10%). The system analyzes your application text, business plan, and other documents to generate a comprehensive score."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble uploading documents. What should I do?",
          answer: "Please ensure that your documents are in PDF, JPG, or PNG format and do not exceed 5MB in size. If you're still experiencing issues, try using a different browser or clearing your browser cache. For persistent problems, contact our technical support team."
        },
        {
          question: "How can I check the status of my application?",
          answer: "You can check your application status by logging into your account and visiting the Dashboard section. The status will show as Draft, Submitted, Under Review, Approved, or Rejected. You will also receive email notifications when there are changes to your application status."
        },
        {
          question: "Can I edit my application after submission?",
          answer: "You can edit your application if it is in 'Draft' status. Once submitted, you cannot make direct changes to the application, but you can contact the support team if you need to update critical information. If your application is rejected, you can submit a new application with corrected information."
        }
      ]
    },
    {
      category: "Regulations & Compliance",
      questions: [
        {
          question: "What regulations govern AYUSH startups?",
          answer: "AYUSH startups are governed by several regulations depending on their specific area of operation, including: The Drugs and Cosmetics Act, 1940 and Rules 1945, AYUSH Safety Monitoring Program (ASM), Good Manufacturing Practices (GMP) for AYUSH products, Advertising Standards, and Import/Export regulations for AYUSH products."
        },
        {
          question: "Do I need specific certifications for my AYUSH products?",
          answer: "Yes, depending on your product category, you may need certifications such as AYUSH Premium Mark, Good Manufacturing Practices (GMP) certification, ISO certification, FSSAI certification (for food supplements), Organic certification (if applicable), and Quality testing certification from recognized laboratories."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? faqData.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqData;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-ayush-blue mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about the AYUSH startup registration process, benefits, 
              and technical support.
            </p>
          </div>
          
          <div className="relative mb-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for questions or keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found for "{searchQuery}". Try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-ayush-green mb-4">{category.category}</h2>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${idx}-${index}`} className="border border-gray-200 rounded-md overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3 bg-gray-50 text-gray-700">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Can't find what you're looking for? 
              <a href="mailto:support@ayushstartup.gov.in" className="text-ayush-blue ml-1 hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
