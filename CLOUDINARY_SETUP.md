# Cloudinary Integration Setup

This project now includes full Cloudinary integration for file uploads, image management, and user avatars.

## 🚀 Features Added

### Backend Features

- **File Upload API**: Single and multiple file uploads
- **Avatar Management**: User avatar upload and management
- **File Validation**: Type and size validation
- **Cloudinary Storage**: Automatic cloud storage with transformations
- **File Deletion**: Remove files from Cloudinary
- **File Information**: Get detailed file metadata

### Frontend Features

- **FileUpload Component**: Reusable file upload component
- **AvatarUpload Component**: Specialized avatar upload component
- **File Validation**: Client-side validation
- **Progress Tracking**: Upload progress indication
- **Preview Support**: Image preview before upload
- **Error Handling**: Comprehensive error handling

## 📋 Setup Instructions

### 1. Cloudinary Account Setup

1. **Create a Cloudinary Account**

   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for a free account
   - Note down your credentials from the dashboard

2. **Get Your Credentials**
   - Cloud Name
   - API Key
   - API Secret

### 2. Environment Configuration

Update your `backend/.env` file with your Cloudinary credentials:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Replace the placeholder values with your actual Cloudinary credentials!**

### 3. Dependencies

The following packages have been installed:

**Backend:**

- `cloudinary` - Cloudinary SDK
- `multer` - File upload middleware
- `multer-storage-cloudinary` - Cloudinary storage for multer

**Frontend:**

- No additional dependencies needed (uses existing UI components)

## 🛠️ API Endpoints

### File Upload Endpoints

#### Upload Single File

```
POST /api/upload/single
Content-Type: multipart/form-data
Body: file (form field)
```

#### Upload Multiple Files

```
POST /api/upload/multiple
Content-Type: multipart/form-data
Body: files[] (form field, max 5 files)
```

#### Delete File

```
DELETE /api/upload/:publicId
```

#### Get File Info

```
GET /api/upload/info/:publicId
```

### User Avatar Endpoints

#### Upload Avatar

```
POST /api/auth/avatar
Headers: x-auth-token: <jwt_token>
Content-Type: multipart/form-data
Body: avatar (form field)
```

## 🎯 Usage Examples

### Backend Usage

```javascript
// In your routes
const { upload } = require("../config/cloudinary");

// Single file upload
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    url: req.file.path,
    publicId: req.file.filename,
  });
});
```

### Frontend Usage

```tsx
import { FileUpload } from '@/components/FileUpload';
import { AvatarUpload } from '@/components/AvatarUpload';

// File upload component
<FileUpload
  onUploadSuccess={(files) => console.log('Uploaded:', files)}
  multiple={true}
  maxFiles={5}
  token={userToken}
/>

// Avatar upload component
<AvatarUpload
  currentAvatar={user.avatar}
  userName={user.name}
  token={userToken}
  onUploadSuccess={(avatar) => setUser({...user, avatar})}
/>
```

## 🔧 Configuration Options

### File Upload Configuration

```javascript
// In backend/config/cloudinary.js
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ayush-wellness", // Change this to your preferred folder
    allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"],
    transformation: [
      {
        width: 1000,
        height: 1000,
        crop: "limit",
        quality: "auto:good",
      },
    ],
  },
});
```

### File Size and Type Limits

- **Maximum file size**: 10MB (configurable)
- **Allowed image types**: JPEG, PNG, GIF
- **Allowed document types**: PDF, DOC, DOCX
- **Avatar size limit**: 5MB
- **Multiple upload limit**: 5 files

## 🧪 Testing

### Test the Integration

1. **Start your backend server**:

   ```bash
   cd backend
   npm start
   ```

2. **Start your frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the demo page**:
   - Add the FileUploadDemo component to your routing
   - Navigate to the demo page
   - Test single/multiple uploads and avatar functionality

### Demo Component

A complete demo component has been created at `frontend/src/pages/FileUploadDemo.tsx` that showcases all features.

## 🔒 Security Features

- **File type validation** (client and server-side)
- **File size limits** (configurable)
- **JWT authentication** for avatar uploads
- **Cloudinary transformations** for image optimization
- **Error handling** for failed uploads

## 📁 File Structure

```
backend/
├── config/
│   └── cloudinary.js          # Cloudinary configuration
├── routes/
│   ├── upload.js              # File upload routes
│   └── auth.js                # Updated with avatar upload
└── models/
    └── User.js                # Updated with avatar fields

frontend/
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx     # File upload component
│   │   └── AvatarUpload.tsx   # Avatar upload component
│   ├── utils/
│   │   └── cloudinary.ts      # Cloudinary utilities
│   └── pages/
│       └── FileUploadDemo.tsx # Demo page
```

## 🚨 Important Notes

1. **Replace placeholder credentials** in `.env` with your actual Cloudinary credentials
2. **Folder organization**: Files are stored in the `ayush-wellness` folder in Cloudinary
3. **Image transformations**: Images are automatically optimized and resized
4. **Error handling**: Both client and server-side validation is implemented
5. **Authentication**: Avatar uploads require JWT authentication

## 🎨 Customization

### Change Upload Folder

Edit `backend/config/cloudinary.js` and modify the `folder` parameter.

### Modify File Types

Update the `allowed_formats` array in the Cloudinary configuration.

### Adjust Image Transformations

Modify the `transformation` array to change how images are processed.

### Custom Validation

Add custom validation logic in the `fileFilter` function.

## 📞 Support

If you encounter any issues:

1. Check your Cloudinary credentials
2. Verify file types and sizes
3. Check browser console for errors
4. Review server logs for detailed error messages

The integration is now complete and ready to use! 🎉
