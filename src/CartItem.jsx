import React, { Component } from "react";
import "./index.css";

class CartItem extends Component {
  state = {
    orders: this.props.ordersProp,
    itemCost: "",
    customTopping: false,
    
  }

  render() {
    return (
      <React.Fragment>
        <div className="card ml-3 mb-3">
          <div className="row no-gutters">
            <div className="col-sm-6">
              <div className="card-header font-weight-bold fixed-height"><span className="h5">Item: </span><span className="h5">{this.state.orders.pizza}</span></div>
              <div className="card-body">
                <img className="img-fluid" src={this.props.image} alt="" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card-header text-right fixed-height"><img src="images/trash-solid.svg" width="40" height="20" className="pointer" alt="" onClick={() => this.props.trashClick(this.state.orders)} /></div>
              <div className="card-body">
                <div className="text-center"><h5>Details</h5></div>
                <ul className="list-group">
                  <li className="list-group-item"><span>Size: </span><span>{this.state.orders.size}</span></li>
                  <li className="list-group-item"><span>Price: </span><span>{this.state.orders.price}</span></li>
                  <li className="list-group-item"><span>Quantity: </span><span>{this.state.orders.quantity}</span></li>
                  <li className="list-group-item">
                    {(this.state.customTopping) ?
                      (
                        this.state.orders.toppings.map((toppingObject) => {
                          if (toppingObject.added) {
                            return (
                              <div key={toppingObject.topping}>{toppingObject.topping} - {toppingObject.amount}</div>
                            )
                          }
                        })
                      ) : "No custom toppings"
                    }
                  </li>

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

    if (this.state.orders.toppings) {
      let toppingCount = 0;
      for (let topping of this.state.orders.toppings) {
        if (topping.added) {
          toppingCount += 1;
        }
      }
      if (toppingCount > 0) {
        this.setState({ customTopping: true });
      }

    }
  }
};

export default CartItem;