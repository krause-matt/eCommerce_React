import React, { Component } from "react";
import orderServer from "./api/orders";

import Navbar from "./Navbar";
import MenuItem from "./MenuItem";

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemCount: "",
      orders: []
    };
  };

  render() {
    return (
      <React.Fragment>
        <Navbar cartNum={this.state.itemCount} />
        <h3 className="m-3 pb-2 font-weight-bold border-bottom">Menu</h3>
        <div className="m-3">
          <div className="row row-cols-1 row-cols-lg-3">
            {this.state.items.map((item) => {
              return <MenuItem key={item.id} item={item} decreaseQty={this.decreaseQty} increaseQty={this.increaseQty} deleteItem={this.deleteItem} />
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
    const itemResponse = await orderServer.get("/items.json")
    const itemFormattedResponse = [...itemResponse.data];
    this.setState({
      items: itemFormattedResponse
    });

    const currentOrders = [];
    const ordersResponse = await orderServer.get("/orders.json");

    if (ordersResponse.data != null) {
      const ordersResponseArray = Object.entries(ordersResponse.data);
    
      for (let item of ordersResponseArray) {
        currentOrders.push(item[1][0])
      }
    }    

    // const currentOrders = [
    //   Object.entries(ordersResponse.data)[0][1][0],
    //   Object.entries(ordersResponse.data)[1][1][0],
    //   Object.entries(ordersResponse.data)[2][1][0]
    // ]
    
    this.setState({ orders: currentOrders });

    let qtyCounter = 0;
    for (let pizza of currentOrders) {
      qtyCounter += pizza.quantity
    }
    this.setState({ itemCount: qtyCounter });
  };
};

export default Menu;