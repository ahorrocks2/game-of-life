import React from "react";
import ReactDOM from "react-dom";
import BoardContainer from "./BoardContainer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Game of Life</h1>
      <BoardContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
