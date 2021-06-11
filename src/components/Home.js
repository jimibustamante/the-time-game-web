import React from 'react'
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { Home as HomeWrapper , HomeActions, TitleWrapper, TopLogo, BigButton } from '../styles'
import { useGameContext } from '../contexts/game-context'
import { ReactComponent as QuestionBackground } from '../images/question-bg.svg';

export default function Home() {
  const [gameState, dispatch] = useGameContext()
  const { user } = useAuth({ onSignedIn: () => {} })
  const history = useHistory()

  const goToPlay = () => {
    history.push('/themes')
  }
  
  return (
    <HomeWrapper>
      <TopLogo>
        <span>THE TIME</span>
        <span>GAME</span>
      </TopLogo>
      <TitleWrapper bottom='22%'>
        <QuestionBackground />
        <h3>¿Que deseas hacer?</h3>
      </TitleWrapper>
      <HomeActions>
        <BigButton onClick={goToPlay}>Jugar</BigButton>
      </HomeActions>
    </HomeWrapper>
  )
}
