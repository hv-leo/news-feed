import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import NewsSite from './containers/NewsSite/NewsSite';

class App extends Component {
  render () {
    return (
      <Router>
        <NewsSite />
      </Router>
    );
  }
}

export default App;
