require('dotenv').config();
const mongoose = require('mongoose');

const DB_NAME = 'opiskelijat';
const COLLECTION_NAME = 'Fullstack2026';

// --- Define Mongoose Schema for a student ---
// Schema enforces structure and validation on documents
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
  // Use the existing Fullstack2026 collection
  collection: COLLECTION_NAME
});

// Create the model from the schema
const Opiskelija = mongoose.model('Opiskelija', opiskelijaSchema);

// --- Student seed data ---
// Matching the format used in previous native driver exercises
const students = [
  {
    studentId: '2000006',
    firstName: 'Matti',
    lastName: 'Virtanen',
    email: 'matti.virtanen@student.laurea.fi',
    city: 'Helsinki',
    enrollmentYear: 2024
  },
  {
    studentId: '2000007',
    firstName: 'Liisa',
    lastName: 'Mäkinen',
    email: 'liisa.makinen@student.laurea.fi',
    city: 'Espoo',
    enrollmentYear: 2025
  },
  {
    studentId: '2000008',
    firstName: 'Juhani',
    lastName: 'Korhonen',
    email: 'juhani.korhonen@student.laurea.fi',
    city: 'Vantaa',
    enrollmentYear: 2024
  }
];

async function main() {
  try {
    // Connect to Atlas targeting the opiskelijat database
    await mongoose.connect(process.env.MONGODB_URI, { dbName: DB_NAME });
    console.log(`✅ Connected to database: ${DB_NAME}`);

    // Insert students using upsert to avoid duplicates
    for (const student of students) {
      const result = await Opiskelija.updateOne(
        { studentId: student.studentId },  // filter by studentId
        { $set: student },                  // update fields
        { upsert: true }                    // insert if not found
      );

      if (result.upsertedCount > 0) {
        console.log(`Inserted student: ${student.firstName} ${student.lastName}`);
      } else {
        console.log(`Updated student: ${student.firstName} ${student.lastName}`);
      }
    }

    console.log('\n✅ All students processed successfully');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Connection closed');
  }
}

main();