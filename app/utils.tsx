import { cache } from 'react'
import Database from 'better-sqlite3';
import { sql } from '@vercel/postgres';

const dbPath = './public/carsSqlite.db';
const db = new Database(dbPath);

export const getItemFromDB = (query: string) => {
    let dbResult: unknown = null
    try {
        dbResult = db.prepare(query).get();
    } catch (error) {
        console.log("Failed query with error message: ", error)
    }
    return dbResult
}

/* TODO: Make async*/
export const getAndCacheItemsFromDB = cache((query: string) => {
    let dbResult: unknown = null
    try {
        dbResult = db.prepare(query).all();
    } catch (error) {
        console.log("Failed query with error message: ", error)
    }
    return dbResult
})