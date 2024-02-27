import Database from 'better-sqlite3';
import {sql} from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private'

// This should all be done from vercel dashboard

// Create or open a database file
// must be run from inside /car-search
const db = new Database('./public/carsSqlite.db');

// one time copy to postgress

const getAllCarsQuery = `
  SELECT * FROM cars
`;

let result = db.prepare(getAllCarsQuery).all()

console.log({
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
});

// const createReturn = await sql `  
//   CREATE TABLE IF NOT EXISTS cars (
//   Year INTEGER NOT NULL,
//   Make TEXT NOT NULL,
//   Model TEXT NOT NULL,
//   Review TEXT,
//   PRIMARY KEY (Year, Make, Model)
// )`;
// console.log(createReturn)

// const {rows} = await sql `const insertQuery = "INSERT INTO  (column1, column2, ...) VALUES (?, ?, ...);"`;
// // Export the database instance
// export default db;