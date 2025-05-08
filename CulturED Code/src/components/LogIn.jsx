import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
// import { auth } from '../firebase';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import '../index.css'; // Or your specific CSS file
import DEFAULT_USERS from '../data/users.json'

export function Login() {
  
  const [currentUser, setCurrentUser] = useState("loggedout@email.com");
  console.log(currentUser);

  const navigate = useNavigate();
  const uiRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    auth.languageCode = 'it';
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, {
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      signInFlow: 'popup',
      credentialHelper: 'none',
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          authResult.user.userName = authResult.user.email.split('@')[0];
          authResult.user.name = authResult.user.displayName;
          console.log('User signed in:', authResult.user);
          setCurrentUser(authResult.user.email);
          console.log(currentUser);

          // onAuthStateChanged(auth, (firebaseUserObj) => {
          //   console.log("auth state changed");
          //   console.log(firebaseUserObj);
          //   firebaseUserObj.userName = firebaseUserObj.email.split('@')[0];
          //   firebaseUserObj.name = firebaseUserObj.displayName;
          //   console.log(firebaseUserObj);
          // })
          
          navigate('/explorepage');
          return false;
        },
      }
    });

    return () => {
      ui.reset();
    };
  }, [navigate]);


  



  return (
    <div className="login-container">
      <div className="login-header">
        <p>
          Join our community to explore and share powerful stories from around the world. Engage
          with narratives that connect cultures, amplify diverse voices, and contribute to a global
          timeline of experiences. <strong>Your story matters-- be a part of the conversation.</strong>
        </p>
      </div>
      <div className="login-content">
        <div className="login-logo">
          <img src="/cultured_logo-removebg-preview.png" alt="CultureED Logo" />
        </div>
        <div className="login-form">
          <h1>Sign In</h1>
          <div ref={uiRef} />
        </div>
      </div>
    </div>
  );
}
