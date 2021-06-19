import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import LoadingView from './LoadingView'
import { Home as HomeWrapper , HomeActions, TitleWrapper, TopLogo, BigButton, Overlay } from '../styles'
import { useGameContext } from '../contexts/game-context'
import { ReactComponent as QuestionBackground } from '../images/question-bg.svg';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [gameState, dispatch] = useGameContext()
  const { user } = useAuth({ onSignedIn: () => {} })
  const history = useHistory()

  const goToPlay = () => {
    history.push('/themes')
  }

  useEffect(() => {
    if(user?.username) setLoading(false)
  }, [user])

  return (
    <HomeWrapper>
      {loading && (
        <Overlay>
          <LoadingView />
        </Overlay>
      )}
      <TopLogo>
        <span>THE TIME</span>
        <span>GAME</span>
      </TopLogo>
      <TitleWrapper bottom='14%'>
        <QuestionBackground style={{width: '100vw'}} />
        {user && (
          <div className='text-wrapper'>
            <h3>{`Hola ${user.username}!`}<br/>¿Qué deseas hacer?</h3>
          </div>
        )}
      </TitleWrapper>
      <HomeActions>
        <BigButton onClick={goToPlay}>Jugar</BigButton>
      </HomeActions>
    </HomeWrapper>
  )
}
