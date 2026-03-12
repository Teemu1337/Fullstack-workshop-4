require('dotenv').config();
const mongoose = require('mongoose');

// Import Opiskelija model from the models folder
const Opiskelija = require('./models/opiskelijaSchema');

const DB_NAME = 'opiskelijat';

// --- Helper to print validation errors clearly ---
function printValidationError(error) {
  if (error.name === 'ValidationError') {
    console.log('❌ Validation failed:');
    // Loop through each failed field and print the reason
    Object.values(error.errors).forEach(err => {
      console.log(`  - Field "${err.path}": ${err.message}`);
    });
  } else {
    console.error('❌ Unexpected error:', error.message);
  }
}

// --- Demo 1: Missing required fields ---
async function demoMissingFields() {
  console.log('\n--- Demo 1: Missing required fields ---');
  try {
    const student = new Opiskelija({
      firstName: 'Testi'
      // missing: studentId, lastName, email, city, enrollmentYear
    });
    await student.save();
  } catch (error) {
    printValidationError(error);
  }
}

// --- Demo 2: Invalid studentId format ---
async function demoInvalidStudentId() {
  console.log('\n--- Demo 2: Invalid studentId format ---');
  try {
    const student = new Opiskelija({
      studentId: '1234',         // wrong: must be 7 digits starting with 2
      firstName: 'Testi',
      lastName: 'Opiskelija',
      email: 'testi.opiskelija@student.laurea.fi',
      city: 'Helsinki',
      enrollmentYear: 2025
    });
    await student.save();
  } catch (error) {
    printValidationError(error);
  }
}

// --- Demo 3: Invalid email format ---
async function demoInvalidEmail() {
  console.log('\n--- Demo 3: Invalid email format ---');
  try {
    const student = new Opiskelija({
      studentId: '2000099',
      firstName: 'Testi',
      lastName: 'Opiskelija',
      email: 'testi.opiskelija@gmail.com',  // wrong: must be @student.laurea.fi
      city: 'Helsinki',
      enrollmentYear: 2025
    });
    await student.save();
  } catch (error) {
    printValidationError(error);
  }
}

// --- Demo 4: Valid student --- should pass all validation
async function demoValidStudent() {
  console.log('\n--- Demo 4: Valid student document ---');
  try {
    const student = new Opiskelija({
      studentId: '2000099',
      firstName: 'Testi',
      lastName: 'Opiskelija',
      email: 'testi.opiskelija@student.laurea.fi',
      city: 'Helsinki',
      enrollmentYear: 2025
    });
    await student.save();
    console.log(`✅ Student saved successfully: ${student.firstName} ${student.lastName}`);

    // Clean up - remove the test student after demo
    await Opiskelija.deleteOne({ studentId: '2000099' });
    console.log('✅ Test student removed after demo');
  } catch (error) {
    printValidationError(error);
  }
}

async function main() {
  try {
    // Connect to Atlas targeting the opiskelijat database
    await mongoose.connect(process.env.MONGODB_URI, { dbName: DB_NAME });
    console.log(`✅ Connected to database: ${DB_NAME}`);

    // Run all validation demos
    await demoMissingFields();
    await demoInvalidStudentId();
    await demoInvalidEmail();
    await demoValidStudent();

    console.log('\n✅ All validation demos completed');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Connection closed');
  }
}

main();