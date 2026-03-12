# MongoDB Native Driver Exercises - CRUD Operations Workshop

## What is MongoDB?

**MongoDB** is a NoSQL document database that stores data in flexible, JSON-like documents called collections. Unlike traditional relational databases with tables and rows, MongoDB allows you to store nested data structures without enforcing a rigid schema.

Key features:
- Document-oriented storage (BSON format)
- Flexible schema design
- Powerful query language
- Scalable and high-performance
- Atlas cloud hosting for easy deployment

---

## What are CRUD Operations?

**CRUD** stands for the four fundamental database operations:

| Operation | Description | MongoDB Method |
|-----------|-------------|----------------|
| **Create** | Add new documents to a collection | `insertOne()`, `insertMany()` |
| **Read** | Retrieve documents from a collection | `findOne()`, `find()` |
| **Update** | Modify existing documents | `updateOne()`, `updateMany()` |
| **Delete** | Remove documents from a collection | `deleteOne()`, `deleteMany()` |

All exercises in this workshop demonstrate these CRUD operations using the MongoDB native driver.

---

## Exercises Overview

### 01_connection.js
**Purpose:** Establish a connection to MongoDB Atlas

Demonstrates:
- Loading environment variables from `.env` file
- Connecting to Atlas cluster using `MongoClient`
- Verifying the connection is successful
- Properly closing the connection

**Operations:** Connection setup only (no CRUD)

**Run:** `node 01_connection.js`

---

### 02_create_collection.js
**Purpose:** Create a database, collection, and insert student documents

Demonstrates:
- **CREATE operation:** `insertOne()` and `insertMany()`
- Creating a database named `opiskelijat`
- Creating a collection named `Fullstack2026`
- Inserting 5 student documents with proper data structure
- Using upsert (update if exists, insert if not) to avoid duplicates
- Checking if collection already exists before creation

**CRUD Focus:** **CREATE** (insert operation)

**Run:** `node 02_create_collection.js`

---

### 03_find_documents.js
**Purpose:** Retrieve student documents from the collection

Demonstrates:
- **READ operation:** `findOne()` and `find()`
- Finding a single student by firstName and lastName
- Finding all students from a specific city
- Iterating through result arrays
- Handling cases when no documents are found

**CRUD Focus:** **READ** (query operations)

**Run:** `node 03_find_documents.js`

---

### 04_add_document.js
**Purpose:** Add new student documents to the existing collection

Demonstrates:
- **CREATE operation:** `insertOne()` for single documents
- **CREATE operation:** `insertMany()` for multiple documents
- Duplicate prevention by checking existing `studentId` values
- Handling insertion success/failure
- Adding documents to an already populated collection

**CRUD Focus:** **CREATE** (insert operations)

**Run:** `node 04_add_document.js`

---

### 05_update_documents.js
**Purpose:** Modify existing student documents

Demonstrates:
- **UPDATE operation:** `updateOne()` to modify a single document
- **UPDATE operation:** `updateMany()` to modify multiple documents
- Using the `$set` operator to update specific fields
- Filtering documents by `studentId` or `city`
- Checking `matchedCount` and `modifiedCount` for verification
- Updating different field types (string, array)

**CRUD Focus:** **UPDATE** (modification operations)

**Run:** `node 05_update_documents.js`

---

### 06_delete_document.js
**Purpose:** Remove student documents from the collection

Demonstrates:
- **DELETE operation:** `deleteOne()` to remove a single document
- **DELETE operation:** `deleteMany()` to remove multiple documents
- Filtering documents by `studentId` or `city`
- Checking `deletedCount` for verification
- Handling cases when no documents match the filter

**CRUD Focus:** **DELETE** (removal operations)

**⚠️ Warning:** This exercise permanently removes data. Run `02_create_collection.js` to restore test data.

**Run:** `node 06_delete_document.js`

---

### 07_remove_collection.js
**Purpose:** Clean up by removing the entire collection and database

Demonstrates:
- Dropping a collection using `collection.drop()`
- Dropping an entire database using `dropDatabase()`
- Checking if collection exists before attempting to drop
- Final cleanup after all exercises

**Operations:** Database/collection removal (destructive)

**⚠️ Warning:** This permanently removes all data in the collection and database.

**Run:** `node 07_remove_collection.js`

---

## Project Structure

```
tuntiharjoitus_mongoDB/
├── .env                          ← MongoDB Atlas connection URI
├── package.json
├── README.md
├── 01_connection.js              ← Connection setup
├── 02_create_collection.js       ← CREATE: insert students
├── 03_find_documents.js          ← READ: find students
├── 04_add_document.js            ← CREATE: add more students
├── 05_update_documents.js        ← UPDATE: modify students
├── 06_delete_document.js         ← DELETE: remove students
└── 07_remove_collection.js       ← Cleanup: drop collection/database
```

---

## Setup

### 1. Install dependencies
```bash
npm install mongodb dotenv
```

### 2. Create `.env` file with your Atlas connection URI
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

### 3. Run exercises in order
```bash
node 01_connection.js
node 02_create_collection.js
node 03_find_documents.js
node 04_add_document.js
node 05_update_documents.js
node 06_delete_document.js
node 07_remove_collection.js
```

---

## Student Document Example

```javascript
{
  _id: ObjectId("..."),           // Auto-generated by MongoDB
  studentId: "2000001",
  firstName: "Aku",
  lastName: "Ankka",
  email: "aku.ankka@student.laurea.fi",
  city: "Helsinki",
  enrollmentYear: 2024
}
```

---

## CRUD Operations Summary

### Create (02, 04)
```javascript
await collection.insertOne(document);           // Single
await collection.insertMany([doc1, doc2, ...]); // Multiple
```

### Read (03)
```javascript
await collection.findOne({ filter });    // Single document
await collection.find({ filter }).toArray(); // Array of documents
```

### Update (05)
```javascript
await collection.updateOne({ filter }, { $set: updates });   // Single
await collection.updateMany({ filter }, { $set: updates });  // Multiple
```

### Delete (06)
```javascript
await collection.deleteOne({ filter });   // Single
await collection.deleteMany({ filter });  // Multiple
```

---

## Key MongoDB Concepts

| Concept | Description |
|---------|------------|
| **Database** | Container for collections (e.g., `opiskelijat`) |
| **Collection** | Container for documents (e.g., `Fullstack2026`) |
| **Document** | JSON-like record with fields and values |
| **ObjectId** | Auto-generated unique identifier for each document |
| **Filter** | Query criteria to find/modify/delete documents |
| **Operator** | `$set`, `$inc`, `$push` for modifying documents |

---

## Common Filters

```javascript
{ studentId: "2000001" }           // Exact match
{ city: "Helsinki" }               // Find by city
{ enrollmentYear: { $gt: 2023 } }  // Greater than
{ city: { $in: ["Helsinki", "Espoo"] } } // In array
```

---

## Learning Path

1. **01_connection.js** — Understand how to connect to Atlas
2. **02_create_collection.js** — Learn to CREATE documents
3. **03_find_documents.js** — Learn to READ documents
4. **04_add_document.js** — Practice CREATE with different methods
5. **05_update_documents.js** — Learn to UPDATE documents
6. **06_delete_document.js** — Learn to DELETE documents
7. **07_remove_collection.js** — Cleanup and final observations

---

## Next Steps

After mastering CRUD operations:
- Explore **Mongoose** for structured schema validation (see `../tuntiharjoitus_mongoose/`)
- Learn advanced queries with aggregation pipelines
- Implement indexes for performance optimization
- Build a full-stack application with Express + MongoDB
