import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { LogOut, Menu, X } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-ayush-green shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">AYUSH</span>
              <span className="ml-1 text-lg font-medium text-white">
                Startup Portal
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white/80 hover:text-white">
              Home
            </Link>
            <Link to="/resources" className="text-white/80 hover:text-white">
              Resources
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white">
              About
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white"
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => logout()}
                  className="flex items-center gap-2 text-white hover:text-white hover:bg-white/10"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-ayush-green text-ayush-green hover:bg-ayush-light-green"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-white text-ayush-green hover:bg-white/90">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className="py-2 text-gray-600 hover:text-ayush-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="py-2 text-gray-600 hover:text-ayush-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="py-2 text-gray-600 hover:text-ayush-green"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="py-2 text-gray-600 hover:text-ayush-green"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-start gap-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-ayush-green text-ayush-green hover:bg-ayush-light-green"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-ayush-green hover:bg-ayush-blue text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
