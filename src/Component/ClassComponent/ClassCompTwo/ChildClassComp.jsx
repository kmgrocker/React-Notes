import React from 'react';

export class ChildClassComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childName:'Sonu'
        };
    }


    render() {
        return (
            <div>
                 <button onClick={this.props.greetParent.bind(this,this.state.childName)}>greet parent from child</button>
                <h1>Child Class Component</h1>
            </div>
        );
    }
}