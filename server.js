require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.get("/todos", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

app.post("/todos", async (req, res) => {
    try {
        const { title } = req.body
        const result = await pool.query(
            'INSERT INTO todos (title) VALUES ($1) RETURNING *',
            [title]
        )
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const result = await pool.query(
            'UPDATE todos SET title = $1 WHERE id = $2 RETURNING *',
            [title, id]
        )
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING *',
            [id]
        )
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

app.listen(5000, () => console.log('server running on port 5000'))