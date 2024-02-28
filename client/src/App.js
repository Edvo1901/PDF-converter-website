import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [data, setData] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/')
			.then(response => {
				setData(response.data)
			})
			.catch(error => console.error("There was an error!", error))
	}, [])

	const sendDataToBackend = () => {
		const dataToSend = {message: "This is frontend calling..."}
		axios.post('http://localhost:3001/send-data', dataToSend)
			.then(response => {
				console.log(`Response from server ${response.data}`)
			})
			.catch(error => console.error("There was an error sending data to the backend!", error));
	}

	return (
		<div>
			<p>Data from server: {data}</p>
			<button onClick={sendDataToBackend}>Send Data to Backend</button>
		</div>
	);
}

export default App;
