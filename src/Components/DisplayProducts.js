import React from "react";
import PropTypes from "prop-types";

//DisplayProducts provides a re-usable component to display all the products

class DisplayProducts extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.price}</div>
        <button
          onClick={e => this.props.handleIncrementQuantity(e, this.props.id)}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

DisplayProducts.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  handleIncrementQuantity: PropTypes.func.isRequired
};

export default DisplayProducts;