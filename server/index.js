import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {fileTypeFromStream} from 'file-type';
import fs from 'node:fs';
import libre from 'libreoffice-convert';

const app = express()
const PORT = process.env.PORT || 3001
const upload = multer({ dest: 'uploads/' })
libre.convertAsync = require('util').promisify(libre.convert)

const extAllowed = ["docx"]
const mimeAllowed = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

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

app.post('/docsupload', upload.single('file'), async (req, res) => {
    try {
        const stream = fs.createReadStream(req.file.path)
        const fileType = await fileTypeFromStream(stream)
        if (fileType) {
            if (extAllowed.includes(fileType.ext) || mimeAllowed.includes(fileType.mine)) {
                console.log(`File valid: ${fileType.ext}`)
            } else {
                console.log(`Invalid`)
            }
        }
    } catch(error) {
        console.log(error)
        res.status(500).send("Error while checking file type.")
    } finally {
        fs.unlink(req.file.path, err => {
            if (err) console.error("Error deleting the file.", err);
        })
    }
})
