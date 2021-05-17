import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {
  // const state = {
  //   username: ''
  // }
  const [username, setUserName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  // handler
  // receive the username and update the state
  const getName = (event)=> {
     // update the state
     setUserName(event.target.value);
  }
  const sendToBackend = (data)=>{
    // send data to backend by API call
    axios.post('http://localhost:5000/user/data', {username: data})
    .then(response=> {
      console.log(response.data)
      setSuccessMsg(response.data.msg + ' user name is: ' + response.data.username)
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
        <button onClick={()=> sendToBackend(username)} type="submit">
          Send to Backend
        </button>
      </header>
    </div>
  );
}

export default App;
