const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


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
