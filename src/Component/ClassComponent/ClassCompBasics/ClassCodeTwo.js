import React, { Component } from 'react';

// all way of doing event binding in React class component
// in react class component you will get error if not care ful when binding the eventhandler in side render there are four known way

/* 

 1. first way to bind the handler with handler.bind(this) inside the render method event handler it self (binding in render)

 2. second way to bind the handler is that calling the event handler in arrow function body inside render method (arrow function in render )

 3. third approach is that binding the handler in the constructor it self (binding in constructor)

 4. fourth approach is providing handler as a class properties arrow function (arrow function as class properties)

*/

/* 
 coming to optimize way of providing the handler
 
 then binding in the render function is not optimized since bind will a new copy of that handler every time render run 

 providing handler in arrow function body inside render has similar issues 

 approach third which is binding in side constructor and providing handler as class property is more optimized

*/

export class ClassCodeTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.clickHandlerFour = this.clickHandlerFour.bind(this);
  }

  clickHandlerOne() {
    console.log('this one', this);
    this.setState({ name: 'name One' });
  }

  clickHandlerTwo() {
    console.log('this two', this);
    this.setState({ name: 'name Two' });
  }

  clickHandlerThree() {
    console.log('this three', this);
    this.setState({ name: 'name Three' });
  }

  clickHandlerFour() {
    console.log('this four', this);
    this.setState({ name: 'name Four' });
  }

  clickHandlerFive = () => {
    console.log('this five', this);
    this.setState({ name: 'name Five' });
  };

  render() {
    return (
      <div>
        <h1>Class Test Two</h1>
        <h2>Name-{this.state.name}</h2>
        <p>break</p>
        <button onClick={this.clickHandlerOne}>change name 1 broken</button>
        <p>break</p>
        <button onClick={this.clickHandlerTwo.bind(this)}>change name 2</button>
        <p>break</p>
        <button onClick={() => this.clickHandlerThree()}>change name 3</button>
        <p>break</p>
        <button onClick={this.clickHandlerFour}>change name 4</button>
        <p>break</p>
        <button onClick={this.clickHandlerFive}>change name 5</button>
      </div>
    );
  }
}
