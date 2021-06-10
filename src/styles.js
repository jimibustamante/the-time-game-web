import styled, { createGlobalStyle, keyframes } from 'styled-components'
import BlackGround from './fonts/black-ground/Black-Ground.woff'

const COLORS = {
  background: '#8745C9',
  secondary: '#677DB7',
  green: '#8FC750',
  text: '#2D3A3A',
  textLight: '#FCFFFC',
  appNameWhite: '#FDFFFA'
}

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Black Ground Regular';
    font-style: normal;
    font-weight: normal;
    src: url(${BlackGround}) format('woff');
  }
`

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  text-transform: uppercase;
  background-color: ${COLORS.background};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  box-sizing: border-box;
`

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img.clock {
    position: fixed;
    width: 387px;
    height: 408px;
    left: -125px;
    top: -2px;
  }
  h1.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 50px;
    line-height: 55px;
    font-family:'Black Ground Regular';
    font-weight: normal;
    span:first-child {
      color: ${COLORS.green};
    }
    span:last-child {
      color: ${COLORS.appNameWhite};
    }
  }
  svg {
    animation: ${spin} 1s linear infinite;
    color: ${COLORS.green}
  }
`

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0.5rem;
`

export const Question = styled.h1`
  font-size: 2.7rem;
  color: ${COLORS.green};  
  font-family:'Black Ground Regular';
  font-weight:normal;
  `
export const MainDescription = styled.h3`
  color: ${COLORS.textLight};  
  margin: 0 0 3rem 0;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Card = styled.div`
  background-color: transparent;
  height: 0;
  width: 40%;
  position: relative;
  padding-bottom: 40%;
  background-color: transparent;
  display: flex;
  .aspect-ratio {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .inner {
      ${props => {
        if (props.flipped) return 'transform: rotateY(180deg);'
      }}
      perspective: 1000px;
      box-sizing: border-box;
      border-radius: 5px;
      transform-style: preserve-3d;
      transition: transform 1s;
      background-color: transparent;
      color: white;
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        position: absolute;
        font-size: 0.9rem;
        border-radius: 5px;
        width: 100%;
        height: 100%;
        padding: 10px 8px;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background-color: ${COLORS.secondary};
      }
      .front {
        cursor: pointer;
      }
      .back {
        color: ${COLORS.textLight};
        transform: rotateY( 180deg );
        display: flex;
        flex-direction: column;
      }
    }
  }
`

export const Options = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 2rem;
  box-sizing: border-box;
`

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  box-sizing: border-box;
`
export const Result = styled.div`
  transition: opacity 0.5s ease-in-out;
  width: 100%;
  opacity: ${props => props.show ? '1' : '0'};
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    &.success {
      color: green;
    }
    &.fail {
      color: #de3b3b;
    }
  }
`
export const Button = styled.button`
  background-color: ${COLORS.secondary};
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin-top: 2rem;
  padding: 10px 20px;
  border-radius: 5px;
`
