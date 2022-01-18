import React, { Component } from "react";

class CartItem extends Component {
  state = {
    orders: this.props.ordersProp
  }
  render() {
    return (
      <React.Fragment>
        <div className="card m-3">
          <div className="row no-gutters">
            <div className="col-sm-6">
              <div className="card-header"><h6>Item</h6></div>
              <div className="card-body">
                <img className="img-fluid" src={this.props.image} alt="..." />
              </div>
            </div>
            <div className="col-sm-6 border-left">
              <div className="card-header"><h6>Details</h6></div>
              <div className="card-body">
                {this.state.orders.price}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default CartItem;