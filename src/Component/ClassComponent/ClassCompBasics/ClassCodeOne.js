import React, { Component } from 'react';
// this will show you class component internal with react architechure
export class ClassCodeOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    console.log('this component did mount');
    //  window.addEventListener('mousemove',this.logMousePosition)
    this.logMousePosition();
  }

  componentWillUnmount() {
    console.log('component will unmount');
    // window.removeEventListener('mousemove', this.logMousePosition);
  }

  logMousePosition() {
    console.log('this', this);
    this.tempMethod();
    // this.setState({ x: 2 });
  }

  tempMethod() {
    console.log('done');
  }

  logAnother = () => {
    console.log('this another', this);
  };

  render() {
    return (
      <div>
        <h1>test</h1>
        <h2>X :{this.state.x}</h2>

        <button onClick={this.logMousePosition}>
          binding method wrong in case of this key
        </button>

        <br />

        <button onClick={this.logMousePosition.bind(this)}>
          binding method one
        </button>
        <br />
        <button onClick={() => this.logMousePosition()}>
          binding method Two
        </button>
      </div>
    );
  }
}
