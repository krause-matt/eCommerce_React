import React, { Component } from "react";

import Login from "./Login";
import Customers from "./Customers";
import Menu from "./Menu";
import Order from "./Order";
import Cart from "./Cart";
import Success from "./Success";
import Error from "./Error";

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
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;