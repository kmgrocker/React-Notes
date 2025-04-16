import React, { Component } from 'react'

export class Input extends Component {
    constructor(props) {
      super(props)
    
      this.state = {   
      }
      this.inputRef = React.createRef()
    }

    focusInputHandler=()=>{
        this.inputRef.current.focus()
    }
  render() {
    return (
      <div>
        <input ref={this.inputRef}></input>
      </div>
    )
  }
}
