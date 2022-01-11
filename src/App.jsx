import React, { Component } from "react";
import Navbar from "./Navbar";
import Customers from "./Customers";
import Cart from "./Cart";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Cart />
      </React.Fragment>
    );
  };
};

export default App;