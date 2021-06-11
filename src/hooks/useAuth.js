import React, { useEffect, useState, useCallback } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import { useGameContext } from '../contexts/game-context'

export default  function useAuth({ onSignedIn }) {
  const [gameState, dispatch] = useGameContext()
  const { user } = gameState
  const signIn = useCallback(async () => {
    try {
      if (user) return
      const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
      });
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          dispatch({ type: 'SET_USER', payload: _user })
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
  }, [user, dispatch])

  useEffect(() => {
    signIn()
  }, [signIn])

  return {
    user,
  }
}
