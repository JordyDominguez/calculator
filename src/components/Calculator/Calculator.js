import React, { Component } from "react";

import CalcOutput from "../CalcOutput/CalcOutput";
import classes from "./Calculator.css";

class Calculator extends Component {
  state = {
    screen: "0",
    value: null,
    waitingOperation: false,
    inputOperation: null
  };

  inputDigit(digit) {
    if (this.state.waitingOperation) {
      this.setState({
        screen: String(digit),
        waitingOperation: false
      });
    } else {
      this.setState({
        screen:
          this.state.screen === "0" ? String(digit) : this.state.screen + digit
      });
    }
  }

  inputDot() {
    if (this.state.waitingOperation) {
      this.setState({
        screen: "0.",
        waitingOperation: false
      });
    } else if (this.state.screen.indexOf(".") === -1) {
      this.setState({
        screen: this.state.screen + ".",
        waitingOperation: false
      });
    }
  }

  togglePosNeg() {
    this.setState({
      screen:
        this.state.screen.charAt(0) === "-"
          ? this.state.screen.substr(1)
          : "-" + this.state.screen
    });
  }

  percentOf() {
    const val = parseFloat(this.state.screen);
    this.setState({
      screen: String(val / 100)
    });
  }

  inputOperation(symbol) {
    const { value, screen, inputOperation } = this.state;
    const inputValue = parseFloat(screen);

    const operations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue
    };

    if (value == null) {
      this.setState({
        value: inputValue
      });
    } else if (inputOperation) {
      const currentValue = value || 0;
      const newValue = operations[inputOperation](currentValue, inputValue);
      const newValueString = String(newValue);

      if (inputOperation === "/" && newValueString.indexOf(".") > 0) {
        if (newValue)
          this.setState({
            value: newValue,
            screen: String(newValue.toFixed(4)),
            waitingOperation: false,
            inputOperation: null
          });
      } else {
        if (newValue)
          this.setState({
            value: newValue,
            screen: newValueString,
            waitingOperation: false,
            inputOperation: null
          });
      }
    }

    this.setState({
      waitingOperation: true,
      inputOperation: symbol
    });
  }

  ClearDisplay() {
    this.setState({
      screen: "0",
      value: null,
      waitingOperation: false,
      inputOperation: null
    });
  }

  render() {
    return (
      <div className={classes.Calculator}>
        <CalcOutput value={this.state.screen} />
        <div className={classes.Buttons}>
          <button
            className={classes.Functions}
            onClick={() => this.ClearDisplay()}
          >
            AC
          </button>
          <button
            className={classes.Functions}
            onClick={() => this.togglePosNeg()}
          >
            +/-
          </button>
          <button
            className={classes.Functions}
            onClick={() => this.percentOf()}
          >
            %
          </button>
          <button
            className={classes.Functions}
            onClick={() => this.inputOperation("/")}
          >
            /
          </button>
        </div>
        <div className={classes.Buttons}>
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
          <button
            className={classes.Functions}
            onClick={() => this.inputOperation("*")}
          >
            X
          </button>
        </div>
        <div className={classes.Buttons}>
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button
            className={classes.Functions}
            onClick={() => this.inputOperation("+")}
          >
            +
          </button>
        </div>
        <div className={classes.Buttons}>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button
            className={classes.Functions}
            onClick={() => this.inputOperation("-")}
          >
            -
          </button>
        </div>
        <div className={classes.Buttons}>
          <button className={classes.Zero} onClick={() => this.inputDigit(0)}>
            0
          </button>
          <button onClick={() => this.inputDot()}>.</button>
          <button
            className={classes.Functions}
            onClick={() => this.inputOperation("=")}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
