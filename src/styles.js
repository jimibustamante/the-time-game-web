import styled from 'styled-components'

const COLORS = {
  background: '#FFC857',
  secondary: '#177E89',
  text: '#323031',
  textLight: '#7284A8',
}

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${COLORS.background};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;

`
export const Question = styled.h1`
  font-size: 3rem;
  margin: 0 0 3rem 0;
  color: ${COLORS.text};  
`

export const Options = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  box-sizing: border-box;
  > div {
    height: 0;
    width: 44%;
    position: relative;
    padding-bottom: 43%;
    /* overflow: hidden; */
    transition: transform 1s;
    perspective: 600px;
    transform-style: preserve-3d;
    background-color: transparent;
    display: flex;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      padding: 10px 8px;
      background-color: ${COLORS.secondary};
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      &.is-flipped {
        transform: rotateY(180deg);
      }
      &.front {
        background-color: ${COLORS.secondary};
      }
      &.back {
        background-color: red;
        color: white;
        transform: rotateY( 180deg );
      }
    }
  }
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
  width: 100%;
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    &.success {
      color: green;
    }
    &.fail {
      color: red;
    }
  }
`
export const Button = styled.button`
  background-color: ${COLORS.secondary};
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  margin-top: 2rem;
  padding: 10px 20px;
  border-radius: 5px;
`