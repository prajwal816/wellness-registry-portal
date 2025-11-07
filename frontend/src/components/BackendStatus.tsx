import React, { useEffect, useState } from "react";
import { API_CONFIG } from "@/config/api";
import { Button } from "@/components/ui/button";

export const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<
    "checking" | "online" | "offline" | "waking"
  >("checking");
  const [message, setMessage] = useState("Checking backend status...");
  const [retryCount, setRetryCount] = useState(0);

  const checkBackend = async () => {
    try {
      setStatus("checking");
      setMessage("Checking backend status...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
        signal: controller.signal,
        mode: "cors",
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus("online");
        setMessage("Backend is online ✓");
        setRetryCount(0);
      } else {
        setStatus("offline");
        setMessage("Backend returned an error");
      }
    } catch (error: any) {
      console.error("Backend check error:", error);
      if (error.name === "AbortError") {
        setStatus("waking");
        setMessage(
          "Backend is waking up... This may take 30-60 seconds. Please wait and try again."
        );
      } else {
        setStatus("offline");
        setMessage(
          'Cannot connect to backend. Click "Wake Up Backend" to try again.'
        );
      }
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const handleWakeUp = () => {
    setRetryCount((prev) => prev + 1);
    checkBackend();
  };

  if (status === "online") {
    return null; // Don't show anything if backend is online
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-4 text-center ${
        status === "waking"
          ? "bg-yellow-500"
          : status === "checking"
          ? "bg-blue-500"
          : "bg-red-500"
      } text-white shadow-lg`}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          {(status === "waking" || status === "checking") && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span className="font-medium">{message}</span>
        </div>
        {(status === "offline" || status === "waking") && (
          <div className="flex gap-2">
            <Button
              onClick={handleWakeUp}
              variant="secondary"
              size="sm"
              disabled={status === "checking"}
            >
              {status === "checking" ? "Checking..." : "Wake Up Backend"}
            </Button>
            {retryCount > 0 && (
              <span className="text-sm self-center">Attempt {retryCount}</span>
            )}
          </div>
        )}
        <p className="text-xs opacity-90">Backend URL: {API_CONFIG.BASE_URL}</p>
      </div>
    </div>
  );
};
