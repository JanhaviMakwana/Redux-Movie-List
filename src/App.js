import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css';
import Auth from './components/Auth/Auth';
import Navigation from './components/UI/Navigation/Navigation';
import FullPost from './components/MovieList/FullMovie/FullMovie';
import MovieList from './components/MovieList/MovieList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/movies/:id" component={FullPost} />
          <Route path="/movies" component={MovieList} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
