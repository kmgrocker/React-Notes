import React, { Component } from 'react'

export class ClassMouse extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         X:0,
         Y:0
      }
    }

    // ! here we can see the event is registered once in componentDidMount will take care of that and then logMousePosition which will run that event will fire again and again 

    // ! that running once effect in useEffect will be achieved only if we provide the empty array dependency to it otherwise it will register the lister again and again 

    // ! NOTE and most imp thing to note out that we should clear all event which are registered in cleaning function for class and Function component the effect of  not cleaning can be seen in MouseContainer component which will show that even the component which have the listener inside them are registered will be in dom even after removing

    componentDidMount(){
        console.log('componentDidMount ran once');
       window.addEventListener('mousemove',this.logMousePosition)
    }

    componentDidUpdate(){
        console.log('component did update running')
    }

    componentWillUnmount(){
        window.removeEventListener('mousemove',this.logMousePosition)
    }

    logMousePosition = (e)=>{
       this.setState({X:e.clientX,Y:e.clientY})
    }


  render() {
    return (
      <div>X: {this.state.X} Y: {this.state.Y}</div>
    )
  }
}

