import dotenv from 'dotenv'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

dotenv.config()

export const db = await open({
    filename: process.env.DB_FILE || './database.sqlite',
    driver: sqlite3.Database
})

// Create table if not exist
await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)
