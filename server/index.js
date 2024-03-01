const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.post('/user-info', (req, res) => {
    const { name } = req.body
    if (name.length < 2) return res.status(400).json({error: "Name is too short."})
    const age = Math.floor(Math.random() * 100) + 1
    console.log(`${name} is ${age} years old`)
    res.json({ name, age })
});


