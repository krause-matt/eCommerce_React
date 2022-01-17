import React, { Component } from "react";
import Navbar from "./Navbar";
import Items from "./Items";


class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemCount: ""
    };
  };

  render() {
    return (
      <React.Fragment>
        <Navbar cartNum={this.state.itemCount} />
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Menu<span className="ml-3 badge badge-pill badge-primary">{this.state.itemCount}</span></h3>
        <div className="m-3">
          <div className="row row-cols-1 row-cols-lg-3">
            {this.state.items.map((item) => {
              return <Items key={item.id} item={item} decreaseQty={this.decreaseQty} increaseQty={this.increaseQty} deleteItem={this.deleteItem} />
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
    this.setState({
      items: allItems,
      itemCount: allItems.length
    });
  };

  componentDidMount = async () => {
    const response = await fetch("http://localhost:5000/items", { method: "GET" })
    const formattedResponse = await response.json();
    const itemsLength = Object.keys(formattedResponse).length;
    this.setState({
      items: formattedResponse,
      itemCount: itemsLength
    });
  };
};

export default Menu;