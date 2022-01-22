import React, { Component } from "react";

class CartItem extends Component {
  state = {
    orders: this.props.ordersProp,
    itemCost: ""
  }
  render() {
    return (
      <React.Fragment>
        <div className="card ml-3 mb-3">
          <div className="row no-gutters">
            <div className="col-sm-6">
              <div className="card-header"><span>Item:</span><span>{this.state.orders.pizza}</span></div>
              <div className="card-body">
                <img className="img-fluid" src={this.props.image} alt="..." />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card-header"><h6>&nbsp;</h6></div>
              <div className="card-body">
                <div className="text-center"><h6>Details</h6></div>
                <ul className="list-group">
                  <li className="list-group-item"><span>Size:</span><span>{this.state.orders.size}</span></li>
                  <li className="list-group-item"><span>Price:</span><span>{this.state.orders.price}</span></li>
                  <li className="list-group-item"><span>Quantity:</span><span>{this.state.orders.quantity}</span></li>
                  <li className="list-group-item">{this.state.orders.customizations !== undefined ? `Customizations: ${this.state.orders.customizations}` : "Customizations: None"}</li>
                </ul>
                <h5 className="card-title mt-3">{`Item Cost: $${this.state.itemCost}`}</h5>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  componentDidMount = () => {
    const totalCalc = this.state.orders.quantity * this.state.orders.price;
    this.setState({ itemCost: totalCalc })
  }
};

export default CartItem;