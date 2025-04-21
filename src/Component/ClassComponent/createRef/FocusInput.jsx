import React, { Component } from 'react'
import { Input } from './Input'

export class FocusInput extends Component {
    constructor(props) {
      super(props)
    
      this.state = {}
      this.componentRef = React.createRef()
    }

    // goal is to access the ref  component from  parent component

    clickHandler = ()=>{
       console.log(this.componentRef); // this current property has all the child component detail including state , method everything 
       this.componentRef.current.focusInputHandler()
    }

  render() {
    return (
      <div>
        <p>FocusInput</p>
        <Input ref={this.componentRef}></Input>
        <button onClick={this.clickHandler}>focus on above input</button>
      </div>
    )
  }
}
