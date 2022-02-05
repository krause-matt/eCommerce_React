import React, { Component } from "react";
import orderServer from "./api/orders";
//import StripeCheckout from "react-stripe-checkout";
//import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

import Navbar from "./Navbar";
import CartItem from "./CartItem";

//const stripe = new Stripe(process.env.REACT_APP_STRIPE_SKEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PKEY);

//const product = await stripe.products.create({name: "Pizza"});

class Cart extends Component {

  state = {
    orders: [],
    orderTotal: 0,
    orderQty: 0,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    stripeId:
    {
      Cheese:
      {
        Small: "price_1KOu0RJo80QPNKDeDrrfCraa",
        Medium: "price_1KOu0oJo80QPNKDer6NlVOXT",
        Large: "price_1KOu1CJo80QPNKDe08wg5feg"
      },
      Sausage:
      {
        Small: "price_1KPGYxJo80QPNKDebPmgqYXn",
        Medium: "price_1KPGZXJo80QPNKDevmwRbwEu",
        Large: "price_1KPGZvJo80QPNKDeA9vE3bkx"
      },
      Pepperoni:
      {
        Small: "price_1KPGaPJo80QPNKDe3kFdl3y8",
        Medium: "price_1KPGadJo80QPNKDeN58uog6R",
        Large: "price_1KPGb6Jo80QPNKDehdomB0qz"
      },
      Veggie:
      {
        Small: "price_1KPGbOJo80QPNKDedPBtxQlS",
        Medium: "price_1KPGbdJo80QPNKDekmyuLamG",
        Large: "price_1KPGbsJo80QPNKDethW31fQ0"
      },
      Deluxe:
      {
        Small: "price_1KPGcAJo80QPNKDeARwz1pZK",
        Medium: "price_1KPGcTJo80QPNKDeXQ4ks2lB",
        Large: "price_1KPGcqJo80QPNKDe4BZ226Pe"
      }
    }

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

          </div>
          <div className="col-md-6">
            <h3 className="ml-3">{`Grand Total: $${this.state.orderTotal}`}</h3>
            <button className="btn btn-success m-3" onClick={this.stripePay}>Pay with Card</button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  stripePay = async () => {
    let lineItems = []
    this.state.orders.forEach(order => {
      const pizzaString = order.pizza;
      const sizeString = order.size
      lineItems.push({
        price: this.state.stripeId[pizzaString][sizeString],
        quantity: order.quantity
      })
    })
    console.log("lineItems", lineItems)

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: lineItems,
      mode: "payment",
      successUrl: "http://localhost:3000/success",
      cancelUrl: "http://localhost:3000/error",
    })
    console.log("error", error);

    // const stripe = await stripePromise;
    // const { error } = await stripe.redirectToCheckout({
    //   lineItems: [{
    //     price: this.state.stripeId.cheese.large,
    //     quantity: this.state.orders[0].quantity
    //   }],
    //   mode: "payment",
    //   successUrl: "http://localhost:3000/menu",
    //   cancelUrl: "http://localhost:3000",
    // })
    // console.log("error", error);
  }

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