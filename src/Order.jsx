import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import orderServer from "./api/orders";

import Navbar from "./Navbar";
import Cart from "./Cart";

class Order extends Component {

  state = {
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    sizes: [{ size: "Small", price: 10 }, { size: "Medium", price: 13 }, { size: "Large", price: 15 }],
    toppings: [{ id: 1, topping: "Extra Cheese" }, { id: 2, topping: "Green Pepper" }, { id: 3, topping: "Olive" }],
    sizeSelect: "",
    priceSelect: "",
    toppingSelect: [{ topping: "Extra Cheese", added: false }, { topping: "Green Pepper", added: false }, { topping: "Olive", added: false }],
    sizeWarning: "",
    orders: [],
    orderNum: ""
  }

  render() {
    return (
      <React.Fragment>
        <Navbar cartNum={this.state.orderNum}/>
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Customize Order</h3>
        <div className="card m-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              <div className="card-header"><h4>Pizza</h4></div>
              <div className="card-body">
                <img className="img-fluid" src={this.state.image} alt="..." />
              </div>
            </div>
            <div className="col-md-3 border-left">
              <div className="card-header"><h4>Select Size</h4></div>
              <div className="card-body">
                {this.state.sizes.map((item) => {
                  return (
                    <div key={item.size}>
                      <input type="radio" id={item.size} name="size" value={item.price} onClick={(event) => { this.sizeSelect(event.target) }} />
                      <label className="ml-3" for={item.size}>{`${item.size}: $${item.price}`}</label>
                    </div>
                  )
                })}
                <div className="text-danger">{this.state.sizeWarning}</div>
              </div>
            </div>
            <div className="col-md-6 border-left">
              <div className="card-header"><h4>Additional Toppings</h4></div>
              <div className="card-body">
                {this.state.toppings.map((item) => {
                  return (
                    <div key={item.id}>
                      <input type="checkbox" id={item.id} name={item.topping} value={item.id} onClick={(event) => { this.toppingSelect(event.target) }} />
                      <label className="ml-3" for={item.id}>{item.topping}</label>
                      {this.state.toppingSelect[item.id - 1].added ? this.toppingAmount(item.id) : ""}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-warning m-3" onClick={(event) => {this.orderProcess(event)}}>TEST</button>
        <Link to="/cart" className="btn btn-success m-3">Add to Cart</Link>
      </React.Fragment>
    );
  };

  sizeSelect = (target) => {
    this.setState({
      sizeSelect: target.id,
      priceSelect: target.value
    })
  }

  toppingSelect = (target) => {
    const allToppings = [...this.state.toppingSelect];
    allToppings[target.value - 1].added = target.checked;
    this.setState({ toppingSelect: allToppings })
  }

  toppingAmount = (itemId) => {
    return (
      <select id={`toppingAmount-${itemId}`} className="ml-3" name="toppingAmount">
        <option value="normal">Normal</option>
        <option value="easy">Easy</option>
        <option value="extra">Extra</option>
      </select>
    )
  }

  orderProcess = async (e) => {
    if (!this.state.sizeSelect) {
      this.setState({ sizeWarning: "Please select a size" })
      return
    } else {
      this.setState({ sizeWarning: "" })
    }
    const toppingExtraCheese = document.querySelector("#toppingAmount-1")
    const toppingGreenPepper = document.querySelector("#toppingAmount-2")
    const toppingOlive = document.querySelector("#toppingAmount-3")

    for (const item of this.state.toppingSelect) {
      if (item.added) {
        console.log("Topping", item.topping)
      }
    }

    const currentOrder = {};
    currentOrder.size = this.state.sizeSelect;
    currentOrder.price = this.state.priceSelect;
    const orderAdd = [currentOrder];
    this.setState({orders: orderAdd})

    //const deleteTest = await orderServer.delete("/orders/1");
    const result = await orderServer.post("/orders", currentOrder);

    const serverResponse = await orderServer.get("/orders");
    const currentOrders = [...serverResponse.data];
    this.setState({ orderNum: currentOrders.length })
  }

};

export default Order;