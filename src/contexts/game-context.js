import React, { useReducer, useContext, createContext } from 'react';

const GameContext = createContext();

export const GameContextProvider = ({children}) => {
  // const initialTheme = 'champions_legue'
  const initialState = {
    user: null,
    themes: {},
    theme: '',
    themeTitle: '',
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload }
      case 'SET_THEMES':
        return { ...state, themes: action.payload }
      case 'SET_THEME':
        return { ...state, theme: action.payload.id, themeTitle: action.payload.title }
      default: throw new Error('Unexpected action: ' + action.type)
    }
  }
  const contextValue = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const contextValue = useContext(GameContext)
  return contextValue
}
