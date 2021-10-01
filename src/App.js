import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Slots from './components/Slots';
import axios from 'axios';
import * as R from 'ramda';

const App = () => {
  axios.interceptors.response.use(response => {
    if (R.path(['response', 'status'], response) === 401) {
      window.location.href = '/';
    }
    return response;
  }, error => {
    return error;
  });

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/slots">
            <Slots />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;