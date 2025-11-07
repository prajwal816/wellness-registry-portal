# AYUSH Wellness Registry Portal

Welcome to the AYUSH Wellness Registry Portal, a comprehensive platform for registering and managing startups in the Ayurveda, Yoga, Unani, Siddha, and Homeopathy sectors. Streamline your registration process and connect with regulatory bodies seamlessly.

![AYUSH Portal Screenshot](./frontend/src/assets/ayush-portal-screenshot.png)

---

## ✨ Features

- **Startup Registration:** Complete registration system for AYUSH sector startups
- **User Authentication:** Secure login with email/password and Google OAuth integration
- **Role-Based Access:** Different dashboards for startups, officials, and regulators
- **Application Management:** Create, track, and manage startup applications
- **Document Upload:** Cloudinary-powered file upload system for documents and images
- **Real-time Status Tracking:** Monitor your application status in real-time
- **Responsive Design:** Seamless experience across desktop, tablet, and mobile devices
- **Interactive Chatbot:** AI-powered assistance for common queries
- **Resource Center:** Access to guidelines, FAQs, and helpful resources

---

## 🛠️ Tech Stack

This project is a full-stack application built with the MERN stack, featuring modern authentication and cloud storage solutions.

### Frontend:

- **React 18:** Modern UI library with hooks
- **Vite:** Lightning-fast build tool and dev server
- **TypeScript:** Type-safe development
- **React Router v6:** Client-side routing
- **Tailwind CSS:** Utility-first CSS framework
- **Shadcn/ui:** Beautiful, accessible component library
- **Axios:** HTTP client with interceptors
- **React Hook Form:** Performant form validation
- **Zod:** TypeScript-first schema validation

### Backend:

- **Node.js:** JavaScript runtime environment
- **Express.js:** Fast, minimalist web framework
- **MongoDB:** NoSQL database for flexible data storage
- **Mongoose:** Elegant MongoDB object modeling
- **JWT:** Secure token-based authentication
- **Passport.js:** Authentication middleware
- **Google OAuth 2.0:** Social authentication integration
- **Cloudinary:** Cloud-based image and file management
- **Multer:** Multipart form data handling
- **bcrypt:** Password hashing and security

### DevOps & Deployment:

- **Docker:** Containerization for consistent deployments
- **Vercel:** Frontend hosting with automatic deployments
- **Render:** Backend hosting with Docker support
- **MongoDB Atlas:** Cloud database hosting

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/prajwal816/wellness-registry-portal.git
cd wellness-registry-portal
```

2. **Setup the Backend:**

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
touch .env
```

Your `backend/.env` file should look like this:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
CLIENT_URL=http://localhost:8080

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3. **Setup Google OAuth:**

- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a new project or select existing one
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized origins: `http://localhost:8080`
- Add authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
- Copy Client ID and Client Secret to your `.env` file

4. **Setup Cloudinary:**

- Sign up at [Cloudinary](https://cloudinary.com)
- Get your Cloud Name, API Key, and API Secret from the dashboard
- Add them to your `.env` file

5. **Setup the Frontend:**

```bash
# Navigate to the frontend directory from the root
cd ../frontend

# Install dependencies
npm install

# Create a .env.local file in the frontend directory
touch .env.local
```

Your `frontend/.env.local` file should look like this:

```env
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```

### Running the Application

You'll need to run both the backend and frontend servers in separate terminals.

1. **Run the Backend Server:**

```bash
# From the /backend directory
npm start
```

Your backend server should now be running on `http://localhost:5000`.

2. **Run the Frontend Development Server:**

```bash
# From the /frontend directory
npm run dev
```

Your React application should now be running on `http://localhost:8080`.

---

## 🌐 Deployment & Live Demo

This application is fully deployed and accessible online. The backend and frontend are hosted separately for optimal performance.

- **Frontend (Vercel):** [**https://wellness-registry-portal.vercel.app**](https://wellness-registry-portal.vercel.app)
- **Backend (Render):** [**https://ayushwellness-backend.onrender.com**](https://ayushwellness-backend.onrender.com)

### Deployment Strategy

This project uses a split-hosting model with automatic deployments:

#### 1. Backend on Render

The Node.js/Express backend is deployed on Render as a Docker container.

- **Service Type:** Web Service
- **Environment:** `Docker`
- **Root Directory:** `backend`
- **Dockerfile:** Custom multi-stage build for optimization
- **Auto-Deploy:** Enabled from GitHub main branch

**Environment Variables:**

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=https://wellness-registry-portal.vercel.app
GOOGLE_CALLBACK_URL=https://ayushwellness-backend.onrender.com/api/auth/google/callback
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=production
```

**Important Notes:**

- Render's free tier sleeps after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Consider using [UptimeRobot](https://uptimerobot.com) to keep it awake

#### 2. Frontend on Vercel

The React/Vite frontend is deployed on Vercel with automatic deployments.

- **Framework Preset:** `Vite`
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Auto-Deploy:** Enabled from GitHub main branch

**Environment Variables:**

```env
VITE_API_URL=https://ayushwellness-backend.onrender.com
VITE_NODE_ENV=production
```

#### 3. Production Google OAuth Setup

Update your Google Cloud Console with production URLs:

**Authorized JavaScript Origins:**

```
https://wellness-registry-portal.vercel.app
```

**Authorized Redirect URIs:**

```
https://ayushwellness-backend.onrender.com/api/auth/google/callback
```

---

## 🔐 Authentication Features

### Email/Password Authentication

- Secure password hashing with bcrypt
- JWT token-based sessions
- Password validation and strength requirements
- Account creation with role selection

### Google OAuth Integration

- One-click sign-in with Google
- Automatic account creation
- Secure token exchange
- Profile information sync

### Security Features

- HTTP-only cookies for token storage
- CORS protection with whitelist
- Rate limiting on authentication endpoints
- Input validation and sanitization
- XSS protection

---

## 📁 File Upload System

### Cloudinary Integration

- Secure cloud storage for documents and images
- Automatic image optimization and transformation
- Support for multiple file formats (JPG, PNG, PDF, DOC, DOCX)
- File size validation (10MB limit)
- Organized folder structure

### Upload Features

- Single and multiple file uploads
- Real-time upload progress
- Image preview before upload
- Avatar management for user profiles
- Document attachment for applications

---

## 📂 Project Structure

```
wellness-registry-portal/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── passport.js         # Passport OAuth config
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Application.js     # Application schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── applications.js    # Application routes
│   │   └── upload.js          # File upload routes
│   ├── Dockerfile             # Docker configuration
│   ├── server.js              # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities and contexts
│   │   ├── config/           # Configuration files
│   │   └── App.tsx           # Main app component
│   ├── vercel.json           # Vercel configuration
│   └── package.json
└── README.md
```

---

## 🎯 Key Features Explained

### Automatic Backend Wake-up

The application includes intelligent retry logic that automatically handles Render's free tier sleep mode:

- Detects network errors
- Automatically retries with exponential backoff
- Shows user-friendly progress messages
- No manual intervention required

### CORS Configuration

Smart CORS handling that allows:

- Production Vercel URL
- All Vercel preview deployments
- Local development URLs
- Automatic origin detection

### Responsive Design

Built with mobile-first approach:

- Tailwind CSS for responsive layouts
- Adaptive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Authors

- **Prajwal** - [GitHub Profile](https://github.com/prajwal816)

---

## 🙏 Acknowledgments

- AYUSH Ministry for the initiative
- MongoDB Atlas for database hosting
- Vercel for frontend hosting
- Render for backend hosting
- Cloudinary for file storage
- Google for OAuth services
- Shadcn/ui for beautiful components
- The open-source community

---

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

## 🔮 Future Enhancements

- [ ] Email verification system
- [ ] Two-factor authentication
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Notification system
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Video consultation feature
- [ ] API documentation with Swagger

---

**Made with ❤️ for the AYUSH community**
