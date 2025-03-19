
import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileUpload: (file: string | string[]) => void;
  uploadedFile: string | string[] | null;
  label: string;
  multiple?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileUpload, 
  uploadedFile, 
  label,
  multiple = false 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // In a real app, this would upload to a server
  // For now, we'll just simulate storage with file names
  const handleFile = (files: FileList) => {
    if (multiple) {
      const fileNames = Array.from(files).map(file => file.name);
      onFileUpload(fileNames);
    } else {
      onFileUpload(files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files);
    }
  };

  const removeFile = (file: string) => {
    if (multiple && Array.isArray(uploadedFile)) {
      const updatedFiles = uploadedFile.filter(f => f !== file);
      onFileUpload(updatedFiles);
    } else {
      onFileUpload('');
    }
  };

  return (
    <div className="w-full">
      {!uploadedFile || (Array.isArray(uploadedFile) && uploadedFile.length === 0) ? (
        <div
          className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging ? 'border-ayush-green bg-ayush-light-green' : 'border-gray-300 hover:border-ayush-green hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-700 mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, JPG, or PNG (MAX. 5MB)</p>
          <input
            id={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            multiple={multiple}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="border rounded-md p-3">
          {multiple && Array.isArray(uploadedFile) ? (
            <div className="space-y-2">
              {uploadedFile.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <File className="h-4 w-4 text-ayush-blue mr-2" />
                    <span className="text-sm truncate max-w-[200px]">{file}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-dashed border-gray-300 text-gray-600"
                onClick={() => document.getElementById(`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
              >
                <Upload className="h-3 w-3 mr-2" />
                Add More Files
              </Button>
              <input
                id={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                multiple
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <File className="h-5 w-5 text-ayush-blue mr-2" />
                <span className="text-sm">{uploadedFile}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(uploadedFile as string);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
