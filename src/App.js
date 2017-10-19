import React from "react";
import PropTypes from "prop-types";

//DisplayBasketProducts provides a displayof the individual products as well as
//+quanity and -quantity buttons

class DisplayBasketProducts extends React.Component {
  render () {
    return (<div> </div>)
  }
}

//BasketContainer contains all the Basket components

class BasketContainer extends React.Component {
  render() {
    var basketProductList = this.props.products.map(
      (product, key = this.props.products.id) => {
        return (
          <DisplayBasketProducts
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            key={product.id}
            id={product.id}
          />
        );
      }
    );
    return <div>{basketProductList}</div>;
  }
}

//DisplayProducts provides a re-usable component to display all the products

class DisplayProducts extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.price}</div>
        <button onClick={e => this.props.handleIncrementQuanity(e, this.props.id)}>
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
  handleIncrementQuanity: PropTypes.func.isRequired
};

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
            handleIncrementQuanity={this.props.handleIncrementQuanity}
          />
        );
      }
    );
    return <div>{ProductList}</div>;
  }
}

DisplayContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleIncrementQuanity: PropTypes.func.isRequired
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

  //will increase quanity of the product

  handleIncrementQuanity = (e, id) => {
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

  //will increase quanity of the product

  //will decrease quantity of the product
  //note it would be good if we could check the product quantity, if quantity = 0, update quantity to 0?

  handleDecrementQuanity = (e, id) => {};

  render() {
    return (
      <div className="App">
        <DisplayContainer
          products={this.state.products}
          handleIncrementQuanity={this.handleIncrementQuanity}
        />
        <BasketContainer products={this.state.products} />
      </div>
    );
  }
}

export default MooCheckout;
