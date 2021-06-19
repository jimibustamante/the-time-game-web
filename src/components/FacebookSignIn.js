import React, { useState, useCallback } from 'react'
import useAuth from '../hooks/useAuth';
import { SignIn as Wrapper, AppNameTitle, FacebookLoginButton, ClockImage } from '../styles'
import Clock from '../images/clock-img.png'
import { ReactComponent as LineImage } from '../images/line.svg';
import FacebookLogo from '../images/f_logo_RGB-Blue_58.png';

export default function FacebookSignIn() {

  const [formErrors, setFormError] = useState()
  const { facebookSignIn } = useAuth({onSignedIn})

  function onSignedIn() {
    console.debug('onSignedIn')
  }

  return (
    <Wrapper>
      <ClockImage src={Clock} />
      <LineImage className='line' />
      <AppNameTitle>
        <span>THE TIME</span>
        <span>GAME</span>
      </AppNameTitle>
      <FacebookLoginButton onClick={facebookSignIn}>
        <img src={FacebookLogo} /> Ingresa con Facebook
      </FacebookLoginButton>
    </Wrapper>
  )
}
