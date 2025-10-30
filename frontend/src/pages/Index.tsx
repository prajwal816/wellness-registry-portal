import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { Leaf, FileText, CheckCircle, Users, Shield } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow w-full">
        {/* Hero section */}
        <section className="hero-pattern py-16 md:py-24 w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-ayush-blue mb-6">
                AYUSH Startup Registration Portal
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your registration process for startups in Ayurveda,
                Yoga, Unani, Siddha, and Homoeopathy sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link to="/dashboard">
                    <Button className="w-full sm:w-auto bg-ayush-green hover:bg-ayush-blue text-white px-8 py-6 text-lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button className="w-full sm:w-auto bg-ayush-green hover:bg-ayush-blue text-white px-8 py-6 text-lg">
                        Register Your Startup
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-ayush-green text-ayush-green hover:bg-ayush-light-green px-8 py-6 text-lg"
                      >
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* AYUSH sectors section */}
        <section className="py-16 bg-white w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-ayush-blue mb-12">
              AYUSH Sectors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                {
                  name: "Ayurveda",
                  color: "bg-ayush-green",
                  description: "Traditional Indian system of medicine",
                },
                {
                  name: "Yoga",
                  color: "bg-ayush-blue",
                  description: "Ancient practice focusing on mind-body harmony",
                },
                {
                  name: "Unani",
                  color: "bg-ayush-saffron",
                  description: "Greco-Arabic medical tradition",
                },
                {
                  name: "Siddha",
                  color: "bg-ayush-orange",
                  description: "Ancient Tamil system of healing",
                },
                {
                  name: "Homeopathy",
                  color: "bg-ayush-red",
                  description:
                    'Alternative medicine based on "like cures like"',
                },
              ].map((sector, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                >
                  <div className={`${sector.color} h-2`}></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {sector.name}
                    </h3>
                    <p className="text-gray-600">{sector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-ayush-blue mb-12">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-ayush-light-green p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <FileText className="text-ayush-green" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Simplified Application
                </h3>
                <p className="text-gray-600">
                  Step-by-step application process with intuitive forms and
                  real-time validation.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-ayush-light-blue p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <CheckCircle className="text-ayush-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Status Tracking
                </h3>
                <p className="text-gray-600">
                  Real-time tracking of your application with timely
                  notifications on progress.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-ayush-light-saffron p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Shield className="text-ayush-saffron" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Secure Document Management
                </h3>
                <p className="text-gray-600">
                  Secure upload and storage of all your compliance documents.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-ayush-light-green p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Users className="text-ayush-green" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Role-Based Access
                </h3>
                <p className="text-gray-600">
                  Different access controls for startups, officials, and
                  regulatory authorities.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-ayush-light-blue p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Leaf className="text-ayush-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  AYUSH Resources
                </h3>
                <p className="text-gray-600">
                  Comprehensive library of resources and guidelines for AYUSH
                  startups.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-ayush-light-saffron p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Shield className="text-ayush-saffron" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Data Security
                </h3>
                <p className="text-gray-600">
                  Enterprise-grade security for all your sensitive data and
                  documents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-ayush-green text-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Register Your AYUSH Startup?
              </h2>
              <p className="text-xl mb-8">
                Join the growing community of AYUSH startups and streamline your
                registration process today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link to="/dashboard">
                    <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-ayush-green px-8 py-6 text-lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-ayush-green px-8 py-6 text-lg">
                        Register Now
                      </Button>
                    </Link>
                    <Link to="/resources">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
