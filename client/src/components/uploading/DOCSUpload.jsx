import React, { useState, useRef } from 'react';
import "./DOCSUpload.css";
import axios from "axios";

const DOCSUpload = () => {
    const fileInputRef = useRef()
    const [fileName, setFileName] = useState();

    const handleClickUpload = () => {
        fileInputRef.current.click()
    }

    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            setFileName(fileUploaded.name)

            const formData = new FormData()
            formData.append("file", fileUploaded)
            console.log(formData)
            try {
                const response = await axios.post('http://localhost:3001/docsupload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                alert("Successfully uploaded")
            } catch (error) {
                alert("Error uploading file.");
            }
        } else {
            alert("Only .docx files are allowed!")
        }
    }

    return (
        <div>
            <button onClick={handleClickUpload} className="button-upload">
                Upload a file
            </button>
            {fileName && <div>Selected file: {fileName}</div>}
            <input
                onChange={handleChange}
                ref={fileInputRef}
                multiple={false}
                style={{display:'none'}}
                type="file"
            />
        </div>
    )
}

export default DOCSUpload;