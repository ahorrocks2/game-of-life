import React, { Component } from "react";
import Cell from "./Cell";
import {
  findNeighbors,
  determineNextGeneration,
  createLife,
  nextGenerationCanSurvive
} from "./helpers";
import "./styles.css";

export class Board extends Component {
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
      x % 20 === 1 ? y-- : null;
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
    const newLife = createLife(this.state.cells);
    this.setState({
      counter: 0,
      cells: newLife
    });
    this.start();
  };

  componentWillMount = () => {
    this.setupBoard();
  };

  componentDidMount = () => {
    this.start();
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div>
        <button className="restartButton" onClick={() => this.restart()}>
          Restart
        </button>
        <p>Generation {this.state.counter}</p>

        <div className="Board">
          {this.state.cells.map(c => <Cell key={c.id} alive={c.alive} />)}
        </div>
      </div>
    );
  }
}
