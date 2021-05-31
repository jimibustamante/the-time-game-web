import React, { useState, useEffect } from 'react'
import { AppWrapper, Question } from './styles'
import Options from './components/Options'
import Result from './components/Result'
import Overlay from './components/Overlay'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function App() {
  const [facts, setFacts] = useState([])
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    if (facts.length <= 0) return
    const optionsIndexes = []
    while (optionsIndexes.length < 2) {
      const index = Math.floor(Math.random() * facts.length)
      if (!optionsIndexes.includes(index)) {
        optionsIndexes.push(index)
      }
    }
    const opts = optionsIndexes.map((index) => {
      return facts[index]
    })
    setOptions(opts)
    
  }, [facts])

  const onAnswer = (option) => {
    setAnswer(option)
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
        const querySnapshot = await getDocs(collection(db, 'facts'));
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
      {answer &&
        <Overlay>
          <Result options={options} answer={answer} />
        </Overlay>
      }
      <Question>
        ¿Qué fue <br/> primero?
      </Question>
      <Options options={options} onAnswer={onAnswer} />
    </AppWrapper>
  );
}

export default App;
