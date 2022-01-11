import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={this.props.image} className="card-img-top mx-auto" alt="pizza" style={{height: "20rem", width: "20rem", objectFit: "cover"}}/>
            <div className="card-body">
              <h5 className="card-title">{this.props.pizza}</h5>
              <h6 className="card-subtitle mb-2 text-muted">${this.props.price}</h6>
              <button className="btn btn-primary">Order</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default Menu;