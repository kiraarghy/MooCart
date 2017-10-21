import React from "react";

import DisplayContainer from "./DisplayContainer.js";
import BasketContainer from "./BasketContainer.js";

//DisplayBasketProducts provides a displayof the individual products as well as
//+quantity and -quantity buttons

class MooCheckout extends React.Component {
  state = {
    products: []
  };
  componentDidMount() {
    this.setState({
      products: [
        {
          id: "a",
          title: "The SlimCase",
          price: 8.99,
          quantity: 0
        },
        {
          id: "b",
          title: "Moo Hardcover Notebook",
          price: 14.99,
          quantity: 0
        },
        {
          id: "c",
          title: "Moo Softcover Journal",
          price: 5.75,
          quantity: 0
        }
      ],
      basketTotal: 0,
      basketContents: []
    });
  }

  //will increase quantity of the product

  handleIncrementQuantity = (e, id) => {
    let selectedProducts = this.state.products.find(
      product => product.id === id
    );

    selectedProducts.quantity += 1;

    let allOtherProducts = this.state.products.filter(
      product => product.id !== id
    );

    let spreadAllOtherProducts = [...allOtherProducts, selectedProducts];

    let sortedSpreadAllOtherProducts = spreadAllOtherProducts.sort(function(
      a,
      b
    ) {
      return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
    });
    this.setState({
      products: sortedSpreadAllOtherProducts
    });
  };

  //will increase quantity of the product

  //will decrease quantity of the product
  //note it would be good if we could check the product quantity, if quantity = 0, update quantity to 0?

  handleDecrementQuantity = (e, id) => {
    let selectedProducts = this.state.products.find(
      product => product.id === id
    );
    if (selectedProducts.quantity > 0) {
      selectedProducts.quantity -= 1;
    }

    let allOtherProducts = this.state.products.filter(
      product => product.id !== id
    );

    let spreadAllOtherProducts = [...allOtherProducts, selectedProducts];

    let sortedSpreadAllOtherProducts = spreadAllOtherProducts.sort(function(
      a,
      b
    ) {
      return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
    });
    this.setState({
      products: sortedSpreadAllOtherProducts
    });
  };

  handleDeleteFromCart = (e, id) => {
    let selectedProducts = this.state.products.find(
      product => product.id === id
    );
    selectedProducts.quantity = 0;

    let allOtherProducts = this.state.products.filter(
      product => product.id !== id
    );

    let spreadAllOtherProducts = [...allOtherProducts, selectedProducts];

    let sortedSpreadAllOtherProducts = spreadAllOtherProducts.sort(function(
      a,
      b
    ) {
      return a.id > b.id ? 1 : b.id > a.id ? -1 : 0;
    });
    this.setState({
      products: sortedSpreadAllOtherProducts
    });
  };

  writeCartToFile = () => {
    let inBasket = this.state.products.filter(product => product.quantity > 0);
    let cartContents = {
      productsinBasket: inBasket,
      basketTotal: this.getBasketTotal(),
      userId: "MooTest"
    };

    alert(JSON.stringify(cartContents, null, 2));

    return null;
  };

  getBasketTotal = () => {
    let sum = 0;
    let tempBasketTotal = this.state.products.map((product) => {
      return (product.quantity * product.price);
    });
    sum = tempBasketTotal.reduce((sum, value) => sum + value, 0);

    return sum;
  };
  //this is creating a new total each time, when I just wanna be able to push the values from the map into the total?
  render() {
    return (
      <div className="App">
        <DisplayContainer
          products={this.state.products}
          handleIncrementQuantity={this.handleIncrementQuantity}
        />
        <BasketContainer
          products={this.state.products}
          basketTotal={this.getBasketTotal()}
          handleIncrementQuantity={this.handleIncrementQuantity}
          handleDecrementQuantity={this.handleDecrementQuantity}
          handleDeleteFromCart={this.handleDeleteFromCart}
          writeCartToFile={this.writeCartToFile}
        />
      </div>
    );
  }
}

export default MooCheckout;
