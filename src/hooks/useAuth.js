import React, { useEffect, useState } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app'

export default function ({ onSignedIn }) {
  const [user, setUser] = useState(null)
  const signIn = async () => {
    try {
      const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
      });
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          // console.log({_user})
          setUser(_user)
          onSignedIn()
        } else {
          console.debug('Signed Out!')
        }
      })
      const response = await signInAnonymously(auth)
      // console.log({response})
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error({errorMessage, errorCode})
    }
  }

  useEffect(() => {
    signIn()
  }, [])

  return {
    user,
  }
}
