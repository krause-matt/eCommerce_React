import React, { Component } from "react";
import Menu from "./Menu";


class Cart extends Component {

  state = {
    items: [
      {id: 1, pizza: "Cheese", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80", price: 10, quantity: 0},
      {id: 2, pizza: "Sausage", image: "https://images.unsplash.com/photo-1620374645310-f9d97e733268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", price: 12, quantity: 0},
      {id: 3, pizza: "Pepperoni", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80", price: 12, quantity: 0},
      {id: 4, pizza: "Veggie", image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80", price: 12, quantity: 0},
      {id: 5, pizza: "Deluxe", image: "https://images.unsplash.com/photo-1621070766841-a7bf1ee96df0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80", price: 14, quantity: 0}
    ],
    itemCount: 5
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Cart<span className="ml-3 badge badge-pill badge-primary">{this.state.itemCount}</span></h3>
        <div className="m-3">
          <div className="row row-cols-1 row-cols-lg-3">
            {this.state.items.map((item) => {
              return <Menu key={item.id} item={item} decreaseQty={this.decreaseQty} increaseQty={this.increaseQty} deleteItem={this.deleteItem}/>
            })}
          </div>
        </div>        
      </React.Fragment>
    );
  };

  decreaseQty = (itemObject, minVal) => {
    const allItems = [...this.state.items];
    const index = allItems.indexOf(itemObject);
    if (allItems[index].quantity > minVal) {
      allItems[index].quantity--;
      this.setState({ items: allItems });
    };    
  };

  increaseQty = (itemObject, maxVal) => {
    const allItems = [...this.state.items];
    const index = allItems.indexOf(itemObject);
    if (allItems[index].quantity < maxVal) {
      allItems[index].quantity++;
      this.setState({ items: allItems });
    };    
  };

  deleteItem = (itemObject) => {
    const allItems = [...this.state.items];
    const index = allItems.indexOf(itemObject);
    allItems.splice(index, 1);
    this.setState({ items: allItems });
  };
};

export default Cart;