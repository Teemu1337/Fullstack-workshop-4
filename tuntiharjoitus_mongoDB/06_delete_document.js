// Load environment variables from .env file
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Connection URI from environment variables
const uri = process.env.MONGODB_URI;

// Target database and collection
const DB_NAME = 'opiskelijat';
const COLLECTION_NAME = 'Fullstack2026';

// --- Delete one student by studentId ---
async function deleteOneStudent(client, studentId) {
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

    console.log(`\nDeleting student with studentId: ${studentId}`);

    // deleteOne removes the first document matching the filter
    const result = await collection.deleteOne({ studentId });

    if (result.deletedCount === 1) {
        console.log(`Successfully deleted student: ${studentId}`);
    } else {
        console.log(`No student found with studentId: ${studentId}`);
    }
}

// --- Delete many students by city ---
async function deleteManyStudents(client, city) {
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

    console.log(`\nDeleting all students from city: ${city}`);

    // deleteMany removes all documents matching the filter
    const result = await collection.deleteMany({ city });

    if (result.deletedCount > 0) {
        console.log(`Successfully deleted ${result.deletedCount} student(s) from ${city}`);
    } else {
        console.log(`No students found in city: ${city}`);
    }
}

// --- Main function ---
async function main() {
    // Create a new MongoClient instance
    const client = new MongoClient(uri);

    try {
        // Connect to Atlas cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        // Demo 1: Delete one student by studentId
        await deleteOneStudent(client, '2000005');

        // Demo 2: Delete many students by city
        await deleteManyStudents(client, 'Helsinki');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Always close the connection
        await client.close();
        console.log('\nConnection closed');
    }
}

main();