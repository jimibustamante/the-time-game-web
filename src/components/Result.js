import React from 'react'
import { Result as Wrapper, Button} from '../styles'
import { AiOutlineCheckCircle as Success, AiOutlineCloseCircle as Fail } from 'react-icons/ai'

function whichWasFirst(options) {
  if (parseInt(options[0].year) < parseInt(options[1].year)) {
    return options[0]
  } else {
    return options[1]
  }
}

export default function Result({answer, options, next}) {
  const solution = whichWasFirst(options)
  let result = false
  if (solution.year === answer.year) {
    result = true
  }
  
  return (
    <Wrapper>
      {result &&
        <Success size={150} className='success' />
        
      }
      {!result &&
        <Fail size={150} className='fail' />
      }
      <Button onClick={next} >Next</Button>
    </Wrapper>
  )
}
