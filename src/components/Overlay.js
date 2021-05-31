import React, { memo } from 'react'
import { Overlay as Wrapper} from '../styles'

function Overlay({ children }) {
  return (
    <Wrapper>
      { children }
    </Wrapper>
  )
}

export default memo(Overlay)
