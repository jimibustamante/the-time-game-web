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
  let result = false
  if (answer) {
    const solution = whichWasFirst(options)
    if (solution.year === answer.year) {
      result = true
    }
  }
  
  return (
    <Wrapper show={answer}>
      {answer && (
        <>
          {result &&
            <Success size={80} className='success' />
          }
          {!result &&
            <Fail size={80} className='fail' />
          }
          <Button onClick={next} >Next</Button>
        </>
      )}
    </Wrapper>
  )
}
