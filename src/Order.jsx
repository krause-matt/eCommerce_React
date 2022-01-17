import React, { Component } from "react"
import "./index.css";

import Navbar from "./Navbar";

class Order extends Component {

  state = {
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    sizes: [{ size: "Small", price: 10 }, { size: "Medium", price: 13 }, { size: "Large", price: 15 }],
    toppings: [{id: 1, topping: "Extra Cheese"}, {id: 2, topping: "Green Pepper"}, {id: 3, topping: "Olive"}],
    priceSelect: "",
    toppingSelect: [{topping: "Extra Cheese", added: false}, {topping: "Green Pepper", added: false}, {topping: "Olive", added: false}]
  }

  render() {
    {console.log("priceSelect", this.state.priceSelect)}
    {console.log("toppingSelect", this.state.toppingSelect)}
    return (
      <React.Fragment>
        <Navbar />
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
                      <input type="radio" id={item.size} name="size" value={item.price} onClick={(event) => {this.sizeSelect(event.target.value)}} />
                      <label className="ml-3" for={item.size}>{`${item.size}: $${item.price}`}</label>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="col-md-6 border-left">
              <div className="card-header"><h4>Select Toppings</h4></div>
              <div className="card-body">
                {this.state.toppings.map((item) => {
                  return (
                    <div key={item.id}>
                      <input type="checkbox" id={item.id} name={item.topping} value={item.id} onClick={(e) => {this.toppingSelect(e.target)}}/>
                      <label className="ml-3" for={item.id}>{item.topping}</label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  };

sizeSelect = (value) => {
  this.setState({priceSelect: value})
}

toppingSelect = (target) => {
  const allToppings = [...this.state.toppingSelect];
  allToppings[target.value - 1].added = target.checked;
  this.setState({toppingSelect: allToppings})
}

};

export default Order;