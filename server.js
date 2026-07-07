const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let todos = [{id: 1, title: "Learn Express", is_completed: false}]

app.get("/todos", (req, res) => {
    res.json(todos)
})

app.post("/todos", (req, res) => {
    const nextTodo ={id: todos.length + 1, title: req.body.title, is_completed: false}
    todos.push(nextTodo)
    res.json(nextTodo)
})

app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id)
    const newTitle = req.body.title
    todos = todos.map((todo) => todo.id === id ? { ...todo, title: newTitle } : todo)
    res.json(todos)
})

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id)
    todos = todos.filter((todos) => todos.id !== id)
    res.json(todos)
})

app.listen(5000, () => console.log('server running on port 5000'))