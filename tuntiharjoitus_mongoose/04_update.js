require('dotenv').config();
const mongoose = require('mongoose');

// Import Opiskelija model from the models folder
const Opiskelija = require('./models/opiskelijaSchema');

const DB_NAME = 'opiskelijat';

// --- Update one student by studentId ---
async function updateOneStudent(studentId, updatedFields) {
  console.log(`\nUpdating student with studentId: ${studentId}`);

  const result = await Opiskelija.updateOne(
    { studentId },        // filter by studentId
    { $set: updatedFields } // fields to update
  );

  if (result.matchedCount === 0) {
    console.log(`No student found with studentId: ${studentId}`);
  } else if (result.modifiedCount > 0) {
    console.log(`✅ Successfully updated student: ${studentId}`);
    console.log('Updated fields:', updatedFields);
  } else {
    console.log(`Student ${studentId} already has these values, no changes made`);
  }
}

// --- Update many students by city ---
// ...existing code...
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function updateManyStudents(filterCity, updatedFields) {
  console.log(`\nUpdating all students in city: ${filterCity}`);

  // Diagnostic: show existing city values in current collection
  const cities = await Opiskelija.distinct('city');
  console.log('Available city values:', cities);

  // Case-insensitive exact city match, trims user input
  const cityRegex = new RegExp(`^${escapeRegex(filterCity.trim())}$`, 'i');

  const result = await Opiskelija.updateMany(
    { city: cityRegex },
    { $set: updatedFields }
  );

  const matched = result.matchedCount ?? result.n ?? 0;
  const modified = result.modifiedCount ?? result.nModified ?? 0;

  console.log(`Matched: ${matched} | Modified: ${modified}`);

  if (modified > 0) {
    console.log(`✅ Successfully updated ${modified} student(s) in ${filterCity}`);
  } else {
    console.log(`No students updated in city: ${filterCity}`);
  }
}
// ...existing code...
// ...existing code...

async function main() {
  try {
    // Connect to Atlas targeting the opiskelijat database
    await mongoose.connect(process.env.MONGODB_URI, { dbName: DB_NAME });
    console.log(`✅ Connected to database: ${DB_NAME}`);

    // Demo 1: Update one student's city by studentId
    await updateOneStudent('2000006', { city: 'Espoo' });

    // Demo 2: Update all students in Espoo - add campus field
    await updateManyStudents('Espoo', { campus: 'Leppävaara' });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nConnection closed');
  }
}

main();