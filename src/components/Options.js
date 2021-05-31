import React, { memo } from 'react'
import { Options as Wrapper } from '../styles'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Option({ option, onAnswer }) {
  let name = option.name
  if (name.includes(' - ')) {
    const items = name.split(' - ')
    const shuffledItems = shuffle(items)
    name = shuffledItems.join(' - ')
  } 
  return (
    <div onClick={() => onAnswer(option)}>
      {name}
    </div>
  )
}

function Options({ options = [], onAnswer }) {
  return (
    <Wrapper>
      {options.map((option) => {
        return(
          <Option key={option.name} option={option} onAnswer={onAnswer} />
        )
      })}
    </Wrapper>
  )
}
 export default memo(Options)