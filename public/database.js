import Database from 'better-sqlite3';

// Create or open a database file
// must be run from inside /car-search
const db = new Database('./public/carsSqlite.db');

// Define the SQL query to create the table with the specified schema
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS cars (
    Year INTEGER NOT NULL,
    Make TEXT NOT NULL,
    Model TEXT NOT NULL,
    Review TEXT,
    PRIMARY KEY (Year, Make, Model)
  )
`;

// Run the SQL query
db.exec(createTableQuery);

// Export the database instance
export default db;

import cachedCarReviews from './CarReviews.js';

// If you want to populate it from a file, uncomment this
// const db = new Database('./public/carsSqlite.db');

// const insertReviewQuery = `
//   INSERT INTO cars (Year, Make, Model, Review) 
//   VALUES (?, ?, ?, ?)
// `;

// // Prepare the insert statement
// const insertStmt = db.prepare(insertReviewQuery);

// // Insert each review from the cachedCarReviews array into the database
// cachedCarReviews.forEach(review => {
//   const { Year, Make, Model, Review } = review;
//   insertStmt.run(Year, Make, Model, Review);
// });

// db.close();