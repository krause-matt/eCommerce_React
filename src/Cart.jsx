import React, { Component } from "react";
import Menu from "./Menu";


class Cart extends Component {

  state = {
    items: [
      {id: 1, pizza: "Cheese", image: "https://source.unsplash.com/random/?cheese+pizza", price: 10, quantity: 0},
      {id: 2, pizza: "Sausage", image: "https://source.unsplash.com/random/?sausage+pizza", price: 12, quantity: 0},
      {id: 3, pizza: "Pepperoni", image: "https://source.unsplash.com/random/?pepperoni+pizza", price: 12, quantity: 0},
      {id: 4, pizza: "Veggie", image: "https://source.unsplash.com/random/?veggie+pizza", price: 12, quantity: 0},
      {id: 5, pizza: "Deluxe", image: "https://source.unsplash.com/random/?pizza", price: 14, quantity: 0}
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
              return <Menu key={item.id} item={item} decreaseQty={this.decreaseQty} increaseQty={this.increaseQty} />
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
};

export default Cart;