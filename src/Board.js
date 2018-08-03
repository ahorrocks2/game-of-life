import React from "react";
import Cell from './Cell';
import "./styles.css";

const Board = props => {
  return (
    <div className="Board"> 
      {props.cells.map(c => 
        <Cell key={c.id} alive={c.alive} />
      )}
    </div >
  )
}

export default Board;