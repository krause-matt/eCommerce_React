import React, { Component } from "react";
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center background-div">
        <div className="card mx-auto login-card">
        <h5 className="card-header">Login</h5>
          <div className="card-body login-shadow">
            <form>
              <div className="form-group">
                <label for="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" onChange={(e) => {this.setState({email: e.target.value})}}/>
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}}/>
              </div>
              <button type="submit" className="btn btn-primary align-center mt-2" onClick={this.submitState}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  submitState = () => {
    console.log(this.state.email);
    console.log(this.state.password);
  }
};

export default Login;