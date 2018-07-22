import React, { Component } from "react";
import "./styles.css";

const styleize = props => {
  return {
    background: props.alive ? "blue" : "cyan"
  };
};

const Cell = props => {
  return <div className="Cell" style={styleize(props)} />;
};

export default Cell;
