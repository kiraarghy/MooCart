import React from "react";
import PropTypes from "prop-types";

//DisplayBasketProducts provides a displayof the individual products as well as
//+quantity and -quantity buttons

class DisplayBasketProducts extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>Cost: £{this.props.price}</div>
        <button
          onClick={e => this.props.handleIncrementQuantity(e, this.props.id)}
        >
          Increase Quantity
        </button>
        <div>Quantity: {this.props.quantity}</div>
        <button
          onClick={e => this.props.handleDecrementQuantity(e, this.props.id)}
        >
          Decrease Quantity
        </button>
        <button
          onClick={e => this.props.handleDeleteFromCart(e, this.props.id)}
        >
          Remove from Cart
        </button>
      </div>
    );
  }
}

DisplayBasketProducts.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  handleIncrementQuantity: PropTypes.func.isRequired,
  handleDecrementQuantity: PropTypes.func.isRequired,
  handleDeleteFromCart: PropTypes.func.isRequired
};

export default DisplayBasketProducts;
