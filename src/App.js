import React from "react";

class BasketContainer extends React.Component {
  render() {
    return <div />;
  }
}

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

class MooCheckout extends React.Component {
  state = {
    products: []
  };
//data validation please
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

  //Array returned is in different order than before, maybe look at changing this but doesn't affect function atm?
  //as we're using id as key and id is unique
  //sort spreadAllOtherProducts by id before settingstate
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
    this.setState({
      products: spreadAllOtherProducts
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
