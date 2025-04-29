import React from 'react';

export function withCounter(WrappedComponent) {
  class WithCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
    }
    increaseCounter = ()=>{
        this.setState(prev=>{
            return {
                count:prev.count+2
            }
        })

    }

    render(){
        return <WrappedComponent count={this.state.count} increaseCounter={this.increaseCounter} {...this.props} />
    }
  
  }
  return WithCounter
}


