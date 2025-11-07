import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { authAPI } from "@/lib/api";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const finalizeLogin = async () => {
      try {
        console.log("AuthSuccess: Starting OAuth finalization");
        console.log("AuthSuccess: Token received:", token ? "Yes" : "No");

        if (token) {
          // Persist backend token
          localStorage.setItem("token", token);
          console.log("AuthSuccess: Token saved to localStorage");

          // Fetch the current user from backend
          console.log("AuthSuccess: Fetching current user from backend...");
          const { data: backendUser } = await authAPI.getCurrentUser();
          console.log("AuthSuccess: User data received:", backendUser);

          // Map backend user to frontend user shape
          const safeUser = {
            id: backendUser._id || backendUser.id,
            email: backendUser.email,
            fullName: backendUser.name || "AYUSH User",
            address: "",
            // Map backend roles to frontend expected roles
            role:
              backendUser.role === "admin" || backendUser.role === "reviewer"
                ? "official"
                : "startup",
            createdAt: backendUser.createdAt
              ? new Date(backendUser.createdAt)
              : new Date(),
          };

          localStorage.setItem("ayush_current_user", JSON.stringify(safeUser));
          console.log(
            "AuthSuccess: User saved to localStorage, redirecting to dashboard"
          );

          navigate("/dashboard");
        } else {
          console.error("AuthSuccess: No token found in URL");
          navigate("/login");
        }
      } catch (err) {
        console.error("OAuth finalization error:", err);
        console.error("Error details:", err.response?.data || err.message);
        // Show error message but stay on page for debugging
        alert(
          `OAuth Error: ${
            err.response?.data?.message || err.message
          }. Check console for details.`
        );
        // Still redirect to login after showing error
        setTimeout(() => navigate("/login"), 3000);
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
