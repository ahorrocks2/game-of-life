import React, { Component } from "react";
import Board from "./Board";
import "./styles.css";

import {
  findNeighbors,
  determineNextGeneration,
  createLife
} from "./helpers";

class BoardContainer extends Component {
  state = {
    counter: 0,
    cells: []
  };

  setupBoard = () => {
    let x = 1;
    let y = 20;
    let cells = [];

    for (let i = 1; i < 401; i++) {
      cells.push({
        id: i,
        coord: {
          x: x,
          y: y
        },
        neighbors: findNeighbors(x, y),
        alive: false
      });

      x % 20 === 0 ? (x = 1) : x++;
      x % 20 === 1 && y--;
    }

    this.setState({
      ...this.state,
      cells: createLife(cells)
    });
  };

  start = () => {
    let self = this;

    this.interval = setInterval(() => {
      const nextGeneration = determineNextGeneration(
        this.state.cells.map(c => ({ ...c }))
      );
      const currentGeneration = this.state.cells;

      if (
        JSON.stringify(nextGeneration) === JSON.stringify(currentGeneration)
      ) {
        clearInterval(self.interval);
      } else {
        this.setState({
          counter: this.state.counter + 1,
          cells: nextGeneration
        });
      }
    }, 1000);
  };

  restart = () => {
    clearInterval(this.interval);
    const newLife = createLife(this.state.cells.map(c => ({ ...c })));
    this.setState({
      counter: 0,
      cells: newLife
    });
    this.start();
  };

  componentDidMount = () => {
    this.setupBoard();
    this.start();
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div>
        <Board cells={this.state.cells}/>
        <button className='restartButton' onClick={() => this.restart}>Restart</button>
        <p>Generation {this.state.counter}</p>
      </div>
    );
  }
}

export default BoardContainer;