import React from "react";
import NotesContext from "./notesContext";
import { useState } from "react";
const NotesState = (props) => {
  const notesInitial = [
    {
      _id: "61f6ac2a7898a021599ea5d0",
      user: "61f6abdd7898a021599ea5cc",
      title: "Hello World",
      description: "This world is a lovely and bad place",
      tag: "World",
      date: "2022-01-30T15:18:02.471Z",
      __v: 0,
    },
    {
      _id: "61f7bae0055042cdf4b2bc5a",
      user: "61f6abdd7898a021599ea5cc",
      title: "World is lovely battlefield",
      description:
        "This world is a very lovely place with guns and grenades equipped",
      tag: "World",
      date: "2022-01-31T10:33:04.807Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NotesContext.Provider value={{ notes }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
