import React, { useState, useEffect } from 'react'
import Overlay from './Overlay'
import { Link } from 'react-router-dom'
import { getGameSummary } from '../lib/api'
import { GameSummary as Wrapper } from '../styles'

export default function GameSummary({ gameId }) {
  const [gameSummary, setGameSummary] = useState(null)
  const fetchGameSummary = async () => {
    const summary = await getGameSummary(gameId)
    setGameSummary(summary)
  }

  useEffect(() => {
    fetchGameSummary()
  }, [gameId])

  if (gameSummary) {
    const { 
      complited_questions: completed,
      total_questions: total,
      correct_answers_count: correctCount,
      wrong_answers_count: wrongCount,
    } = gameSummary
    return (
      <Overlay>
        <Wrapper>
          <h1>Resumen</h1>
          <p>Completas: {completed}/{total}</p>
          <p>Correctas: {correctCount}</p>
          <p>Incorrectas: {wrongCount}</p>
          <Link to="/themes">Juagar otra vez</Link>
        </Wrapper>
      </Overlay>
    )
  } else {
    return null
  }
}
