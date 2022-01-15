import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
          <a className="navbar-brand" href="/#">
            <img src="images/pizza.svg" width="40" height="40" className="d-inline-block align-top" alt="" />
            <b>Pizza Store</b>
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse font-weight-bold" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/#">Customers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">Cart</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">Checkout</a>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
      
    )
  }
}

export default Navbar;