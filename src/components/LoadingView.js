import React from 'react'
import { Loading } from '../styles'
import ClockImage from '../images/clock-img.png'
import { AiOutlineLoading3Quarters as Spinner} from 'react-icons/ai';

export default function LoadingView() {
  return (
    <Loading>
      <img alt='' className='clock' src={ClockImage} />
      <h1 className='title'>
        <span>THE TIME</span>
        <span>GAME</span>
      </h1>
      <Spinner size={35} />
    </Loading>
  )
}
