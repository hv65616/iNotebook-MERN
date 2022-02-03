import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/home">
            <Home></Home>
          </Route>

          <Route exact path="/about">
            <About></About>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
