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
              <h5 className="card-title d-inline align-middle">{this.state.item.pizza}</h5>
              <img src="images/trash-solid.svg" width="40" height="20" className="pointer d-inline align-middle" onClick={() => this.props.deleteItem(this.state.item)} alt="" />
              <h6 className="card-subtitle m-2 text-muted">${this.state.item.price}</h6>
              <div className="btn-group mt-1 mb-3" role="group" aria-label="button group">
                <button type="button" className="btn btn-success" onClick={()=>{this.props.decreaseQty(this.state.item, 0)}}>-</button>
                <span className="border border-success px-3">{this.state.item.quantity}</span>
                <button type="button" className="btn btn-success" onClick={()=>{this.props.increaseQty(this.state.item, 5)}}>+</button>
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