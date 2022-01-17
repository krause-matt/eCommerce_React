import React, { Component } from "react";

import Navbar from "./Navbar";
import Login from "./Login";
import Customers from "./Customers";
import Menu from "./Menu";
import Order from "./Order";
import Cart from "./Cart"

import { Route, Routes} from "react-router";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;