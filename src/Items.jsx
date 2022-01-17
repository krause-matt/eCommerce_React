import React, { Component } from "react";

class Items extends Component {
  state = {
    item: this.props.item
  }
  render() {
    return (
      <React.Fragment>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={this.state.item.image} className="card-img-top mx-auto" alt="pizza" style={{ height: "20rem", width: "20rem", objectFit: "cover" }} />
            <div className="card-body">
              <h5 className="card-title d-inline align-middle">{this.state.item.pizza}</h5>
              <img src="images/trash-solid.svg" width="40" height="20" className="pointer d-inline align-middle" onClick={() => this.props.deleteItem(this.state.item)} alt="" />
              <select name="pizza-size" id="size-select">
                <option value={this.state.item.small}>{`Small: $${this.state.item.small}`}</option>
                <option value={this.state.item.medium}>{`Medium: $${this.state.item.medium}`}</option>
                <option value={this.state.item.large}>{`Large: $${this.state.item.large}`}</option>
              </select>
              <h6 className="card-subtitle m-2 text-muted">${this.state.item.price}</h6>
              <div className="btn-group mt-1 mb-3" role="group" aria-label="button group">
                <button type="button" className="btn btn-success" onClick={() => { this.props.decreaseQty(this.state.item, 0) }}>-</button>
                <span className="border border-success px-3">{this.state.item.quantity}</span>
                <button type="button" className="btn btn-success" onClick={() => { this.props.increaseQty(this.state.item, 5) }}>+</button>
              </div>
              <br></br>
              <button className="btn btn-warning m-1">Customize</button>
              <button className="btn btn-primary m-1">Add to Cart</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default Items;