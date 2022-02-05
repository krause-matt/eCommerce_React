import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div className="background-div">
        <div className="jumbotron jumbotron-fluid p-5 ml-3 mr-3">
          <h1 className="display-4">Oh no!</h1>
          <p className="lead">Your order was not completed.</p>
          <hr className="my-4"></hr>
            <p>Please return to checkout and try again.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="http://localhost:3000/cart" role="button">Back to Cart</a>
            </p>
        </div>
      </div>
    )
  }
}

export default Error;