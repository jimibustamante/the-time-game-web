import React, { useState, useEffect } from 'react'
import { AppWrapper, Question, MainDescription } from './styles'
import Options from './components/Options'
import Result from './components/Result'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
    const firebaseApp = initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
    });
  
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, async (user) => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'LibertadoresFinals'));
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        });
        setFacts(data)
      } catch (error) {
        console.error({error})
      }
    })
  }

  useEffect(() => {
    fetchFacts()
  }, [])

  return (
    <AppWrapper>
      <Question>
        ¿Qué fue <br/> primero?
      </Question>
      <MainDescription>Finales de Copa Libertadores de América</MainDescription>
      <Options options={options} onAnswer={onAnswer} answer={answer} />
      <Result options={options} answer={answer} next={next} />
    </AppWrapper>
  );
}

export default App;
