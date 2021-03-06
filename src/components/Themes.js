import React from 'react'
import { useHistory } from 'react-router-dom';
import { ThemePickView , ThemeButton, TitleWrapper, TopLogo } from '../styles'
import { useGameContext } from '../contexts/game-context'
import { ReactComponent as QuestionBackground } from '../images/question-bg.svg';

export default function Themes() {
  const [gameState, dispatch] = useGameContext()
  const { themes } = gameState
  const history = useHistory();

  const onThemePicked = (theme) => {
    dispatch({type: 'SET_THEME', payload: theme})
    history.push(`${theme.id}/play`)
  }

  return (
    <ThemePickView>
      <TopLogo>
        <span>THE TIME</span>
        <span>GAME</span>
      </TopLogo>
      <TitleWrapper>
        <QuestionBackground style={{width: '100vw'}} />
        <div className='text-wrapper'>
          <h3>Selecciona un tema<br/> para jugar hoy</h3>
        </div>
      </TitleWrapper>
      {Object.keys(themes).map((themeKey) => {
        const theme = themes[themeKey]
        const { title } = theme
        return (
          <ThemeButton key={theme.id} onClick={() => onThemePicked(theme)}>{title}</ThemeButton>
        )
      })}
    </ThemePickView>
  )
}
