import React from 'react';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase-config';

const Register = (props) => {
  const showProfiles = (id) => {
    props.history.push(`/profiledetail/${id}`);
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginEmail, setLogEmail] = useState('');
  const [loginPassword, setLogPassword] = useState('');
  const [user, setUser] = useState({});
  const toggleLogIn = () => {
    setLoggedIn(!loggedIn);
  };
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        regEmail,
        regPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      toggleLogIn();

      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {loggedIn === false ? (

        <div className="auth-form">
         
          <div>
            <h1>Welcome to snowBook</h1>
            <h3>Register</h3>
            <input
              onChange={(event) => {
                setRegEmail(event.target.value);
              }}
              placeholder={'email address'}
            ></input>
            <input
              onChange={(event) => {
                setRegPassword(event.target.value);
              }}
              type="password"
              placeholder={'Password'}
            ></input>

            <button className="auth-btn" onClick={register}>
              Add Account
            </button>
          </div>

          <div>
            <h3>Login Here</h3>
            <input
              placeholder="email address"
              onChange={(event) => {
                setLogEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setLogPassword(event.target.value);
              }}
            />

            <button className="auth-btn" onClick={login}>
              Login{' '}
            </button>
          </div>

          <h3>Logged in</h3>
          <h3>{user?.email}</h3>
          <button className="auth-btn" onClick={logout}>
            Log out
          </button>
        </div>

      ) : (

        <div className="grid-container">
          {props.home.map((ele, idx) => (
            <div
              key={idx}
              className="profile-card"
              onClick={() => showProfiles(ele.id)}
            >
              <div className="profile-names" key={idx}>
                <img src={ele.image} />
                <div>{ele.firstName}</div>
                <div>{ele.lastName}</div>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};
export default Register;
