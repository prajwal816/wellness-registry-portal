import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { X, Upload, File, Image } from "lucide-react";
import {
  uploadFile,
  uploadMultipleFiles,
  validateFileType,
  validateFileSize,
  formatFileSize,
} from "@/utils/cloudinary";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUploadSuccess?: (files: any[]) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  allowedTypes?: string[];
  token?: string;
  className?: string;
}

interface UploadedFile {
  url: string;
  publicId: string;
  originalName: string;
  size: number;
  format: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  multiple = false,
  accept = "image/*",
  maxFiles = 5,
  maxSizeMB = 10,
  allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"],
  token,
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // Validate file count
    if (multiple && files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (const file of files) {
      if (!validateFileType(file, allowedTypes)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        continue;
      }

      if (!validateFileSize(file, maxSizeMB)) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxSizeMB}MB limit`,
          variant: "destructive",
        });
        continue;
      }

      validFiles.push(file);
    }

    setSelectedFiles(validFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      let result;

      if (multiple && selectedFiles.length > 1) {
        result = await uploadMultipleFiles(selectedFiles, token);
        setUploadedFiles(result.files);
        onUploadSuccess?.(result.files);
      } else {
        result = await uploadFile(selectedFiles[0], token);
        setUploadedFiles([result.file]);
        onUploadSuccess?.([result.file]);
      }

      toast({
        title: "Upload successful",
        description: result.message,
      });

      // Reset
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Upload failed";
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
      onUploadError?.(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setSelectedFiles([]);
    setUploadedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="file-upload">
          {multiple ? "Select Files" : "Select File"}
        </Label>
        <Input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Selected Files ({selectedFiles.length})</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={uploading}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="flex items-center space-x-2">
                  {file.type.startsWith("image/") ? (
                    <Image className="h-4 w-4" />
                  ) : (
                    <File className="h-4 w-4" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSelectedFile(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              className="flex-1"
            >
              {uploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {selectedFiles.length}{" "}
                  {selectedFiles.length === 1 ? "File" : "Files"}
                </>
              )}
            </Button>
          </div>

          {uploading && <Progress value={uploadProgress} className="w-full" />}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Files</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 border rounded bg-green-50"
              >
                {file.format &&
                ["jpg", "jpeg", "png", "gif"].includes(
                  file.format.toLowerCase()
                ) ? (
                  <img
                    src={file.url}
                    alt={file.originalName}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <File className="h-10 w-10" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.originalName}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
