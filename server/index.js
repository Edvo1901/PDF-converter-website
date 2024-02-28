const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello worldddddd!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.post('/send-data', (req, res) => {
    console.log(`Data received from front end ${req.body.message}`)
    res.status(200).send("Data received successfully")
})


