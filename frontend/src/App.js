import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUserName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  // handler
  // receive the username and update the state
  const getName = (event)=> {
     // update the state
     setUserName(event.target.value);
  }
  const sendToBackend = ()=>{
    // send data to backend by API call
    // fetch('http://localhost:5000/user/data', {
    //   method: 'POST',
    //   body: username
    // })
    // .then(response=> response.json())
    // .then(data=> console.log(data))
    
    axios.post('http://localhost:5000/user/data', {username})
    .then(response=> {
      console.log(response.data.country)
      const backendData = response.data;
      setSuccessMsg(backendData.msg + ' user name is: ' + backendData.username)
    })
    .catch(error=> console.log(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN fullstack app Test simple way</h1>
        <h3>{successMsg}</h3>
        <label>Username:</label>
        <input type="text" onChange={getName}/>
        <button onClick={sendToBackend} type="submit">
          Send to Backend
        </button>
      </header>
    </div>
  );
}

export default App;
