
import React from 'react'
import { withCounter } from './withCounter'

class HoverCounter extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         count:0
    //     }
    // }

    // increaseCounter = ()=>{
    //     this.setState(prev=>{
    //         return {
    //             count:prev.count+1
    //         }
    //     })
    // }

    render(){
        return (
            <>
             {/* <h1>Counter - {this.state.count}</h1>
             <button onMouseOver={()=>this.increaseCounter()}>inc</button> */}

             <h1>Counter - {this.props.count}</h1>
             <button onMouseOver={()=>this.props.increaseCounter()}>inc</button>
            </>
        )
    }
}

export default withCounter(HoverCounter)
