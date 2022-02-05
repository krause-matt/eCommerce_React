import React, { Component } from "react";
import "./index.css";
import orderServer from "./api/orders";
import orders from "./api/orders";

class Success extends Component {
  render() {
    return (
      <div className="background-div">
        <div className="jumbotron jumbotron-fluid p-5 ml-3 mr-3">
          <h1 className="display-4">Success!</h1>
          <p className="lead">Your order will be ready for pickup shortly.</p>
          <hr className="my-4"></hr>
            <p>Thank you for ordering at Pizza Place. We appreciate your business.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="http://localhost:3000/menu" role="button">Back to Menu</a>
            </p>
        </div>
      </div>
    )

  }

  componentDidMount = async () => {
    const orderResponse = await orderServer.get("/orders");
    const orderArray = orderResponse.data;

    if (orderArray) {
      orderArray.forEach(async (order, index) => {
        let deleteOrder = await orderServer.delete(`/orders/${index + 1}`)
      });
    }
  }
}

export default Success;