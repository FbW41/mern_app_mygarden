import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import NavTop from "./components/Nav_top";
import AllPlant from "./components/All_plant";
import AddNew from "./components/Add_new";
import SignUp from "./components/Sign_up";
import SignIn from "./components/Sign_in";
import SignInPassport from "./components/SignInPassport";
import Profile from "./components/Profile";
import Contact from "./components/Contact";

function App() {
=======
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
>>>>>>> a444ab6509570406f0f47281239ca8f040a43e89
  return (
    <Router>
      <div className="App">
        <Container>
<<<<<<< HEAD
          <NavTop />
          <Switch>
            <Route exact path="/">
              <h1>Landing page only</h1>
            </Route>
            <Route path="/add_new">
              <AddNew />
            </Route>
            <Route path="/all_plant">
              <AllPlant />
            </Route>
            <Route path="/signinform">
              <SignIn />
            </Route>
            <Route path="/signupform">
              <SignUp />
            </Route>
            <Route path="/signinformPassport">
              <SignInPassport />
            </Route>
            <Route path="/profile/:id">
              <Profile />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
=======
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
>>>>>>> a444ab6509570406f0f47281239ca8f040a43e89
        </Container>
      </div>
    </Router>
  );
}

export default App;
