import React from "react";
import PropTypes from "prop-types";

import DisplayProducts from './DisplayProducts';

//DisplayContainer provides a container for the products available

class DisplayContainer extends React.Component {
  render() {
    var ProductList = this.props.products.map(
      (product, key = this.props.products.id) => {
        return (
          <DisplayProducts
            title={product.title}
            price={product.price}
            key={product.id}
            id={product.id}
            handleIncrementQuantity={this.props.handleIncrementQuantity}
          />
        );
      }
    );
    return <div>{ProductList}</div>;
  }
}

DisplayContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleIncrementQuantity: PropTypes.func.isRequired
};

export default DisplayContainer;
