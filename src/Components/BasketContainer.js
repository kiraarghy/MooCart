import React from "react";
import PropTypes from "prop-types";

import DisplayBasketProducts from "./DisplayBasketProducts";

//BasketContainer contains all the Basket components

class BasketContainer extends React.Component {
  render() {
    let inBasket = this.props.products.filter(product => product.quantity > 0);
    const round = (value, decimals) => {
      return Number(
        Math.round(value + "e" + decimals) + "e-" + decimals
      ).toFixed(2);
    };
    const basketProductList = inBasket.map((product, key = inBasket.id) => {
      return (
        <DisplayBasketProducts
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}
          id={product.id}
          handleIncrementQuantity={this.props.handleIncrementQuantity}
          handleDecrementQuantity={this.props.handleDecrementQuantity}
          handleDeleteFromCart={this.props.handleDeleteFromCart}
        />
      );
    });
    return (
      <div>
        <div>{basketProductList}</div>
        <div>Basket total is: £{round(this.props.basketTotal, 2)}</div>
        <button onClick={() => this.props.writeCartToFile()}>
          Produce list of cart
        </button>
      </div>
    );
  }
}

BasketContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  basketTotal: PropTypes.number.isRequired,
  handleIncrementQuantity: PropTypes.func.isRequired,
  handleDecrementQuantity: PropTypes.func.isRequired,
  writeCartToFile: PropTypes.func.isRequired,
  handleDeleteFromCart: PropTypes.func.isRequired,
};

export default BasketContainer;
