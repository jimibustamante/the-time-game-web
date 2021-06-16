import React, { useEffect } from 'react'
import LoadingView from './LoadingView'
import Overlay from './Overlay'
import useAuth from '../hooks/useAuth'

export default function FinishSignIn() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const username = params?.username
  const { finishSignIn } = useAuth({ username })

  useEffect(() => {
    finishSignIn({ username })
  }, [])

  return (
    <Overlay>
      <LoadingView />
    </Overlay>
  )
}
