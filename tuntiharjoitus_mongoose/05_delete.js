require('dotenv').config();
const mongoose = require('mongoose');

// Import Opiskelija model from the models folder
const Opiskelija = require('./models/opiskelijaSchema');

const DB_NAME = 'opiskelijat';

// --- Delete one student by studentId ---
async function deleteOneStudent(studentId) {
  console.log(`\nDeleting student with studentId: ${studentId}`);

  // findOneAndDelete removes the document and returns the deleted document
  const deleted = await Opiskelija.findOneAndDelete({ studentId });

  if (deleted) {
    console.log(`✅ Successfully deleted student: ${deleted.firstName} ${deleted.lastName}`);
  } else {
    console.log(`❌ No student found with studentId: ${studentId}`);
  }
}

// --- Delete many students by city ---
async function deleteManyStudents(city) {
  console.log(`\nDeleting all students from city: ${city}`);

  // deleteMany removes all documents matching the filter
  const result = await Opiskelija.deleteMany({ city });

  if (result.deletedCount > 0) {
    console.log(`✅ Successfully deleted ${result.deletedCount} student(s) from ${city}`);
  } else {
    console.log(`❌ No students found in city: ${city}`);
  }
}

// --- List remaining students after deletions ---
async function listRemaining() {
  console.log('\nRemaining students in collection:');

  const students = await Opiskelija.find({});

  if (students.length > 0) {
    students.forEach(s => console.log(`  - ${s.firstName} ${s.lastName} | ${s.city} | ${s.studentId}`));
  } else {
    console.log('  Collection is empty');
  }
}

async function main() {
  try {
    // Connect to Atlas targeting the opiskelijat database
    await mongoose.connect(process.env.MONGODB_URI, { dbName: DB_NAME });
    console.log(`✅ Connected to database: ${DB_NAME}`);

    // Demo 1: Delete one student by studentId
    await deleteOneStudent('2000008');

    // Demo 2: Delete many students by city
    await deleteManyStudents('Helsinki');

    // Show remaining students after deletions
    await listRemaining();

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nConnection closed');
  }
}

main();