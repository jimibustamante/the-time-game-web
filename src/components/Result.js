import React from 'react'
import { Result as Wrapper, Button} from '../styles'
import { AiOutlineCheckCircle as Success, AiOutlineCloseCircle as Fail } from 'react-icons/ai'

export default function Result({answer, next}) {
  const result = answer.is_correct

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
