import React, { Component } from "react";
import "./index.css";
import orderServer from "./api/orders";
import Navbar from "./Navbar";

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
      { topping: "Extra Cheese", added: false, amount: "Normal" },
      { topping: "Green Pepper", added: false, amount: "Normal" },
      { topping: "Olive", added: false, amount: "Normal" },
      { topping: "Onion", added: false, amount: "Normal" },
      { topping: "Pepperoni", added: false, amount: "Normal" },
      { topping: "Sausage", added: false, amount: "Normal" },
      { topping: "Tomato", added: false, amount: "Normal" }
    ],
    pizzaWarning: "",
    sizeWarning: "",
    qtyWarning: "",
    orders: [],
    orderNum: "",
    orderQty: 0,
    pizzaId: "",
    currentItem: {},
    incomingQuantity: 0,
    incomingSize: "",
    noMenuSelection: false,
    pizzaImage: [
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1620374645310-f9d97e733268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
      "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621070766841-a7bf1ee96df0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    pizzaPrice: [
      { small: 10, medium: 13, large: 15 },
      { small: 11, medium: 14, large: 16 },
      { small: 11, medium: 14, large: 16 },
      { small: 11, medium: 14, large: 16 },
      { small: 12, medium: 15, large: 17 },
    ]
  }

  render() {
    return (
      <React.Fragment>
        <Navbar cartNum={this.state.orderQty} />
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Customize Order</h3>
        <div className="card m-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              {this.state.noMenuSelection ? (
                <React.Fragment>
                  <div className="card-header">{(this.state.currentItem.pizza) ? <h4>{this.state.currentItem.pizza} Pizza</h4> : <h4>Select Pizza!</h4>}</div>
                  <div className="card-body">
                    <img className="img-fluid" src={this.state.currentItem.image} alt="" />
                    <select name="pizza-type" value={this.state.currentItem.pizza} onChange={(e) => this.pizzaChoice(e)}>
                      <option value="">Select Pizza...</option>
                      <option value="Cheese">Cheese</option>
                      <option value="Sausage">Sausage</option>
                      <option value="Pepperoni">Pepperoni</option>
                      <option value="Veggie">Veggie</option>
                      <option value="Deluxe">Deluxe</option>
                    </select>
                    <div className="text-danger">{this.state.pizzaWarning}</div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="card-header"><h4>{this.state.currentItem.pizza} Pizza</h4></div>
                  <div className="card-body">
                    <img className="img-fluid" src={this.state.currentItem.image} alt="..." />
                  </div>
                </React.Fragment>
              )}

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
                  <option value="">Select Quantity</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <div className="text-danger">{this.state.qtyWarning}</div>
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
        <Link to={{ pathname: "/cart" }} className="btn btn-success m-3" onClick={(e) => this.orderProcess(e)}>Add to Cart</Link>
      </React.Fragment>
    );
  };

  sizeSelect = (target) => {
    this.setState({
      sizeSelect: target.id,
      priceSelect: target.value,
      incomingSize: target.id,
      sizeWarning: ""
    })
  }

  toppingSelect = (target) => {
    const allToppings = [...this.state.toppingSelect];
    allToppings[target.value - 1].added = target.checked;
    this.setState({ toppingSelect: allToppings })
  }

  toppingAmount = (itemId) => {
    return (
      <select id={`toppingAmount-${itemId}`} className="ml-3" name="toppingAmount" onChange={(e) => this.toppingAmountSelected(e, itemId)}>
        <option value="Normal">Normal</option>
        <option value="Easy">Easy</option>
        <option value="Extra">Extra</option>
      </select>
    )
  }

  toppingAmountSelected = (e, itemId) => {
    const allToppings = [...this.state.toppingSelect];
    allToppings[itemId - 1].amount = e.target.value;
  }

  orderProcess = async (e) => {

    if (!this.state.sizeSelect) {
      this.setState({ sizeWarning: "Please select a size" })
      e.preventDefault();
    } else {
      this.setState({ sizeWarning: "" })
    }

    if (!this.state.currentItem.pizza) {
      this.setState({ pizzaWarning: "Please select a pizza" })
      e.preventDefault();
    } else {
      this.setState({ pizzaWarning: "" })
    }

    if (!this.state.incomingQuantity) {
      this.setState({ qtyWarning: "Please select quantity" })
      e.preventDefault();
    } else {
      this.setState({ qtyWarning: "" })
    }

    if (!this.state.sizeSelect || !this.state.currentItem.pizza || !this.state.incomingQuantity) {
      e.preventDefault();
      return;
    }

    const currentOrder = {};
    currentOrder.pizza = this.state.currentItem.pizza;
    currentOrder.size = this.state.sizeSelect;
    currentOrder.quantity = parseInt(this.state.incomingQuantity, 10);
    currentOrder.price = document.querySelector("input[name=size]:checked").value
    currentOrder.toppings = this.state.toppingSelect;

    const orderAdd = [currentOrder];
    this.setState({ orders: orderAdd })

    const orderSend = await orderServer.post("/orders.json", orderAdd);

    const serverResponse = await orderServer.get("/orders.json");
    const ordersResponseArray = Object.entries(serverResponse.data);
    const currentOrders = [];
    for (let item of ordersResponseArray) {
      currentOrders.push(item[1][0])
    };

    this.setState({ orderNum: currentOrders.length })
  }

  quantityChange = (e) => {
    this.setState({ incomingQuantity: e.target.selectedIndex, qtyWarning: "" });
  }

  pizzaChoice = (e) => {
    const num = e.target.selectedIndex;

    if (num === 0) {
      const pizzaBuild = { ...this.state.currentItem };
      pizzaBuild.pizza = "";
      pizzaBuild.image = "";
      this.setState({ currentItem: pizzaBuild })
      return
    }
    const pizzaBuild = {};
    pizzaBuild.pizza = e.target.value
    pizzaBuild.image = this.state.pizzaImage[num - 1];
    pizzaBuild.small = this.state.pizzaPrice[num - 1].small;
    pizzaBuild.medium = this.state.pizzaPrice[num - 1].medium;
    pizzaBuild.large = this.state.pizzaPrice[num - 1].large;
    this.setState({ currentItem: pizzaBuild, pizzaWarning: "" });
  }

  componentDidMount = async () => {
    const ordersResponse = await orderServer.get("/orders.json");
    const currentOrders = [];

    if (ordersResponse.data != null) {
      const ordersResponseArray = Object.entries(ordersResponse.data);

      for (let item of ordersResponseArray) {
        currentOrders.push(item[1][0])
      };
    }

    this.setState({ orders: currentOrders });

    let qtyCounter = 0;
    for (let pizza of currentOrders) {
      qtyCounter += pizza.quantity;
    };

    this.setState({ orderQty: qtyCounter });

    if (document.location.search) {

      const incomingQuantity = document.location.search.split("?")[1].split("=")[1]; // Quantity
      this.setState({ incomingQuantity: incomingQuantity });
      const incomingSize = document.location.search.split("?")[2].split("=")[1]; // Size
      this.setState({ incomingSize: incomingSize });
      this.setState({ sizeSelect: incomingSize })
      const incomingPrice = document.location.search.split("?")[3].split("=")[1]; // Price
      this.setState({ priceSelect: incomingPrice })

      const pizzaId = document.location.href.split("#")[1];
      this.setState({ pizzaId: pizzaId });
      const pizzaIdResponse = await orderServer.get(`items/${pizzaId - 1}.json`);
      this.setState({ currentItem: pizzaIdResponse.data });
    } else {
      this.setState({ noMenuSelection: true });
    }
  }

};

export default Order;