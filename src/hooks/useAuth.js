import React, { useEffect, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, onAuthStateChanged, FacebookAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs, where, query } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { useGameContext } from '../contexts/game-context'

export default  function useAuth({ onSignedIn }) {
  if (!onSignedIn) onSignedIn = () => {}
  const [gameState, dispatch] = useGameContext()
  const { user } = gameState
  const history = useHistory()
  const dbRef = useRef(null)

  function getDb() {
    if (!dbRef.current) {
      dbRef.current = getFirestore()
    }
    return dbRef.current
  }

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

  const addUser = async (user, username) => {
    const db = getDb()
    await addDoc(collection(db, 'users'), {
      email: user.email,
      username,
      uid: user.uid,
    })
  }

  const signIn = useCallback(async ({email, username}) => {
    try {
      if (user) return
      const auth = getAuth()
      const settings = actionCodeSettings(username)
      await sendSignInLinkToEmail(auth, email, settings)
      alert('Te hemos enviado un link de acceso a tu correo.')
      window.localStorage.setItem('emailForSignIn', email)

    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error({errorMessage, errorCode})
    }
  }, [user, dispatch])

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
        addUser(user, username)
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
          const db = getDb()
          const usersCollection = collection(db, 'users')
          const q = query(usersCollection, where('email', '==', _user.email))
          getDocs(q).then((querySnapshot) => {
            if (querySnapshot?.docs.length) {
              const user = querySnapshot.docs[0].data()
              dispatch({ type: 'SET_USER', payload: user })
              onSignedIn()
              history.replace('/home')
            }
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
      const credential = FacebookAuthProvider.credentialFromResult(result);
      addUser(user, user.displayName)
      console.log({result, credential})
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
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
