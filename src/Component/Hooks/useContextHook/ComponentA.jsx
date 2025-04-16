import React from 'react'
import { ComponentB } from './ComponentB'
import { ComponentE } from './ComponentE'

export const ComponentA = () => {
  return (
    <div>
        {/* <p>ComponentA</p> */}
        <ComponentB/>
        <ComponentE/>
    </div>
  )
}

