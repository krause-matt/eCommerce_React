import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailCheckMessage: "",
      passwordCheckMessage: ""
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center background-div">
        <div className="card mx-auto login-card">
          <h5 className="card-header">Login</h5>
          <div className="card-body login-shadow">
            <div className="d-flex align-items-stretch flex-column">
              <label for="email">Email address</label>
              <input className="" type="email" id="email" aria-describedby="email" placeholder="Enter email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
              <p className="text-danger">{this.state.emailCheckMessage}</p>
              <label for="password">Password</label>
              <input className="" type="password" id="password" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
              <p className="text-danger">{this.state.passwordCheckMessage}</p>
            </div>
            <div className="d-flex justify-content-between">
              <Link to="/menu" className="btn btn-primary mt-2" onClick={this.submitState}>Submit</Link>
              <Link to="/menu" className="btn btn-success mt-2">Continue as Guest</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  submitState = (event) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validateEmail = () => {
      return regexEmail.test(this.state.email)
    }
    console.log(validateEmail(), "validate email");

    if (this.state.email === "" || !validateEmail()) {
      this.setState({emailCheckMessage: "Please enter valid email"})
      event.preventDefault();
    } else if (this.state.email) {
      this.setState({emailCheckMessage: ""})
    }

    if (this.state.password === "") {
      this.setState({passwordCheckMessage: "Please enter password"})
      event.preventDefault();
    } else if (this.state.password) {
      this.setState({passwordCheckMessage: ""})
    }
  }
};

export default Login;