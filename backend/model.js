import { db } from './database.js'

export async function create(message) {
    const result = await db.run('INSERT INTO messages (message) VALUES (?)', [message])
    return { id: result.lastID }
}

export async function retrieve() {
    return db.all('SELECT * FROM messages')
}