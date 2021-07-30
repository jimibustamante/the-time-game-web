import React, { memo, useRef, useEffect, useState, useCallback } from 'react'
import { Options as Wrapper, Card } from '../styles'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Option = memo(({ option, onAnswer, answer }) => {
  const [flipped, setFlipped] = useState(false)
  const [name, setName] = useState('')
  const timer = useRef(null)
  const { fact } = option

  const optionName = useCallback(() => {
    let name = fact.name
    if (name.includes(' - ')) {
      const items = name.split(' - ')
      const shuffledItems = shuffle(items)
      name = shuffledItems.join(' - ')
    }
    return name
  }, [fact])

  useEffect(() => {
    if (answer && !flipped) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setFlipped(true)
      }, 700)
    }
    return () => {
      clearTimeout(timer.current)
    }
  }, [answer, flipped])

  useEffect(() => {
    setName(optionName())
  }, [])

  const onClick = () => {
    if (!flipped) {
      setFlipped(true)
      onAnswer(option)
    }
  }

  return (
    <Card onClick={onClick} flipped={flipped}>
      <div className='aspect-ratio'>
        <div className='inner'>
          <div className='back'>
            <span>
              {fact.year}
            </span>
            <span>
              {fact?.description}
            </span>
          </div>
          <div className='front'>
            {name}
          </div>
        </div>
      </div>
    </Card>
  )
})

function Options({ options = [], onAnswer, answer }) {
  return (
    <Wrapper>
      {options.map((option) => {
        const { fact } = option
        return(
          <Option key={option.id} option={option} fact={fact} onAnswer={onAnswer} answer={answer} />
        )
      })}
    </Wrapper>
  )
}
 export default memo(Options)