
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Minimize, Maximize } from 'lucide-react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// FAQ data borrowed from FAQ.tsx for the chatbot to use
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
        answer: "Our AI scoring system evaluates applications based on multiple factors: Innovation (25%), Market Viability (25%), Compliance with AYUSH standards (25%), Team Strength (15%), and Relevance to AYUSH sectors (10%). The system analyzes your application text, business plan, and other documents to generate a comprehensive score. Applications scoring 45 or above are approved."
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

// Flatten FAQ data for easier searching
const allQuestions = faqData.flatMap(category => 
  category.questions.map(q => ({
    ...q,
    category: category.category
  }))
);

// Type definitions for our messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AyushChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial greeting when the chatbot is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm your AYUSH assistant. How can I help you today? You can ask me questions about registration, benefits, technical support, or regulations.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process user message and generate response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const userQuestion = userInput.toLowerCase();
    
    // Check for greetings
    if (userQuestion.match(/^(hi|hello|hey|greetings)/i)) {
      return "Hello! How can I assist you with your AYUSH startup today?";
    }
    
    // Check for goodbyes
    if (userQuestion.match(/^(bye|goodbye|see you|take care)/i)) {
      return "Goodbye! Feel free to return if you have more questions about your AYUSH startup journey.";
    }
    
    // Check for thanks
    if (userQuestion.match(/^(thanks|thank you|appreciate)/i)) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    // Search through FAQ data for relevant answers
    let bestMatch = null;
    let highestMatchScore = 0;

    for (const question of allQuestions) {
      // Simple matching algorithm based on keyword overlap
      const questionKeywords = question.question.toLowerCase().split(' ');
      const answerKeywords = question.answer.toLowerCase().split(' ');
      const allKeywords = [...new Set([...questionKeywords, ...answerKeywords])];
      
      let matchScore = 0;
      for (const keyword of allKeywords) {
        if (keyword.length > 3 && userQuestion.includes(keyword)) {
          matchScore++;
        }
      }
      
      // Exact question match gets highest priority
      if (question.question.toLowerCase() === userQuestion) {
        matchScore += 100;
      }
      
      if (matchScore > highestMatchScore) {
        highestMatchScore = matchScore;
        bestMatch = question;
      }
    }

    // If we found a good match
    if (bestMatch && highestMatchScore > 1) {
      return bestMatch.answer;
    }

    // Default fallback responses
    const fallbackResponses = [
      "I'm not sure I understand your question. Could you rephrase it or ask about registration, benefits, technical support, or regulations?",
      "I don't have specific information on that. Would you like to know about the AYUSH registration process or available benefits instead?",
      "I'm specialized in AYUSH startup information. Try asking about application requirements, funding opportunities, or compliance regulations.",
      "Let me redirect you. You can ask about 'What documents are required?', 'How long does registration take?', or 'What benefits do I get?'"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-ayush-green hover:bg-ayush-blue shadow-lg"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      ) : (
        <div className={`bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ${isMinimized ? 'w-72 h-14' : 'w-80 sm:w-96 h-[500px]'}`}>
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-ayush-green text-white rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <h3 className="font-medium">AYUSH Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-ayush-blue rounded"
              >
                {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-ayush-blue rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <ScrollArea className="p-3 h-[400px]">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-ayush-green text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="ml-2 bg-ayush-green hover:bg-ayush-blue"
                    disabled={input.trim() === ''}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("What documents are required?")}
                  >
                    Documents
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("How long does registration take?")}
                  >
                    Timeline
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("What benefits do I get?")}
                  >
                    Benefits
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("How does the AI scoring work?")}
                  >
                    AI Scoring
                  </Badge>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Mobile version using Drawer component */}
      <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-4 left-4 w-12 h-12 rounded-full bg-ayush-green hover:bg-ayush-blue shadow-lg md:hidden"
            >
              <MessageCircle size={24} className="text-white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>AYUSH Assistant</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 h-[calc(85vh-80px)] flex flex-col">
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-3 p-2">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-ayush-green text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="border-t pt-4">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="ml-2 bg-ayush-green hover:bg-ayush-blue"
                    disabled={input.trim() === ''}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("What documents are required?")}
                  >
                    Documents
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("How long does registration take?")}
                  >
                    Timeline
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("What benefits do I get?")}
                  >
                    Benefits
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer text-xs"
                    onClick={() => setInput("How does the AI scoring work?")}
                  >
                    AI Scoring
                  </Badge>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default AyushChatbot;
