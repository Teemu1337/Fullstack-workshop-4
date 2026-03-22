const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Task 1
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Task 2
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('Post', postSchema);
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`
  Available routes:
  GET  /              - Home page
  GET  /about         - About page
  GET  /contact       - Contact page
  
  API endpoints (when tasks are completed):
  POST   /api/posts        - Create a new post
  GET    /api/posts        - Get all posts
  GET    /api/posts/:id    - Get a single post
  PUT    /api/posts/:id    - Update a post
  DELETE /api/posts/:id    - Delete a post
  `);
});
