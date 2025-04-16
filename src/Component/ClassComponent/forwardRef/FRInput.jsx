import React from 'react'
import { useEffect } from 'react'

export const FRInput = React.forwardRef((props,ref) => {

    useEffect(()=>{
        console.log(ref);
    },[])
    return (
      <div>
          <p>FRInput</p>
          <input ref={ref}></input>
      </div>
    )
  })

