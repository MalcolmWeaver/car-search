import { cache } from 'react'
import Database from 'better-sqlite3';
import { sql } from '@vercel/postgres';

export const createVercelDB = async () => {
    const createReturn = await sql `  
        CREATE TABLE IF NOT EXISTS cars (
        Year INTEGER NOT NULL,
        Make TEXT NOT NULL,
        Model TEXT NOT NULL,
        Review TEXT,
        PRIMARY KEY (Year, Make, Model)
        )`;
    console.log(createReturn)
}

export const migrateSqliteToVercelDB = async () => {
    type CarType = { Year: string | number;
        Make: string; 
       Model: string; 
       Review: string;
    };
    const db = new Database('./public/carsSqlite.db');
    const getAllCarsQuery = `
        SELECT * FROM cars
        `;

    const result = db.prepare(getAllCarsQuery).all()
    let resultingCars: CarType[] = [];
    if (Array.isArray(result) && 
        result.every((car: any) => typeof car.Year === 'string' 
                                        || typeof car.Year === 'number')) {
        resultingCars = result as CarType[];
    } else {
      console.error('Invalid car types data structure.');
    }

    resultingCars.forEach(async (car: CarType) => {
        const insertReturn = await sql `
        INSERT INTO cars (year, make, model, review) 
            VALUES (${car.Year}, ${car.Make}, ${car.Model}, ${car.Review})
            ON CONFLICT DO NOTHING`;
        console.log(insertReturn)
    })
    
    // const createReturn = await sql `SELECT * FROM cars`;
    // console.log(createReturn)
}

export const getCars = async () => {
    // must change literal to update vercel
    const cars = await sql`SELECT year, make, model From cars`
    console.log(cars)
    return cars
}

export const getReview = async (year: string | number, make : string, model : string) => {
    // vercel sql not well documented.
    // refer to https://stackoverflow.com/a/76864573

    let query = `SELECT Review FROM cars WHERE year = $1 AND make = $2 AND model = $3;`;
    const params = [year, make, model]
    const reviewsReturn = await sql.query(query, params)
    if (reviewsReturn.rows.length !== 1) {
        console.log("Non unique (possibly empty) result for query: ", query, params);
        return null
    }
    return reviewsReturn.rows[0]
}

export const getItemFromDB_SqliteDeprecated = (query: string) => {
    const dbPath = './public/carsSqlite.db';
    const db = new Database(dbPath);
    let dbResult: unknown = null
    try {
        dbResult = db.prepare(query).get();
    } catch (error) {
        console.log("Failed query with error message: ", error)
    }
    return dbResult
}

/* TODO: Make async*/
export const getAndCacheItemsFromDB_SqliteDeprecated = cache((query: string) => {
    const dbPath = './public/carsSqlite.db';
    const db = new Database(dbPath);
    let dbResult: unknown = null
    try {
        dbResult = db.prepare(query).all();
    } catch (error) {
        console.log("Failed query with error message: ", error)
    }
    return dbResult
})