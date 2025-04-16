// ! in this we will visulaize the main difference betwween  useState(hook) and SetState (in class) behaviour difference 

//! this behavior will be same in Object and Array in both case  

import React, { useState } from 'react'

export const UseSateWithObject = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '' })
  const badUserChangehandler = (e, name) => {
    name === 'first' ? setUser({ firstName: e.target.value }) : setUser({ lastName: e.target.value })
  }

  const goodUserChangehandler = (e, name) => {
    name === 'first' ? setUser({ ...user, firstName: e.target.value }) : setUser({ ...user, lastName: e.target.value })
  }
  
  return (
    <>
      <div>UseSateWithObject</div>
      <form>
        <h2>Bad User handling</h2>
        <input type='text' value={user.firstName} onChange={(e) => badUserChangehandler(e, 'first')}></input>
        <input type='text' value={user.lastName} onChange={(e) => badUserChangehandler(e, 'last')} ></input>
        <h2>-----------</h2>
        <h2>Good User handling</h2>
        <input type='text' value={user.firstName} onChange={(e) => goodUserChangehandler(e, 'first')}></input>
        <input type='text' value={user.lastName} onChange={(e) => goodUserChangehandler(e, 'last')} ></input>
        <h2> firstname- {user.firstName}</h2>
        <h2> lastname- {user.lastName}</h2>
        <h2>user-{JSON.stringify(user)}</h2>
        <button onClick={() => setUser({ firstName: '', lastName: '' })}>Reset user</button>
      </form>
    </>
  )
}
