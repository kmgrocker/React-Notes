import React, { Component } from 'react'

export class ClassRefCounter extends Component {
    interval
    constructor(props) {
      super(props)
    
      this.state = {
         counter:0
      }
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState((prevState,prevProps)=>{
                console.log(prevProps,prevState)
                return {counter:prevState.counter+1}
            })
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

  render() {
    return (
      <div>
        <h3>ClassRefCounter</h3>
        <p>{`count: ${this.state.counter}`}</p>
        
        <button onClick={()=>clearInterval(this.interval)}>stop counter</button>
      </div>
    )
  }
}

