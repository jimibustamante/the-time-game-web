import styled from 'styled-components'

const COLORS = {
  background: '#2BA84A',
  secondary: '#677DB7',
  text: '#2D3A3A',
  textLight: '#FCFFFC',
}

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${COLORS.background};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;

`

export const Question = styled.h1`
  font-size: 2.7rem;
  color: ${COLORS.textLight};  
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
        /* background-color: red; */
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
  padding: 3rem 2rem;
  box-sizing: border-box;
`
export const Result = styled.div`
  transition: opacity 0.5s ease-in-out;
  width: 100%;
  /* position: fixed; */
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