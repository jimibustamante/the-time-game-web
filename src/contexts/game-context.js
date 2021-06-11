import React, { useReducer, useContext, createContext } from 'react';

const GameContext = createContext();
const THEMES = {
  'copa_libertadores': {
    database: 'LibertadoresFinals',
    title: 'Finales de Copa Libertadores',
  },
  'champions_legue': {
    database: 'ChampionsFinals',
    title: 'Finales de Champions Legue',
  },
  'world_cup': {
    database: 'facts',
    title: 'Finales Copa del Mundo',
  },
}

export const GameContextProvider = ({children}) => {
  const initialTheme = 'champions_legue'
  const initialState = {
    themes: THEMES,
    theme: initialTheme,
    themeTitle: THEMES[initialTheme].title,
    database: THEMES[initialTheme].database,
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_THEME':
        const db = THEMES[action.payload].database
        const title = THEMES[action.payload].title
        return { ...state, theme: action.payload, database: db, themeTitle: title }
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
