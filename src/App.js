import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import NotesState from "./context/notes/notesState";
function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar></Navbar>
          <div className="container">
            <Switch>
              <Route exact path="/home">
                <Home></Home>
              </Route>

              <Route exact path="/about">
                <About></About>
              </Route>
            </Switch>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
