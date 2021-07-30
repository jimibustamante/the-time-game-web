import React, { useState, useEffect, useRef } from 'react'
import Game from '../models/Game'
import { useHistory } from 'react-router-dom'
import { GameWrapper, TitleWrapper, TopLogo } from '../styles'
import { ReactComponent as QuestionBackground } from '../images/question-bg-s.svg'
import LoadingView from './LoadingView'
import { useGameContext } from '../contexts/game-context'
import Options from './Options'
import Result from './Result'
import Overlay from './Overlay'
import GameSummary from './GameSummary'

import { newGame, answerQuestion, getNextGameQuestion } from '../lib/api'

function GameComponent() {
  const [game, setGame] = useState(null)
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const analytics = useRef(null)
  const [gameState, dispatch] = useGameContext()
  const { theme, themes, user } = gameState
  const title = theme ? themes[theme].title : ''
  const history = useHistory()

  const onAnswer = async (option) => {
    // set answer and send to server
    const answer = await answerQuestion({questionId: question.id, optionId: option.id})
    setAnswer(answer)
  }

  const next = async () => {
    setAnswer(null)
    const updatedGame = await getNextGameQuestion(game.id)
    if (updatedGame && updatedGame.id === game.id && updatedGame.question) {
      game.currentQuestion = updatedGame.question
      game.questions_completed = updatedGame.questions_completed
      setQuestion(game.currentQuestion)
      setOptions(game.currentQuestion.options)
    } else {
      setGameOver(true)
    }
  }

  useEffect(() => {
    if (game) {
      const currentQuestion = game.currentQuestion
      setQuestion(currentQuestion)
      setOptions(currentQuestion.options)
      setLoading(false)
    }
  }, [game])

  async function createGame() {
    try {
      const _game = await newGame({ userId: user.id, themeId: theme })
      setGame(new Game(_game))
    } catch (error) {
      console.error({error})
      history.push('/')
    }
  }

  useEffect(() => {
    createGame()
  }, [])

  return (
    <GameWrapper>
      {loading && (
        <Overlay>
          <LoadingView />
        </Overlay>
      )}
      {game && gameOver &&(
        <GameSummary gameId={game.id} />
      )}
      <TopLogo>
        <span>THE TIME</span>
        <span>GAME</span>
      </TopLogo>
      {question && (
        <TitleWrapper bottom='10%'>
          <QuestionBackground style={{width: '100vw'}}/>
          <div className='text-wrapper'>
            <h3>{question.text}</h3>
            <span>{title}</span>
          </div>
        </TitleWrapper>
      )}
      <Options options={options} onAnswer={onAnswer} answer={answer} />
      {answer && (
        <Result options={options} answer={answer} next={next} />
      )}
    </GameWrapper>
  );
}

export default GameComponent;
