import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { create, retrieve } from './model.js' 

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

// Retrieve all messages
app.get("/", async (req, res) => {
    const messages = await retrieve()
    res.json(messages)
})

// Create new message 
app.post("/", async (req, res) => {
    const { message } = req.body
    const id = await create(message)
    res.json(id)
})

// Listen
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})