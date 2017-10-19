import React from "react";
import PropTypes from "prop-types";

class BasketContainer extends React.Component {
  render() {
    return <div />;
  }
}

//DisplayProducts provides a re-usable component to display all the products

class DisplayProducts extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.price}</div>
        <button onClick={e => this.props.handleAddToCart(e, this.props.id)}>
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
  handleAddToCart: PropTypes.func.isRequired
};

//DisplayContainer provides a container for the products available

class DisplayContainer extends React.Component {
  render() {
    var renderedProductList = this.props.products.map(
      (product, key = this.props.products.id) => {
        return (
          <DisplayProducts
            title={product.title}
            price={product.price}
            key={product.id}
            id={product.id}
            handleAddToCart={this.props.handleAddToCart}
          />
        );
      }
    );
    return <div>{renderedProductList}</div>;
  }
}

DisplayContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddToCart: PropTypes.func.isRequired
};

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
          quantity: 0,
          inBasket: false
        },
        {
          id: "b",
          title: "Moo Hardcover Notebook",
          price: 14.99,
          quantity: 0,
          inBasket: false
        },
        {
          id: "c",
          title: "Moo Softcover Journal",
          price: 5.75,
          quantity: 0,
          inBasket: false
        }
      ]
    });
  }

  //handleAddToCart adds to the quantity of product matching that id in the cart

  handleAddToCart = (e, id) => {
    let selectedProducts = this.state.products.find(
      product => product.id === id
    );

    selectedProducts.quantity += 1;
    selectedProducts.inBasket = true;

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

  render() {
    return (
      <div className="App">
        <DisplayContainer
          products={this.state.products}
          handleAddToCart={this.handleAddToCart}
        />
        <BasketContainer products={this.state.products} />
      </div>
    );
  }
}

export default MooCheckout;
