import React, { Component } from "react";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Main />
      </React.Fragment>
    );
  };
};

export default App;