import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import { Menu as Wrapper } from '../styles'
import { useGameContext } from '../contexts/game-context'
import { ReactComponent as Burger } from '../images/burger.svg'
import useAuth from '../hooks/useAuth'

export default function Menu() {
  const [menuOpened, setMenuOpened] = useState(false)
  const [gameState, dispatch] = useGameContext()
  const { signOut } = useAuth({})
  const { user } = gameState
  const history = useHistory()
  const onBurger = useCallback(() => {
    setMenuOpened(opened => {
      return !opened
    })
  }, [setMenuOpened])

  return (
    user && (
      <Wrapper className={`Menu ${menuOpened ? 'opened' : ''}`}>
        <div className='burger-wrapper'>
          <Burger className='burger' onClick={onBurger} />
        </div>
        <span onClick={() => history.push('/home')} >Home</span>
        <span onClick={() => history.push('/themes')}>Jugar</span>
        <span onClick={signOut} >Sign out</span>
      </Wrapper>
    )
  )
}
