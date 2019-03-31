import React, { Component } from "react";
import Calculator from "./components/Calculator/Calculator";
import classes from "./App.css";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <h1>CALCULATOR</h1>
        <Calculator />
      </div>
    );
  }
}

export default App;
