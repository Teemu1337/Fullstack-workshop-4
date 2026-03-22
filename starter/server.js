const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
// Testi
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.use(express.json());
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

// Task 2
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
  author: { 
    type: String,
    default: 'Anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

// Task 3
app.post('/api/posts', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    const post = new Post({
      title,
      description
    });
    
    const savedPost = await post.save();
    res.status(201).json(savedPost);
    
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).json({ error: err.message });
  }
});

// Task 4 
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task 5 update
app.put('/api/posts/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const { title, description } = req.body;
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(updatedPost);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).json({ error: err.message });
  }
});

// delete
app.delete('/api/posts/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`
  Available routes:
  GET  /              - Home page
  GET  /about         - About page
  GET  /contact       - Contact page
  
  API endpoints:
  POST   /api/posts        - Create a new post
  GET    /api/posts        - Get all posts
  GET    /api/posts/:id    - Get a single post
  PUT    /api/posts/:id    - Update a post
  DELETE /api/posts/:id    - Delete a post
  `);
});