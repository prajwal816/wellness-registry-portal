import React, { useEffect, useState } from "react";
import { API_CONFIG } from "@/config/api";

export const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<
    "checking" | "online" | "offline" | "waking"
  >("checking");
  const [message, setMessage] = useState("Checking backend status...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setStatus("online");
          setMessage("Backend is online");
        } else {
          setStatus("offline");
          setMessage("Backend returned an error");
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          setStatus("waking");
          setMessage(
            "Backend is waking up... This may take 30-60 seconds. Please wait."
          );
        } else {
          setStatus("offline");
          setMessage("Cannot connect to backend");
        }
      }
    };

    checkBackend();

    // Recheck every 30 seconds if offline or waking
    const interval = setInterval(() => {
      if (status === "offline" || status === "waking") {
        checkBackend();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [status]);

  if (status === "online") {
    return null; // Don't show anything if backend is online
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-4 text-center ${
        status === "waking" ? "bg-yellow-500" : "bg-red-500"
      } text-white`}
    >
      <div className="flex items-center justify-center gap-2">
        {status === "waking" && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};
