import React from "react";
import { useContext } from "react";
import notesContext from "../context/notes/notesContext";
import { useEffect } from "react";

export const About = () => {
  const a = useContext(notesContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>
        This is about {a.state.name} and he is in class {a.state.class}
      </h1>
    </div>
  );
};
