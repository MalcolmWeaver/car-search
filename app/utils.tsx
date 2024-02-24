import { cache } from 'react'
import Database from 'better-sqlite3';

const dbPath = './public/carsSqlite.db';

export const getItemFromDB = (query: string) => {
    const db = new Database(dbPath);
    const dbQuery = query
    const dbResult: unknown = db.prepare(dbQuery).get();
    return dbResult
}

/* TODO: Make async*/
export const getAndCacheItemsFromDB = cache((query: string) => {
    const db = new Database(dbPath);
    const dbQuery = query
    const dbResult: unknown = db.prepare(dbQuery).all();
    return dbResult
})