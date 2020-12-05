import React from 'react'
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.scss'
import {ApiState} from "./context/ApiState";
import Home from "./pages/home/home";
require('dotenv').config()

function App() {
  return (
    <ApiState>
      <Router>
        <Switch>
          <Route path={'/'} exact component={Home} />
        </Switch>
      </Router>
    </ApiState>
  );
}

export default App;
