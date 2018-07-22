import React from "react";
import ReactDOM from "react-dom";
import { Board } from "./Board";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Game of Life</h1>
      <Board />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
