import React from "react";
import PropTypes from "prop-types";

//DisplayBasketProducts provides a display of the individual products as well as
//Increase Quantity, Decrease Quantity & Remove from Cart buttons

class DisplayBasketProducts extends React.Component {
  render() {
    return (
      <div className = "displayBasketProducts">
        <div>{this.props.title}</div>
        <div>Cost: £{this.props.price}</div>
        <button
          onClick={e => this.props.handleIncrementQuantity(e, this.props.id)}
          className= "increaseQuantity"
        >
          Increase Quantity
        </button>
        <div className= "basketProductQuantity">Quantity: {this.props.quantity}</div>
        <button
          onClick={e => this.props.handleDecrementQuantity(e, this.props.id)}
          className ="decrementQuantity"
        >
          Decrease Quantity
        </button>
        <button
          onClick={e => this.props.handleDeleteFromCart(e, this.props.id)}
          className="removeFromCart"
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
