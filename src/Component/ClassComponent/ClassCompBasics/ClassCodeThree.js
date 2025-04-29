import React, { Component } from 'react';

/* 
 in this we will again try all way of event binding with passing param in the event in multiple cases
*/

export class ClassCodeThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.clickHandlerFour = this.clickHandlerFour.bind(this);
  }

  clickHandlerOne(e, event) {
    console.log('this one', this);
    console.log('event one', e);
    console.log('event', event);
    this.setState({ name: 'name One' });
  }

  clickHandlerTwo(e, userId) {
    console.log('handler two param', userId);
    console.log('handler two event', e);
    console.log('this two', this);
    this.setState({ name: `Two with user id ${userId}` });
  }

  clickHandlerThree(event, str) {
    console.log('event three', event);
    console.log('str', str);
    console.log('this three', this);
    this.setState({ name: 'name Three' });
  }

  // with four in order to pass a param you have to use bind again in the function
  clickHandlerFour() {
    console.log('this four', this);
    this.setState({ name: 'name Four' });
  }

  clickHandlerFive = () => {
    console.log('this five', this);
    this.setState({ name: 'name Five' });
  };

  clickHandlerSix = (e) => {
    console.log('event six', e);
    console.log('this six', this);
    this.setState({ name: 'name SIx' });
  };

  clickHandlerSeven = (e, data) => {
    console.log('event seven', e);
    console.log('event seven param', data);
    console.log('this seven', this);
    this.setState({ name: 'name Seven' });
  };

  render() {
    return (
      <div>
        <h1>Class Test Two</h1>
        <h2>Name-{this.state.name}</h2>
        <p>break</p>
        <button onClick={this.clickHandlerOne.bind(this, 22)}>
          change name without event object
        </button>
        <p>break</p>
        <button onClick={this.clickHandlerTwo.bind(this, 5789)}>
          change name 2 with event
        </button>
        <p>break</p>
        <button onClick={(e) => this.clickHandlerThree(e, 'arrow')}>
          change name 3
        </button>
        <p>break</p>
        <button onClick={this.clickHandlerFour}>change name 4</button>
        <p>break</p>
        <button onClick={this.clickHandlerFive}>change name 5</button>
        <p>break</p>
        <button onClick={this.clickHandlerSix.bind(this, 57)}>
          change name 6
        </button>

        <p>break</p>
        <button onClick={(e) => this.clickHandlerSeven(e, 4789)}>
          change name 7
        </button>
      </div>
    );
  }
}
