import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavTop from './components/Nav_top';
import AllPlant from './components/All_plant';
import AddNew from './components/Add_new';
import SignUp from './components/Sign_up';
import SignIn from './components/Sign_in';
import SignInPassport from './components/SignInPassport';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Jwt_Profile from './components/Jwt_profile';
import Contactus from './components/Contactus';

function App() {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({
    username: ''
  });
  const [permission, setPermission] = useState(false);
  useEffect(()=> {
    const userToken = localStorage.getItem('currentToken');
    if(userToken) {
      // Get the user data from backend by jwt verify
      axios.post('/user/jwt/getUser', {userToken})
      .then(res=> {
        setUser(res.data)
        setPermission(true);
      })
      setToken(true)
    }
  }, [])
  return (
    <Router>
    <div className="App">
        <Container>
           <NavTop/>
           <Switch>
              <Route exact path="/">
                <h1>Landing page only</h1>
              </Route>
              <Route path="/add_new">
                {permission ? <AddNew /> : <h1>Sorry! No permission to see this page</h1>}
              </Route>
              <Route path="/all_plant">
                <AllPlant />
              </Route>
              <Route path="/signinform">
                  {token ? <Jwt_Profile data={user}/> :  <SignIn/>}
              </Route>
              <Route path="/signupform">
                <SignUp/>
              </Route>
              <Route path="/signinformPassport">
                <SignInPassport/>
              </Route>
              <Route path="/profile/:id">
                <Profile/>
              </Route>
              <Route path="/contactus">
                <Contactus/>
              </Route>
           </Switch>
        </Container>
    </div>
    </Router>
  );
}

export default App;
