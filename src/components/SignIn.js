import React, { useState, useCallback } from 'react'
import useAuth from '../hooks/useAuth';
import { SignIn as Wrapper, AppNameTitle, Form, InputText, BigButton, ClockImage } from '../styles'
import Clock from '../images/clock-img.png'
import { ReactComponent as LineImage } from '../images/line.svg';

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [formErrors, setFormError] = useState()
  const { signIn } = useAuth({onSignedIn})
  function validateEmail(value) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!value.match(regex)) {    
      setFormError('Has ingresado un correo inválido.')
    }
  }

  function onSignedIn() {
    console.debug('onSignedIn')
  }

  const handleEmailChange = useCallback(event => {
    const value = event.target.value
    setEmail(value)
  }, [email, validateEmail])

  const handleUsernameChange = useCallback(event => {
    const value = event.target.value
    setUsername(value)
  }, [setUsername])

  const onSubmit = useCallback(event => {
    event.preventDefault()
    if (!email || !username) {
      setFormError('Has dejado campos vacios.')
    }
    validateEmail(email)
    signIn({ email, username })
  }, [email, username, signIn])

  return (
    <Wrapper>
      <ClockImage src={Clock} />
      <LineImage className='line' />
      <AppNameTitle>
        <span>THE TIME</span>
        <span>GAME</span>
      </AppNameTitle>
      <Form onSubmit={onSubmit}>
        <InputText name='username' type='text' value={username} onChange={handleUsernameChange} placeholder='Nombre de usuario' />
        <InputText name='email' type='email' value={email} onChange={handleEmailChange} placeholder='Correo' />
        <BigButton type='submit'>Login</BigButton>
      </Form>
    </Wrapper>
  )
}
