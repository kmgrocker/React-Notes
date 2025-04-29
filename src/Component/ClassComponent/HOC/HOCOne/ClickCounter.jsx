import React from 'react';
import { withCounter } from './withCounter';

 class ClickCounter extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     count:0
        // }
    }

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
             {/* <h1>Counter - {this.state.count}</h1> */}
             {/* <button onClick={()=>this.increaseCounter()}>inc</button> */}

              <h1>{this.props.name} - {this.props.count}</h1>
             <button onClick={()=>this.props.increaseCounter()}>inc</button>
            </>
        )
    }
}

export default withCounter(ClickCounter)