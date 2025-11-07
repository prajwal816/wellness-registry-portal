const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const uploadRoutes = require('./routes/upload');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// CORS configuration for production and development
const getAllowedOrigins = () => {
  const origins = [
    // Primary client URL (Vercel deployment)
    process.env.CLIENT_URL,

    // Local development URLs
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5173'
  ];

  // Filter out undefined/null values
  return origins.filter(Boolean);
};

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = getAllowedOrigins();

    // Log request origin
    console.log('Request origin:', origin);

    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    }
    // Allow all Vercel preview deployments (*.vercel.app)
    else if (origin && origin.includes('.vercel.app')) {
      console.log('Allowing Vercel preview deployment:', origin);
      callback(null, true);
    }
    else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-auth-token',
    'Accept',
    'Origin',
    'X-Requested-With'
  ],
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOptions));
app.use(passport.initialize());

// Configure Passport
require('./config/passport');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Ayush Wellness Registry API is running');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});