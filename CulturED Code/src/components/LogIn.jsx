// src/pages/Login.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../firebase';

export function Login() {
  const navigate = useNavigate();
  const uiRef = useRef(null);

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, {
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log('User signed in:', authResult.user);
          navigate('/explorepage');
          return false;
        },
      },
      credentialHelper: 'none',
    });

    return () => {
      ui.reset(); // cleanup on unmount
    };
  }, [navigate]);

  return (
    <div>
      <h2>Sign In</h2>
      <div ref={uiRef} />
    </div>
  );
}
