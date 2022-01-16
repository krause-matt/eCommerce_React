import React, { Component } from "react";

import Navbar from "./Navbar";
import Login from "./Login";
import Customers from "./Customers";
import Cart from "./Cart";
import Menu from "./Menu";

import { Route, Routes} from "react-router";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/menu" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;