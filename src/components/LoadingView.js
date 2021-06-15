import React from 'react'
import { Loading, ClockImage } from '../styles'
import Clock from '../images/clock-img.png'
import { AiOutlineLoading3Quarters as Spinner} from 'react-icons/ai';

export default function LoadingView() {
  return (
    <Loading>
      <ClockImage src={Clock} />
      <h1 className='title'>
        <span>THE TIME</span>
        <span>GAME</span>
      </h1>
      <Spinner size={35} />
    </Loading>
  )
}
