import React from "react";
import NotesContext from "./notesContext";

const NotesState = (props) => {
  return (
    <NotesContext.Provider value={{}}>{props.children}</NotesContext.Provider>
  );
};

export default NotesState;
