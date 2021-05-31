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
    width: 44%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    padding: 10px 8px;
    border-radius: 5px;
    background-color: ${COLORS.secondary};
    color: white;
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
`