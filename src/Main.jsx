import React, { Component } from "react";
import "./index.css";

class Main extends Component {
  state = {
    custCount: 0,
    custList: [
      {id: 1, order: "https://source.unsplash.com/random/?sausage+pizza", last: "Crede", first: "Joe", email: "jcrede@fake.com", phone: "(555) 242-4242" },
      {id: 2, order: "https://source.unsplash.com/random/?pepperoni+pizza", last: "Thomas", first: "Frank", email: "fthomas@fake.com", phone: "(555) 353-5353" },
      {id: 3, order: "https://source.unsplash.com/random/?veggie+pizza", last: "Buehrle", first: "Mark", email: "mbuehrle@fake.com", phone: "(555) 565-6565" },
      {id: 4, order: "https://source.unsplash.com/random/?pizza", last: "Podsednik", first: "Scott", email: "spodsednik@fake.com", phone: "(555) 222-2222" },
      {id: 5, order: "https://source.unsplash.com/random/?sausage+pizza", last: "Konerko", first: "Paul", email: "pkonerko@fake.com", phone: "(555) 141-4141" }
    ]
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Customer List<span className="ml-3 badge badge-pill badge-primary">{this.state.custCount}</span></h3>
        <button className="ml-3 btn btn-success" onClick={this.custRefresh}>Refresh</button>
        <div className="m-3">
          <table className="table table-bordered table-hover" id="custTable">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order</th>
                <th scope="col">Last Name</th>
                <th scope="col">First Name</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.getCustRow()}
            </tbody>
          </table>
        </div>        
      </React.Fragment>      
    );
  };

  custRefresh = () => {
    this.setState({custCount: this.state.custList.length});
  };

  getCustRow = () => {
    return (
      this.state.custList.map((customer) => {
        return (
          <tr key={customer.id}>
            <th scope="row">{customer.id}</th>
            <td><img className="img-fluid img-thumbnail mx-auto d-block" style={{height: "150px", width: "150px", objectFit: "cover"}} src={customer.order} alt="order"/></td>
            <td>{customer.last}</td>
            <td>{customer.first}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
          </tr>
        )
      })
    )
  }
};

export default Main;