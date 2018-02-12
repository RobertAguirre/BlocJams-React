import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="App-nav">
            <Link to='/' className="logo-hover">
              <img className="logo" src="/assets/images/bloc_jams_logo.png" alt="BlocJams-logo"/>
            </Link>
            <Link to='/library' className="homelink">Collection</Link>
            <Link to='/' className="homelink ion-home"></Link>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
