import { cache } from 'react'
import Database from 'better-sqlite3';

const dbPath = './public/carsSqlite.db';

export const getItemFromDB = (query: string) => {
    const db = new Database(dbPath);
    const dbQuery = query
    let dbResult: unknown = null
    try {
        dbResult = db.prepare(dbQuery).get();
    } catch (error) {
        console.log("Failed query with error message: ", error)
    }
    return dbResult
}

/* TODO: Make async*/
export const getAndCacheItemsFromDB = cache((query: string) => {
    const db = new Database(dbPath);
    const dbQuery = query
    let dbResult: unknown = null
    try {
        dbResult = db.prepare(dbQuery).all();
    } catch (error) {
        console.log("Failed query with error message: ", error)
    }
    return dbResult
})