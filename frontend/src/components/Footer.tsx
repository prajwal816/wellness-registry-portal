
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-ayush-blue text-white">
      <div className="ayush-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AYUSH Startup Portal</h3>
            <p className="text-sm text-gray-300">
              Streamlining registration for startups in Ayurveda, Yoga, Unani, Siddha, and Homoeopathy sectors.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-ayush-saffron">Home</Link></li>
              <li><Link to="/resources" className="hover:text-ayush-saffron">Resources</Link></li>
              <li><Link to="/about" className="hover:text-ayush-saffron">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-ayush-saffron">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">AYUSH Sectors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources#ayurveda" className="hover:text-ayush-saffron">Ayurveda</Link></li>
              <li><Link to="/resources#yoga" className="hover:text-ayush-saffron">Yoga & Naturopathy</Link></li>
              <li><Link to="/resources#unani" className="hover:text-ayush-saffron">Unani</Link></li>
              <li><Link to="/resources#siddha" className="hover:text-ayush-saffron">Siddha</Link></li>
              <li><Link to="/resources#homeopathy" className="hover:text-ayush-saffron">Homoeopathy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Contact Information</h4>
            <address className="text-sm not-italic text-gray-300 space-y-2">
              <p>Ministry of AYUSH</p>
              <p>AYUSH Bhawan, B-Block, GPO Complex</p>
              <p>INA, New Delhi - 110023</p>
              <p>Email: ayush-portal@gov.in</p>
              <p>Phone: +91-11-2462-2222</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-600 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Ministry of AYUSH, Government of India. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-ayush-saffron">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-ayush-saffron">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
