import React from "react";

import classes from "./CalcOutput.css";

function numberWithCommas(value) {
  var parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const calcOutput = props => (
  <div className={classes.CalcOutput}>
    <p className={classes.Text}>{numberWithCommas(props.value)}</p>
  </div>
);

export default calcOutput;
