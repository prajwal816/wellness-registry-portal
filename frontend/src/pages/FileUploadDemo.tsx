import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/FileUpload";
import { AvatarUpload } from "@/components/AvatarUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FileUploadDemo: React.FC = () => {
  const [token, setToken] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [userAvatar, setUserAvatar] = useState<
    { url: string; publicId: string } | undefined
  >();

  const handleFileUploadSuccess = (files: any[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleAvatarUploadSuccess = (avatar: {
    url: string;
    publicId: string;
  }) => {
    setUserAvatar(avatar);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Cloudinary File Upload Demo</h1>
        <p className="text-gray-600">
          Test file uploads and avatar management with Cloudinary integration
        </p>
      </div>

      {/* Token Input for Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Token</CardTitle>
          <CardDescription>
            Enter your JWT token to test authenticated uploads (optional for
            basic uploads)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="token">JWT Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="Enter your JWT token..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="single">Single Upload</TabsTrigger>
          <TabsTrigger value="multiple">Multiple Upload</TabsTrigger>
          <TabsTrigger value="avatar">Avatar Upload</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Single File Upload</CardTitle>
              <CardDescription>
                Upload a single file to Cloudinary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onUploadSuccess={handleFileUploadSuccess}
                onUploadError={(error) => console.error("Upload error:", error)}
                multiple={false}
                token={token || undefined}
                accept="image/*,application/pdf,.doc,.docx"
                allowedTypes={[
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/gif",
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multiple" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multiple File Upload</CardTitle>
              <CardDescription>
                Upload multiple files at once (max 5 files)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onUploadSuccess={handleFileUploadSuccess}
                onUploadError={(error) => console.error("Upload error:", error)}
                multiple={true}
                maxFiles={5}
                token={token || undefined}
                accept="image/*,application/pdf,.doc,.docx"
                allowedTypes={[
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/gif",
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avatar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Avatar Upload</CardTitle>
              <CardDescription>
                Upload and manage user avatar (requires authentication token)
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {token ? (
                <AvatarUpload
                  currentAvatar={userAvatar}
                  userName="Test User"
                  token={token}
                  onUploadSuccess={handleAvatarUploadSuccess}
                  onUploadError={(error) =>
                    console.error("Avatar upload error:", error)
                  }
                  size="lg"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p>Please enter a JWT token to test avatar upload</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Results</CardTitle>
              <CardDescription>
                View all uploaded files and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No files uploaded yet. Try uploading some files in the other
                  tabs.
                </p>
              ) : (
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{file.originalName}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(file.url, "_blank")}
                        >
                          View File
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Size:</strong>{" "}
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                        <div>
                          <strong>Format:</strong> {file.format}
                        </div>
                        <div className="col-span-2">
                          <strong>Public ID:</strong> {file.publicId}
                        </div>
                        <div className="col-span-2">
                          <strong>URL:</strong>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline ml-2 break-all"
                          >
                            {file.url}
                          </a>
                        </div>
                      </div>
                      {file.format &&
                        ["jpg", "jpeg", "png", "gif"].includes(
                          file.format.toLowerCase()
                        ) && (
                          <div className="mt-2">
                            <img
                              src={file.url}
                              alt={file.originalName}
                              className="max-w-xs max-h-48 object-contain border rounded"
                            />
                          </div>
                        )}
                    </div>
                  ))}

                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFiles([])}
                    >
                      Clear Results
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
