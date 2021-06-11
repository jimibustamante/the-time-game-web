import React, { useEffect, useState, useCallback } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app'

export default  function useAuth({ onSignedIn }) {
  const [user, setUser] = useState(null)
  const signIn = useCallback(async () => {
    try {
      const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
      });
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          setUser(_user)
          onSignedIn()
        } else {
          console.debug('Signed Out!')
        }
      })
      await signInAnonymously(auth)
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error({errorMessage, errorCode})
    }
  }, [])

  useEffect(() => {
    signIn()
  }, [signIn])

  return {
    user,
  }
}
