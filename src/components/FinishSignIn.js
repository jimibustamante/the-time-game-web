import React, { useEffect } from 'react'
import LoadingView from './LoadingView'
import Overlay from './Overlay'
import useAuth from '../hooks/useAuth'
export default function FinishSignIn() {
  const { finishSignIn } = useAuth({})
  useEffect(() => {
    finishSignIn()
  }, [])
  return (
    <Overlay>
      <LoadingView />
    </Overlay>
  )
}
