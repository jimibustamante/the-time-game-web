import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, FacebookAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"
import { initializeApp } from 'firebase/app'
import { useGameContext } from '../contexts/game-context'
import { signIn, getThemes } from '../lib/api'

export default  function useAuth({ onSignedIn }) {
  if (!onSignedIn) onSignedIn = () => {}
  const [gameState, dispatch] = useGameContext()
  const { user } = gameState
  const history = useHistory()

  const finishSignIn = useCallback(async ({ username }) => {
    try {
      const auth = getAuth()
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          email = window.prompt('Ingresa el mail con el que estás ingresando.')
        }
        const resp = await signInWithEmailLink(auth, email, window.location.href)
        const user = resp.user
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
          signIn({
            uid: _user.uid,
            accessToken: _user.accessToken,
            username: _user.displayName,
            email: _user.email,
            photoURL: _user.photoURL,
            providerId: _user.providerId,
          }).then((user) => {
            console.log({user})
            dispatch({ type: 'SET_USER', payload: user })
            getThemes().then(themes => {
              dispatch( {type: 'SET_THEMES', payload: themes} )
              onSignedIn()
              history.replace('/home')            
            })

          })
        } else {
          history.replace('/')
          console.debug('Signed Out!')
        }
      })
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error({errorMessage, errorCode})
    }
  }, [])

  const signOut = async () => {
    const auth = getAuth()
    try {
      await firebaseSignOut(auth)
      history.go('/')
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error({errorMessage, errorCode}) 
    }
  }

  const facebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const auth = getAuth()
      provider.setCustomParameters({
        'display': 'popup'
      })
      
      const result = await signInWithPopup(auth, provider)
      const { user } = result
      const credential = FacebookAuthProvider.credentialFromResult(result)
      console.log({user})

    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = FacebookAuthProvider.credentialFromError(error)
      console.log({errorCode, errorMessage, email, credential})
      console.error(error)
    }
  }

  return {
    signIn,
    finishSignIn,
    facebookSignIn,
    signOut,
    user,
  }
}
