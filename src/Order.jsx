import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import orderServer from "./api/orders";

import Navbar from "./Navbar";
import Cart from "./Cart";
import orders from "./api/orders";

class Order extends Component {

  state = {
    toppings: [
      { id: 1, topping: "Extra Cheese" },
      { id: 2, topping: "Green Pepper" },
      { id: 3, topping: "Olive" },
      { id: 4, topping: "Onion" },
      { id: 5, topping: "Pepperoni" },
      { id: 6, topping: "Sausage" },
      { id: 7, topping: "Tomato" }
    ],
    sizeSelect: "",
    priceSelect: "",
    toppingSelect: [
      { topping: "Extra Cheese", added: false },
      { topping: "Green Pepper", added: false },
      { topping: "Olive", added: false },
      { topping: "Onion", added: false },
      { topping: "Pepperoni", added: false },
      { topping: "Sausage", added: false },
      { topping: "Tomato", added: false }
    ],
    sizeWarning: "",
    orders: [],
    orderNum: "",
    pizzaId: "",
    currentItem: {},
    incomingQuantity: 0,
    incomingSize: ""
  }

  render() {
    return (
      <React.Fragment>
        <Navbar cartNum={this.state.orders.length} />
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Customize Order</h3>
        <div className="card m-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              <div className="card-header"><h4>{this.state.currentItem.pizza} Pizza</h4></div>
              <div className="card-body">
                <img className="img-fluid" src={this.state.currentItem.image} alt="..." />
              </div>
            </div>
            <div className="col-md-3 border-left">
              <div className="card-header"><h4>Select Size</h4></div>
              <div className="card-body">
                <div>
                  <input type="radio" id="Small" name="size" value={this.state.currentItem.small} onChange={(event) => { this.sizeSelect(event.target) }} checked={(this.state.incomingSize === "Small") ? true : false} />
                  <label className="ml-3" for="Small">Small: ${this.state.currentItem.small}</label>
                </div>
                <div>
                  <input type="radio" id="Medium" name="size" value={this.state.currentItem.medium} onChange={(event) => { this.sizeSelect(event.target) }} checked={(this.state.incomingSize === "Medium") ? true : false} />
                  <label className="ml-3" for="Medium">Medium: ${this.state.currentItem.medium}</label>
                </div>
                <div>
                  <input type="radio" id="Large" name="size" value={this.state.currentItem.large} onChange={(event) => { this.sizeSelect(event.target) }} checked={(this.state.incomingSize === "Large") ? true : false} />
                  <label className="ml-3" for="Large">Large: ${this.state.currentItem.large}</label>
                </div>
                <div className="text-danger">{this.state.sizeWarning}</div>
                <hr></hr>
                <div className="mb-3">Quantity</div>
                <select name="pizza-quantity" value={this.state.incomingQuantity} onChange={(e) => this.quantityChange(e)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 border-left">
              <div className="card-header"><h4>Extra Toppings</h4></div>
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
        <button className="btn btn-warning m-3" onClick={(event) => { this.orderProcess(event) }}>TEST</button>
        <Link to="/cart" className="btn btn-success m-3">Add to Cart</Link>
      </React.Fragment>
    );
  };

  sizeSelect = (target) => {
    this.setState({
      sizeSelect: target.id,
      priceSelect: target.value,
      incomingSize: target.id
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
    currentOrder.pizza = this.state.currentItem.pizza;
    currentOrder.size = this.state.sizeSelect;
    currentOrder.quantity = this.state.incomingQuantity;
    currentOrder.price = this.state.priceSelect;
    //TOPPINGS PLACEHOLDER currentOrder.toppings

    const orderAdd = [currentOrder];
    this.setState({ orders: orderAdd })

    //const deleteTest = await orderServer.delete("/orders/1");
    const result = await orderServer.post("/orders", currentOrder);

    const serverResponse = await orderServer.get("/orders");
    const currentOrders = [...serverResponse.data];
    this.setState({ orderNum: currentOrders.length })
  }

  quantityChange = (e) => {
    this.setState({incomingQuantity: e.target.value})
  }


  componentDidMount = async () => {
    const ordersResponse = await orderServer.get("http://localhost:5000/orders");
    const currentOrders = [...ordersResponse.data];
    this.setState({ orders: currentOrders })

    const incomingQuantity = document.location.search.split("?")[1].split("=")[1]; // Quantity
    this.setState({ incomingQuantity: incomingQuantity });
    const incomingSize = document.location.search.split("?")[2].split("=")[1]; // Size
    this.setState({ incomingSize: incomingSize });
    this.setState({ sizeSelect: incomingSize })
    const incomingPrice = document.location.search.split("?")[3].split("=")[1]; // Price
    this.setState({ priceSelect: incomingPrice })

    const pizzaId = document.location.href.split("#")[1];
    this.setState({ pizzaId: pizzaId });
    const pizzaIdResponse = await orderServer.get(`items/${pizzaId}`);
    this.setState({ currentItem: pizzaIdResponse.data });
  }

};

export default Order;

{ /* Initial rendering of size/price radio buttons
{this.state.sizes.map((item) => {
  return (
    <div key={item.size}>
      <input type="radio" id={item.size} name="size" value={item.price} onClick={(event) => { this.sizeSelect(event.target) }} />
      <label className="ml-3" for={item.size}>{`${item.size}: $${item.price}`}</label>
    </div>
  )
})}

*/}