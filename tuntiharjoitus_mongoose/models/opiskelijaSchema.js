const mongoose = require('mongoose');

const COLLECTION_NAME = 'Fullstack2026';

// --- Opiskelija Schema definition ---
// Defines the structure and validation rules for student documents
const opiskelijaSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    match: /^2\d{6}$/  // 7 digits starting with 2
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[a-z.]+@student\.laurea\.fi$/  // must be @student.laurea.fi
  },
  city: {
    type: String,
    required: true
  },
  enrollmentYear: {
    type: Number,
    required: true
  }
}, {
  // Target the existing Fullstack2026 collection
  collection: COLLECTION_NAME
});

// Export the model to be used in other modules
module.exports = mongoose.model('Opiskelija', opiskelijaSchema);