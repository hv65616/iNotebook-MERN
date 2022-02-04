import React from "react";
import NotesContext from "./notesContext";
import { useState } from "react";
const NotesState = (props) => {
  const state1 = {
    name: "Himanshu",
    class: "5r",
  };
  const [state, setState] = useState(state1);
  const update = () => {
    setTimeout(() => {
      setState({ name: "Verma", class: "2r" });
    }, 1000);
  };
  return (
    <NotesContext.Provider value={{ state, update }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
