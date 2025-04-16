import React, { Component } from 'react'
import { FRInput } from './FRInput'

export class FRParent extends Component {
    constructor(props) {
      super(props)   
      this.state = {
        
      }
      this.parentRef = React.createRef()
    }
clickHandler = ()=>{
    console.log(this.parentRef) // only referencing the input elememnt in child not the whole FRInput Component
    this.parentRef.current.focus()
}
  render() {
    return (
      <div>
        <p>Parent Component</p>
         <FRInput ref={this.parentRef}></FRInput>
         <button onClick={this.clickHandler}>focus</button>
      </div>
    )
  }
}

export default FRParent