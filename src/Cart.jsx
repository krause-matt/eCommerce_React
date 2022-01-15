import React, { Component } from "react";
import Menu from "./Menu";


class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemCount: 5
    };
  };

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

  componentDidMount = async () => {
    const response = await fetch("http://localhost:5000/items", {method: "GET"})
    const formattedResponse = await response.json();
    this.setState({items: formattedResponse})
  };
};

export default Cart;