import React from 'react';
import ReactDOM from 'react-dom';
import Inputs from "./components/Inputs.jsx";

import "./index.scss";

function render() {
  ReactDOM.render(<Inputs />, document.getElementById("app"));
}

render();