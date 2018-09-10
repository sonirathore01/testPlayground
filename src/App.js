import React, { Component } from 'react';
import Table from './components/table';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Build UI</h1>
        </header>
        <div>
            <Table/>
        </div>
      </div>
    );
  }
}

export default App;
