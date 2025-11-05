import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";
import {
  uploadAvatar,
  validateFileType,
  validateFileSize,
} from "@/utils/cloudinary";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadProps {
  currentAvatar?: {
    url?: string;
    publicId?: string;
  };
  userName?: string;
  token: string;
  onUploadSuccess?: (avatar: { url: string; publicId: string }) => void;
  onUploadError?: (error: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  userName = "User",
  token,
  onUploadSuccess,
  onUploadError,
  size = "md",
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (only images for avatars)
    if (
      !validateFileType(file, [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ])
    ) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, or GIF)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB for avatars)
    if (!validateFileSize(file, 5)) {
      toast({
        title: "File too large",
        description: "Avatar image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const result = await uploadAvatar(selectedFile, token);

      toast({
        title: "Avatar updated",
        description: result.message,
      });

      onUploadSuccess?.(result.avatar);

      // Clear selection
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Avatar upload failed";
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
      onUploadError?.(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayUrl = previewUrl || currentAvatar?.url;

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={displayUrl} alt={userName} />
          <AvatarFallback className="text-lg font-semibold">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>

        <Button
          variant="outline"
          size="sm"
          className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
          onClick={triggerFileSelect}
          disabled={uploading}
        >
          <Camera className="h-3 w-3" />
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {selectedFile && (
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>

          <div className="flex space-x-2">
            <Button onClick={handleUpload} disabled={uploading} size="sm">
              {uploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={uploading}
              size="sm"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {!selectedFile && (
        <Button
          variant="outline"
          onClick={triggerFileSelect}
          disabled={uploading}
          size="sm"
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Avatar
        </Button>
      )}
    </div>
  );
};
