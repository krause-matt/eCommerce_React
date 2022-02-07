import React, { Component } from "react";
import { Link } from "react-router-dom";
import orderServer from "./api/orders";

class MenuItem extends Component {
  state = {
    item: this.props.item,
    cartOrder: {},
    dropDownSize: "Small",
    dropDownPrice: ""

  }
  render() {
    return (
      <React.Fragment>
        <div className="col mb-4">
          <div className="card text-center menu-card">
            <img src={this.state.item.image} className="card-img-top mx-auto menu-pic mt-2" alt="pizza" style={{ height: "20rem", width: "20rem", objectFit: "cover" }} />
            <div className="card-body">
              <div className="d-flex flex-column align-items-center">
                <h4 className="card-title font-weight-bold">{this.state.item.pizza}</h4>
                {/*
                <img src="images/trash-solid.svg" width="40" height="20" className="pointer d-inline align-middle" onClick={() => this.props.deleteItem(this.state.item)} alt="" />
                */}
                <select className="mb-3 text-center" name="pizza-size" id={`${this.state.item.pizza}-size-select`} value={this.state.dropDownPrice} onChange={(e) => this.dropDownHandler(e)}>
                  <option data-size="Small" id={`size-${this.state.item.pizza}`} value={this.state.item.small}>{`Small: $${this.state.item.small}`}</option>
                  <option data-size="Medium" id={`size-${this.state.item.pizza}`} value={this.state.item.medium}>{`Medium: $${this.state.item.medium}`}</option>
                  <option data-size="Large" id={`size-${this.state.item.pizza}`} value={this.state.item.large}>{`Large: $${this.state.item.large}`}</option>
                </select>
                <div className="btn-group mt-1 mb-1" role="group" aria-label="button group">
                  <button type="button" className="btn btn-success" onClick={() => { this.props.decreaseQty(this.state.item, 0) }}>-</button>
                  <div className="border border-success px-3 py-2">{this.state.item.quantity}</div>
                  <button type="button" className="btn btn-success" onClick={() => { this.props.increaseQty(this.state.item, 5) }}>+</button>
                </div>
              </div>
              <br></br>
              <Link to={{ pathname: "/order", search: `?quantity=${this.state.item.quantity}?size=${this.state.dropDownSize}?price=${this.state.dropDownPrice}`, hash: `#${this.state.item.id}` }} id={this.state.item.id} className="btn btn-warning m-1" onClick={(e) => this.customizeClick(e)}>Customize</Link>
              <Link to="/cart" id={this.state.item.pizza} className="btn btn-primary m-1" onClick={(e) => { this.addToCartClick(e) }}>Add to Cart</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  addToCartClick = async (e) => {
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
      cartAdd.toppings = null;

      const toCartResponse = await orderServer.post("/orders", cartAdd);

    }
  }

  customizeClick = (e) => {
    if (!this.state.item.quantity) {
      e.preventDefault();
      alert("Please select quantity first");
    }
  }

  dropDownHandler = (event) => {
    const selectNumber = event.target.selectedIndex;
    const pizzaSize = event.target[selectNumber].attributes[0].value;
    const pizzaPrice = event.target[selectNumber].attributes[2].value;


    this.setState({ dropDownSize: pizzaSize })
    this.setState({ dropDownPrice: pizzaPrice })
  }

  componentDidMount = () => {
    const smallPrice = document.querySelector(`#${this.state.item.pizza}-size-select`).value;
    this.setState({ dropDownPrice: smallPrice })
  }

};

export default MenuItem;