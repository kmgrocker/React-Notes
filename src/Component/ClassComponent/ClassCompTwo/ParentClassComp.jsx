import React from 'react';
import { ChildClassComp } from './ChildClassComp';


export class ParentClassComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentName:'Parent'
        };
    }

    greetChild=(childResponse)=> {
        alert(`Hello from the ${this.state.parentName} and hi from the ${childResponse}`);
    }

    greetParent=(childProp)=> {
        alert(`Hello ${this.state.parentName} i am ${childProp}`);
    }

    render() {
        return (
            <div>
                <ChildClassComp greetParent={this.greetParent} />   
            </div>
        );
    }
}