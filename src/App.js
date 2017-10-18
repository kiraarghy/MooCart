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
      </div>
    );
  }
}

class DisplayContainer extends React.Component {
  render() {
    var renderedProductList = this.props.products.map((product, key=this.props.products.id) => {
      return (
        <DisplayProducts
          title={product.title}
          price={product.price}
          key={product.id}
        />
      );
    });
    return <div>{renderedProductList}</div>;
  }
}

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

  render() {
    return (
      <div className="App">
        <DisplayContainer
          products={this.state.products}
        />
        <BasketContainer
          products={this.state.products}
        />
      </div>
    );
  }
}

export default MooCheckout;
