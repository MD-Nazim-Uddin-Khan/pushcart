import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Destination from "./components/Destination/Destination";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LoginPage from "./components/LoginPage/LoginPage";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>

      {/* <h3>Email : {loggedInUser.email}</h3> */}
      {/* <p>Name : {loggedInUser.name}</p> */}

      <Header></Header>

      <Switch>

        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/home">
          <Home/>
        </Route>

        <PrivateRoute path="/destination">
          <Destination/>
        </PrivateRoute>

        <Router path="/login">
          <LoginPage/>
        </Router>

        <Router path="*">
        <NotFound/>
        </Router>
          
      </Switch>
    </Router>
    </UserContext.Provider>

  );
}

export default App;
