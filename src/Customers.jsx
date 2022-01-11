import React, { Component } from "react";
import "./index.css";

class Customers extends Component {
  state = {
    custList: [
      {id: 1, order: "https://source.unsplash.com/random/?sausage+pizza", last: "Crede", first: "Joe", email: "jcrede@fake.com", phone: "(555) 242-4242" },
      {id: 2, order: "https://source.unsplash.com/random/?pepperoni+pizza", last: "Thomas", first: "Frank", email: "fthomas@fake.com", phone: "(555) 353-5353" },
      {id: 3, order: "https://source.unsplash.com/random/?veggie+pizza", last: "Buehrle", first: "Mark", email: "mbuehrle@fake.com", phone: "(555) 565-6565" },
      {id: 4, order: "https://source.unsplash.com/random/?pizza", last: "Podsednik", first: "Scott", email: "spodsednik@fake.com", phone: "(555) 222-2222" },
      {id: 5, order: "https://source.unsplash.com/random/?sausage+pizza", last: "Konerko", first: "Paul", email: "pkonerko@fake.com", phone: "(555) 141-4141" }
    ],
    custCount: 5
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Customer List<span className="ml-3 badge badge-pill badge-primary">{this.state.custCount}</span></h3>
        <div className="m-3">
          <table className="table table-bordered table-hover" id="custTable">
            <thead className="thead-light">
              <tr>
                <th scope="col" className="text-center">#</th>
                <th scope="col" className="text-center">Order</th>
                <th scope="col" className="text-center">Last Name</th>
                <th scope="col" className="text-center">First Name</th>
                <th scope="col" className="text-center">E-Mail</th>
                <th scope="col" className="text-center">Phone</th>
                <th scope="col" className="text-center">Delete?</th>
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
      this.state.custList.map((customer, index) => {
        return (
          <tr key={customer.id}>
            <th className="text-center align-middle" scope="row">{customer.id}</th>
            <td><img className="img-fluid img-thumbnail mx-auto d-block" style={{height: "150px", width: "150px", objectFit: "cover"}} src={customer.order} alt="order"/></td>
            <td className="text-center align-middle">{customer.last}</td>
            <td className="text-center align-middle">{customer.first}</td>
            <td className="text-center align-middle">{customer.email}</td>
            <td className="text-center align-middle">{customer.phone}</td>
            <td className="text-center align-middle"><button className="btn btn-danger" onClick={() => this.deleteRow(index)}>Delete</button></td>

          </tr>
        )
      })
    )
  }

  deleteRow = (index) => {
    const newCustList = this.state.custList;
    newCustList.splice(index, 1);
    this.setState({custList: newCustList});
    this.setState({custCount: newCustList.length})
  };
};

export default Customers;