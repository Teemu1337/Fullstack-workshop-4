# Mongoose Exercises - MongoDB Workshop

## What is Mongoose?

**Mongoose** is an Object Document Mapper (ODM) library for Node.js that provides a structured way to interact with MongoDB. It allows you to:

- Define **schemas** with validation rules for your data
- Create **models** that represent collections in MongoDB
- Perform CRUD operations (Create, Read, Update, Delete) with a clean API
- Validate data before saving to the database
- Handle relationships and complex queries elegantly

Mongoose sits between your application and MongoDB, providing structure, validation, and type safety.

---

## Exercises Overview

### 01_connection.js
**Purpose:** Test the connection to MongoDB Atlas using Mongoose

Demonstrates:
- Loading environment variables from `.env`
- Connecting to Atlas with `mongoose.connect()`
- Targeting a specific database with `dbName` option
- Ping the database to verify connection
- Properly closing the connection

**Run:** `node 01_connection.js`

---

### 02_schema.js
**Purpose:** Define a Mongoose schema and insert student documents into the collection

Demonstrates:
- Creating a Mongoose schema with field types and validation rules
- Defining validation patterns (regex) for `studentId` and `email`
- Creating a model from the schema
- Upserting documents (insert if not exists, update if exists)
- Avoiding duplicate inserts on re-runs

**Run:** `node 02_schema.js`

---

### 03_find.js
**Purpose:** Query student documents from the collection using Mongoose find methods

Demonstrates:
- `findOne()` — find a single student by firstName and lastName
- `find({ city })` — find all students from a specific city
- `find({})` — retrieve all documents in the collection
- Formatting and displaying query results

**Run:** `node 03_find.js`

---

### 04_update.js
**Purpose:** Update one or many student documents using Mongoose

Demonstrates:
- `updateOne()` — update a single student by `studentId`
- `updateMany()` — update multiple students matching a filter (by city)
- Using `$set` operator to update specific fields
- Checking `matchedCount` and `modifiedCount` to verify updates

**Imports:** The reusable schema from `models/opiskelijaSchema.js`

**Run:** `node 04_update.js`

---

### 05_delete.js
**Purpose:** Delete one or many student documents using Mongoose

Demonstrates:
- `findOneAndDelete()` — delete a single student and return the deleted document
- `deleteMany()` — delete all students matching a filter (by city)
- Checking `deletedCount` to verify deletions
- Listing remaining documents after deletions

**Imports:** The reusable schema from `models/opiskelijaSchema.js`

**Run:** `node 05_delete.js`

---

### 06_validation.js
**Purpose:** Demonstrate Mongoose schema validation errors

Demonstrates:
- How Mongoose validates data against schema rules
- **Demo 1:** Missing required fields
- **Demo 2:** Invalid `studentId` format (must be 7 digits starting with 2)
- **Demo 3:** Invalid `email` domain (must be `@student.laurea.fi`)
- **Demo 4:** Valid document that passes all validation rules
- Clear error messages showing which fields failed validation and why

**Run:** `node 06_validation.js`

---

## Project Structure

```
tuntiharjoitus_mongoose/
├── .env                          ← MongoDB Atlas connection URI
├── package.json
├── README.md
├── 01_connection.js
├── 02_schema.js
├── 03_find.js
├── 04_update.js
├── 05_delete.js
├── 06_validation.js
└── models/
    └── opiskelijaSchema.js       ← Reusable Opiskelija schema
```

---

## Setup

### 1. Install dependencies
```bash
npm install mongoose dotenv
```

### 2. Create `.env` file
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

### 3. Run exercises
```bash
node 01_connection.js
node 02_schema.js
node 03_find.js
node 04_update.js
node 05_delete.js
node 06_validation.js
```

---

## Student Document Example

```javascript
{
  studentId: "2000006",
  firstName: "Matti",
  lastName: "Virtanen",
  email: "matti.virtanen@student.laurea.fi",
  city: "Helsinki",
  enrollmentYear: 2024
}
```

---

## Key Mongoose Concepts

| Concept | Description |
|---------|------------|
| **Schema** | Defines the structure and validation rules for documents |
| **Model** | Represents a MongoDB collection and provides query methods |
| **Validation** | Enforces data integrity before saving to the database |
| **Upsert** | Insert if document doesn't exist, update if it does |
| **Operators** | `$set`, `$inc`, `$push` for modifying documents |

---

## Validation Rules in Our Schema

| Field | Type | Rules |
|-------|------|-------|
| `studentId` | String | Required, unique, must match `/^2\d{6}$/` (7 digits starting with 2) |
| `firstName` | String | Required |
| `lastName` | String | Required |
| `email` | String | Required, must match `@student.laurea.fi` |
| `city` | String | Required |
| `enrollmentYear` | Number | Required |
