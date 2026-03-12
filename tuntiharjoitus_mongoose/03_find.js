require('dotenv').config();
const mongoose = require('mongoose');

const DB_NAME = 'opiskelijat';
const COLLECTION_NAME = 'Fullstack2026';

// --- Opiskelija Schema (same as in 02_schema.js) ---
const opiskelijaSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  enrollmentYear: { type: Number, required: true }
}, { collection: COLLECTION_NAME });

const Opiskelija = mongoose.model('Opiskelija', opiskelijaSchema);

// --- Find one student by first and last name ---
async function findOneByName(firstName, lastName) {
  console.log(`\nSearching for student: ${firstName} ${lastName}`);

  const student = await Opiskelija.findOne({ firstName, lastName });

  if (student) {
    console.log('Found student:');
    console.log(student);
  } else {
    console.log(`No student found with name: ${firstName} ${lastName}`);
  }
}

// --- Find all students by city ---
async function findByCity(city) {
  console.log(`\nSearching for students in city: ${city}`);

  const students = await Opiskelija.find({ city });

  if (students.length > 0) {
    console.log(`Found ${students.length} student(s) in ${city}:`);
    students.forEach(s => console.log(`  - ${s.firstName} ${s.lastName} (${s.studentId})`));
  } else {
    console.log(`No students found in city: ${city}`);
  }
}

// --- Find all students ---
async function findAll() {
  console.log('\nFetching all students:');

  const students = await Opiskelija.find({});

  if (students.length > 0) {
    console.log(`Found ${students.length} student(s) in total:`);
    students.forEach(s => console.log(`  - ${s.firstName} ${s.lastName} | ${s.city} | ${s.email}`));
  } else {
    console.log('No students found in collection');
  }
}

async function main() {
  try {
    // Connect to Atlas targeting the opiskelijat database
    await mongoose.connect(process.env.MONGODB_URI, { dbName: DB_NAME });
    console.log(`✅ Connected to database: ${DB_NAME}`);

    // Demo 1: Find one student by name
    await findOneByName('Matti', 'Virtanen');

    // Demo 2: Find all students from a specific city
    await findByCity('Helsinki');

    // Demo 3: Find all students in the collection
    await findAll();

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nConnection closed');
  }
}

main();