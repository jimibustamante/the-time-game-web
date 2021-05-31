import React from 'react'

function whichWasFirst(options) {
  if (parseInt(options[0].year) < parseInt(options[1].year)) {
    return options[0]
  } else {
    return options[1]
  }
}

export default function Result({answer, options}) {
  const solution = whichWasFirst(options)
  let result = false
  if (solution.year === answer.year) {
    result = true
  }
  
  return (
    <div>
      {result &&
        'Yes'
      }
      {!result &&
        'no'
      }
    </div>
  )
}
