import React, { Component } from "react";

class Menu extends Component {
  state = {
    item: this.props.item
  }
  render() {
    return (
      <React.Fragment>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={this.state.item.image} className="card-img-top mx-auto" alt="pizza" style={{height: "20rem", width: "20rem", objectFit: "cover"}}/>
            <div className="card-body">
              <h5 className="card-title">{this.state.item.pizza}</h5>
              <h6 className="card-subtitle mb-2 text-muted">${this.state.item.price}</h6>
              <div className="btn-group mt-1 mb-3" role="group" aria-label="button group">
                <button type="button" className="btn btn-success" onClick={this.props.decreaseQty}>-</button>
                <span className="border border-success px-3">{this.state.item.quantity}</span>
                <button type="button" className="btn btn-success" onClick={()=>{this.props.increaseQty(this.state.item)}}>+</button>
              </div>
              <br></br>
              <button className="btn btn-primary">Order</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default Menu;