import React, { useState } from "react";
import axios from "axios";

const UserInfo = () => {
    const [userName, setUserName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/user-info', {name: userName})
            .then(response => {
                alert(`User ${response.data.name} is ${response.data.age} year old!`)
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.error)
                } else {
                    console.error("There was an error!", error)
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UserInfo;