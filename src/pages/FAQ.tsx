
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is AYUSH?",
    answer: (
      <p>
        AYUSH stands for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy. It represents India's traditional healthcare
        systems that focus on holistic approaches to wellness and healing.
      </p>
    ),
  },
  {
    question: "How can I register as an AYUSH practitioner?",
    answer: (
      <p>
        You can register as an AYUSH practitioner by clicking on the 'Register' button in the navigation bar and following the registration
        process. You'll need to provide your credentials and relevant certifications.
      </p>
    ),
  },
  {
    question: "What resources are available for AYUSH startups?",
    answer: (
      <p>
        AYUSH startups can access various resources including funding opportunities, regulatory guidelines, market research, and
        networking events. Visit our Resources page for more information.
      </p>
    ),
  },
  {
    question: "Is there any financial support for AYUSH businesses?",
    answer: (
      <p>
        Yes, the government offers various grants, subsidies, and financial support programs for AYUSH businesses. Check our Resources
        section for current funding opportunities.
      </p>
    ),
  },
  {
    question: "How can I connect with other AYUSH professionals?",
    answer: (
      <p>
        You can connect with other AYUSH professionals through our community forums, networking events, and webinars. Create an
        account to access these features.
      </p>
    ),
  },
  {
    question: "What documents are required for AYUSH startup registration?",
    answer: (
      <div>
        <p>The following documents are typically required:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Certificate of Incorporation</li>
          <li>Business Plan</li>
          <li>PAN Card</li>
          <li>GST Registration (if applicable)</li>
          <li>AYUSH-specific certifications (depending on your business type)</li>
          <li>Founder and director details</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How long does the registration process take?",
    answer: (
      <p>
        The registration process typically takes 4-6 weeks, depending on the completeness of your application and the current volume of applications being processed.
      </p>
    ),
  },
  {
    question: "Can I track my application status after submission?",
    answer: (
      <p>
        Yes, you can track your application status through your dashboard after logging into your account. You'll receive notifications about any updates to your application status.
      </p>
    ),
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="ayush-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-12">
              Find answers to common questions about AYUSH Portal and related services.
            </p>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible
                  key={index}
                  open={openItems[index]}
                  onOpenChange={() => toggleItem(index)}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-5 text-left font-medium">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openItems[index] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-ayush-light-saffron rounded-lg border border-ayush-saffron">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Didn't find what you're looking for?</h2>
              <p className="text-gray-600 mb-4">
                Our support team is here to help with any questions you may have about the AYUSH Startup Registration Portal.
              </p>
              <a 
                href="mailto:support@ayushportal.gov.in" 
                className="inline-flex items-center text-ayush-green hover:text-ayush-blue font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
