import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import './LoginPage.css';

// firebase.initializeApp(firebaseConfig);

function LoginPage() {

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: ''
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, email} = result.user;
        const signInUser = { name: displayName, email}
        setLoggedInUser(signInUser)
        history.replace(from);
      })

      // .then(result => {
      //   var users = result.user;
      //   const {displayName, email} =users;
      //   const signInUser = {name: displayName, email}
      //   setLoggedInUser(signInUser)
      //   history.replace(from);
      // })

      .catch(err => {
        const errorMessage = err.message
        console.log(errorMessage);
      })
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfoErr = { ...user };
          newUserInfoErr.error = '';
          newUserInfoErr.success = true;
          setUser(newUserInfoErr)
          updateUserName(user.name)
        })

        .catch((error) => {
          const newUserInfoErr = { ...user }
          newUserInfoErr.error = error.message;
          newUserInfoErr.success = false;
          setUser(newUserInfoErr);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {

          var users = res.user;

          const newUserInfoErr = { ...user };
          newUserInfoErr.error = '';
          newUserInfoErr.success = true;
          setUser(newUserInfoErr)
          setLoggedInUser(users)
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfoErr = { ...user }
          newUserInfoErr.error = error.message;
          newUserInfoErr.success = false;
          setUser(newUserInfoErr);
        });
    }
    e.preventDefault();
  }

  const updateUserName = name7 => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name7
    }).then(function () {
      console.log('user name updated successfully')
    }).catch(function (error) {
      console.log(error)
    });
  }

  return (
    <div>

      <div className="box">
        <h2>Sign in your account</h2>
        <form onSubmit={handleSubmit}>

          {newUser && <p>Name</p>}
          {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" required />}

          <p>Email</p>
          <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Email" required />
          
          <p>Password</p>
          <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter Password" required />

          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
          <h4 style={{ textAlign: "center", margin: "0" }} htmlFor="newUser">I am new user </h4>

          <input type="submit" value="Sign in" />
        </form>
        {
          <button onClick={handleSignIn}>Sign in Google</button>
        }
      </div>

    </div>


  );
}

export default LoginPage;
