import React from "react";

import DisplayContainer from "./DisplayContainer.js";
import BasketContainer from "./BasketContainer.js";

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

  //handleIncrementQuantity will increase quantity of the product

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

  //handleDecrementQuantity will decrease quantity of the product

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

  //handleDeleteFromCart reduces product quanity down to 0

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

  //In production, this would be sent as an API call rather than as an alert

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

  //Returns total of all products in basket

  getBasketTotal = () => {
    let sum = 0;
    let tempBasketTotal = this.state.products.map(product => {
      return product.quantity * product.price;
    });
    sum = tempBasketTotal.reduce((sum, value) => sum + value, 0);

    return sum;
  };

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
