import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

class Navbar extends Component {
  
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
          <div className="d-flex justify-content-center align-items-center">
            <Link className="navbar-brand" to="/" onClick={this.setCookie}>
              <img src="images/pizza.svg" width="60" height="60" className="d-inline-block align-top" alt="" />
            </Link>
            <Link to="/" onClick={this.setCookie}><h1 className="d-inline-block page-title"><b>The Pizza Place</b></h1></Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse font-weight-bold" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active mx-3">
                <Link to="/menu" className="nav-link"><h3><b>Menu</b></h3></Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/order" className="nav-link"><h3><b>Order</b></h3></Link>
              </li>
              <li className="nav-item ml-3">
                <Link to="/cart" className="nav-link"><h3><b>Cart</b></h3></Link>
              </li>
              <li>
                <span className="badge badge-pill badge-light">{this.props.cartNum? this.props.cartNum : ""}</span>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    )
  }

  setCookie = () => {
    document.cookie = `prevUrl=${window.location.href}; SameSite=None; Secure`
  }
}

export default Navbar;