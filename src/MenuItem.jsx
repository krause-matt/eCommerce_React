import React, { Component } from "react";
import { Link } from "react-router-dom";
import orderServer from "./api/orders";

class MenuItem extends Component {
  state = {
    item: this.props.item,
    cartOrder: {}
    
  }
  render() {
    return (
      <React.Fragment>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={this.state.item.image} className="card-img-top mx-auto" alt="pizza" style={{ height: "20rem", width: "20rem", objectFit: "cover" }} />
            <div className="card-body">
              <h5 className="card-title d-inline align-middle">{this.state.item.pizza}</h5>
              {/*
              <img src="images/trash-solid.svg" width="40" height="20" className="pointer d-inline align-middle" onClick={() => this.props.deleteItem(this.state.item)} alt="" />
              */}
              <select name="pizza-size" id={`${this.state.item.pizza}-size-select`}>
                <option data-size="Small" id={`size-${this.state.item.pizza}`} value={this.state.item.small}>{`Small: $${this.state.item.small}`}</option>
                <option data-size="Medium" id={`size-${this.state.item.pizza}`} value={this.state.item.medium}>{`Medium: $${this.state.item.medium}`}</option>
                <option data-size="Large" id={`size-${this.state.item.pizza}`} value={this.state.item.large}>{`Large: $${this.state.item.large}`}</option>
              </select>
              <h6 className="card-subtitle m-2 text-muted">${this.state.item.price}</h6>
              <div className="btn-group mt-1 mb-3" role="group" aria-label="button group">
                <button type="button" className="btn btn-success" onClick={() => { this.props.decreaseQty(this.state.item, 0) }}>-</button>
                <span className="border border-success px-3">{this.state.item.quantity}</span>
                <button type="button" className="btn btn-success" onClick={() => { this.props.increaseQty(this.state.item, 5) }}>+</button>
              </div>
              <br></br>
              <Link to="/order" id={this.state.item.pizza} className="btn btn-warning m-1" onClick={(e) => { console.log(e.target.id) }}>Customize</Link>
              <Link to="/cart" id={this.state.item.pizza} className="btn btn-primary m-1" onClick={(e) => { this.addToCart(e) }}>Add to Cart</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  addToCart = async (e) => {
    if (!this.state.item.quantity) {
      e.preventDefault();
      alert("Please select quantity first");
    }
    else {
      const sizeIndex = document.querySelector(`#${e.target.id}-size-select`).selectedIndex 
      const pizzaSize = document.querySelector(`#${e.target.id}-size-select`)[sizeIndex].attributes[0].value //Size
      const pizzaPrice = document.querySelector(`#${e.target.id}-size-select`)[sizeIndex].value //Price

      const cartAdd = {};
      cartAdd.pizza = e.target.id;
      cartAdd.size = pizzaSize;
      cartAdd.quantity = this.state.item.quantity;
      cartAdd.price = pizzaPrice;

      const toCartResponse = await orderServer.post("/orders", cartAdd);

    }
  }


};

export default MenuItem;