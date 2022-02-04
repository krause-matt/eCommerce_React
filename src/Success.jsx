import React, { Component } from "react";
import "./index.css";

class Success extends Component {
  render() {
    return (
      <div className="background-div">
        <div className="jumbotron jumbotron-fluid p-5 ml-3 mr-3">
          <h1 className="display-4">Success!</h1>
          <p className="lead">Your order will be ready for pickup shortly.</p>
          <hr className="my-4"></hr>
            <p>Thank you for ordering at Pizza Place. We appreciate your business.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="http://localhost:3000/menu" role="button">Back to Menu</a>
            </p>
        </div>
      </div>
    )

  }
}

export default Success;