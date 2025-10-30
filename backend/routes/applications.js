const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Application = require('../models/Application');

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all applications (admin/reviewer only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'reviewer') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const applications = await Application.find().populate('user', 'name email');
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get application by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('user', 'name email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is authorized to view this application
    if (application.user.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'reviewer') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new application
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      practiceType,
      experience,
      qualifications,
      address,
      documents
    } = req.body;
    
    const newApplication = new Application({
      user: req.user.id,
      name,
      email,
      phone,
      practiceType,
      experience,
      qualifications,
      address,
      documents
    });
    
    const application = await newApplication.save();
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application
router.put('/:id', auth, async (req, res) => {
  try {
    let application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is authorized to update this application
    if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update fields
    const updatedFields = { ...req.body, updatedAt: Date.now() };
    
    application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (admin/reviewer only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'reviewer') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { status, reviewerNotes } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          status, 
          reviewerNotes,
          updatedAt: Date.now() 
        } 
      },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete application
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user is authorized to delete this application
    if (application.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await application.remove();
    res.json({ message: 'Application removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;