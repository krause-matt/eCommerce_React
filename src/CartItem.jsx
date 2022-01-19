import React, { Component } from "react";

class CartItem extends Component {
  state = {
    orders: this.props.ordersProp
  }
  render() {
    return (
      <React.Fragment>
        <div className="card ml-3 mb-3">
          <div className="row no-gutters">
            <div className="col-sm-6">
              <div className="card-header"><h6>Item</h6></div>
              <div className="card-body">
                <img className="img-fluid" src={this.props.image} alt="..." />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card-header"><h6>Details</h6></div>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">Quantity:</li>
                  <li className="list-group-item">Size:</li>
                  <li className="list-group-item">Customizations:</li>
                </ul>
                <h5 className="card-title mt-3">Total</h5>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default CartItem;