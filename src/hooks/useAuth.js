import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { getAuth, EmailAuthProvider, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from 'firebase/app'
import { useGameContext } from '../contexts/game-context'

export default  function useAuth({ onSignedIn }) {
  if (!onSignedIn) onSignedIn = () => {}
  const [gameState, dispatch] = useGameContext()
  const { user } = gameState
  const history = useHistory()
  const actionCodeSettings = (username) => {
    return {
      url: `${window.location.origin}/finish_sign_up?username=${username}`,
      handleCodeInApp: true,
      iOS: {
        bundleId: `${window.location.hostname}.ios`
      },
      android: {
        packageName: `${window.location.hostname}.android`,
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: `thetimegame.page.link`
    }
  }

  const signIn = useCallback(async ({email, username}) => {
    try {
      if (user) return
      const auth = getAuth()
      const settings = actionCodeSettings(username)
      console.log({settings})
      await sendSignInLinkToEmail(auth, email, settings)
      alert('Te hemos enviado un link de acceso a tu correo.')
      window.localStorage.setItem('emailForSignIn', email)

    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error({errorMessage, errorCode})
    }
  }, [user, dispatch])

  const finishSignIn = useCallback(async () => {
    try {
      const auth = getAuth()
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          email = window.prompt('Ingresa el mail con el que estás ingresando.')
        }
        const resp = await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error({errorMessage, errorCode})
    }
  }, [])

  useEffect(() => {
    if (user) return
    try {
      const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
      })
      const auth = getAuth(firebaseApp)
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          dispatch({ type: 'SET_USER', payload: _user })
          onSignedIn()
          history.replace('/home')
        } else {
          history.replace('/sign_in')
          console.debug('Signed Out!')
        }
      })
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error({errorMessage, errorCode})
    }
  }, [])

  return {
    signIn,
    finishSignIn,
    user,
  }
}
