import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Question, MainDescription, GameWrapper } from './styles'
import LoadingView from './components/LoadingView'
import { useGameContext } from './contexts/game-context'
import Options from './components/Options'
import Result from './components/Result'
import Overlay from './components/Overlay'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics"

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function App() {
  const [facts, setFacts] = useState([])
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState(null)
  const [loaging, setLoading] = useState(true)
  const analytics = useRef(null)
  const [gameState, dispatch] = useGameContext()
  const { title, database } = gameState
  const { theme_id } = useParams()
  const history = useHistory()

  // function onSignedIn() {
  //   // analytics.current = getAnalytics();
  //   fetchFacts()
  // }

  function pickOptions(list) {
    const optionsIndexes = []
    while (optionsIndexes.length < 2) {
      const index = Math.floor(Math.random() * list.length)
      if (optionsIndexes.length === 1 && list[optionsIndexes[0]].name.includes(' - ')) {
        const optionA = list[optionsIndexes[0]].name.split(' - ')
        const optionB = list[index].name.split(' - ')
        if (!arraysEqual(optionA, optionB)) optionsIndexes.push(index)
      } else {
        if (!optionsIndexes.includes(index)) {
          optionsIndexes.push(index)
        }
      }
    }

    const opts = optionsIndexes.map((index) => {
      return list[index]
    })
    return opts
  }

  useEffect(() => {
    if (facts.length <= 0) return
    setOptions(pickOptions(facts))
    
  }, [facts])

  const onAnswer = (option) => {
    setAnswer(option)
  }

  const next = () => {
    setAnswer(null)
    setOptions(pickOptions(facts))
  }

  async function fetchFacts() {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, database))
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      setFacts(data)
    } catch (error) {
      console.error({error})
      history.push('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFacts()
  }, [])

  return (
    <GameWrapper>
      {loaging && (
        <Overlay>
          <LoadingView />
        </Overlay>
      )}
      <Question>
        ¿Qué fue <br/> primero?
      </Question>
      <MainDescription>{title}</MainDescription>
      <Options options={options} onAnswer={onAnswer} answer={answer} />
      <Result options={options} answer={answer} next={next} />
    </GameWrapper>
  );
}

export default App;
