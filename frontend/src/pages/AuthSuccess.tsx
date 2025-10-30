import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { authAPI } from '@/lib/api';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const finalizeLogin = async () => {
      try {
        if (token) {
          // Persist backend token
          localStorage.setItem('token', token);

          // Fetch the current user from backend
          const { data: backendUser } = await authAPI.getCurrentUser();

          // Map backend user to frontend user shape
          const safeUser = {
            id: backendUser._id || backendUser.id,
            email: backendUser.email,
            fullName: backendUser.name || 'AYUSH User',
            address: '',
            // Map backend roles to frontend expected roles
            role: (backendUser.role === 'admin' || backendUser.role === 'reviewer') 
              ? 'official' 
              : 'startup',
            createdAt: backendUser.createdAt ? new Date(backendUser.createdAt) : new Date(),
          };

          localStorage.setItem('ayush_current_user', JSON.stringify(safeUser));

          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('OAuth finalization error:', err);
        navigate('/login');
      }
    };

    finalizeLogin();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="ayush-container">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6 text-center">
            <p className="text-gray-700">Completing sign-in with Google…</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthSuccess;