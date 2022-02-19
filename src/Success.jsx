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
              <Link to={{ pathname: "/menu" }} className="btn btn-primary btn-lg">Back to Menu</Link>
            </p>
        </div>
      </div>
    )

  }

  componentDidMount = async () => {
    const ordersResponse = await orderServer.get("/orders.json");
    const currentOrders = [];

    if (ordersResponse.data != null) {
      const ordersResponseArray = Object.entries(ordersResponse.data);

      for (let item of ordersResponseArray) {
        let orderInput = item[1][0];
        orderInput.id = item[0]
        currentOrders.push(orderInput)
      };
    }
    
    

    if (currentOrders) {
      currentOrders.forEach(async (order, index) => {
        let deleteOrder = await orderServer.delete(`/orders/${order.id}.json`)
      });
    }
  }
}

export default Success;