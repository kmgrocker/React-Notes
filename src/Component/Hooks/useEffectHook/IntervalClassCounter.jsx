import React, { Component } from 'react'

export class IntervalClassCounter extends Component {
    constructor(props) {
      super(props)   
      this.state = {
         count:0
      }
    }

    componentDidMount(){
      this.counter = setInterval(this.tick,1000)
    }

    componentDidUpdate(){
      console.log('component did updated')
      console.log(this.state.count)
    }

    componentWillUnmount(){
        clearInterval(this.counter)
    }

    tick = ()=>{
        this.setState({count:this.state.count+1})
    }
  
  render() {
    return (
      <div>
        <p>Class Counter: {this.state.count}</p>
      </div>
    )
  }
}


