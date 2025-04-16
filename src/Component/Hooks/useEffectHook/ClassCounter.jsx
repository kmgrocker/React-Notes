import React, { Component } from 'react'

export class ClassCounter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            name:''
        }
    }

    componentDidMount() {
        document.title = `current value- ${this.state.count}`
    }
    // ! similar to useEffect with the dependency Array we have to do some adjustment in the componentDidUpdate so it will update based on previous state and have correct dependency other wise it will also run on every state change like if I am typing an input in text box below 

   /*  componentDidUpdate(prevProps, prevState) {
        console.log('Component Updated Run');
        document.title = `Clicked ${this.state.count} times`
    } */

    // ! only update the componentDidUpdate when count change (name change has no effect) 
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.count!==this.state.count){
            console.log('Component Updated Run');
           document.title = `Clicked ${this.state.count} times`
        }
    }

    handleClick = () => {
        this.setState((prev) => {
            return {
                count: prev.count + 1
            }
        })

    }

    render() {
        return (
            <>
                <div>ClassCounter</div>
                <input type={'text'} value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}></input>
                <button onClick={this.handleClick}>Change title and count - {this.state.count}</button>
            </>
        )
    }
}

