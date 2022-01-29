import React, { Component } from "react";
import orderServer from "./api/orders";

import Navbar from "./Navbar";
import CartItem from "./CartItem";

class Cart extends Component {

  state = {
    orders: [],
    orderTotal: 0,
    orderQty: 0,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
  }


  trashClick = async (orderId) => {

    const removeOrder = await orderServer.delete(`/orders/${orderId}`);
    const refreshOrder = await orderServer.get("/orders");
    this.setState({ orders: refreshOrder.data })

    let grandTotal = 0;
    const currentOrders = [...refreshOrder.data];

    for (const object of currentOrders) {
      grandTotal += (object.price * object.quantity);
    }

    let qtyCounter = 0;
    for (let pizza of currentOrders) {
      qtyCounter += pizza.quantity;
    }

    this.setState({ orderTotal: grandTotal, orderQty: qtyCounter })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar cartNum={this.state.orderQty} />
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Cart</h3>
        <div className="row">
          <div className="col-md-6">
            {this.state.orders.map((item) => {
              return (
                <CartItem key={item.id} ordersProp={item} image={this.state.image} trashClick={this.trashClick} />
              )
            })}
            <h3 className="ml-3">{`Grand Total: $${this.state.orderTotal}`}</h3>
          </div>
          <div className="col-md-6">
            Payment details
          </div>
        </div>
      </React.Fragment>
    );
  };

  componentDidMount = async () => {
    const serverResponse = await orderServer.get("/orders");
    const currentOrders = [...serverResponse.data];
    this.setState({ orders: currentOrders })

    let grandTotal = 0;
    for (const object of currentOrders) {
      grandTotal += (object.price * object.quantity);
    }

    let qtyCounter = 0;
    for (let pizza of currentOrders) {
      qtyCounter += pizza.quantity;
    }

    this.setState({ orderTotal: grandTotal, orderQty: qtyCounter })
  }



};

export default Cart;