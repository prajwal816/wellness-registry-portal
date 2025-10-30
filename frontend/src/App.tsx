
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import FAQ from '@/pages/FAQ';
import Resources from '@/pages/Resources';
import ApplicationForm from '@/pages/ApplicationForm';
import ApplicationDetails from '@/pages/ApplicationDetails';
import EditApplication from '@/pages/EditApplication';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from '@/components/ui/toaster';
import AyushChatbot from '@/components/AyushChatbot';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/application/:id" element={<ApplicationDetails />} />
          <Route path="/edit-application/:id" element={<EditApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AyushChatbot />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
