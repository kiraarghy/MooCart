import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MooCheckout from "./Components/MooCheckout";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MooCheckout />, div);
});

it("When app is initialised, there are no items in the basket", () => {
  const component = mount(<MooCheckout />);
  expect(component.find(".displayBasketProducts").exists()).toBe(false);
});

it("When Add to Cart button is pressed, a product is added to the cart", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(component.find(".displayBasketProducts").exists()).toBe(true);
});

it("increases quantity when Add to cart button is pressed", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(
    component
      .find(".basketProductQuantity")
      .first()
      .text()
  ).toBe("Quantity: 1");
});

it("increases quantity when Add to cart button is pressed multiple times", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(
    component
      .find(".basketProductQuantity")
      .first()
      .text()
  ).toBe("Quantity: 1");
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(
    component
      .find(".basketProductQuantity")
      .first()
      .text()
  ).toBe("Quantity: 2");
});

it("increases quantity when Increase Quantity button is pressed", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  component
    .find(".increaseQuantity")
    .first()
    .simulate("click");
  expect(
    component
      .find(".basketProductQuantity")
      .first()
      .text()
  ).toBe("Quantity: 2");
});

it("increases quantity when Increase Quantity button is pressed multiple times", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  component
    .find(".increaseQuantity")
    .first()
    .simulate("click")
    .simulate("click");
  expect(
    component
      .find(".basketProductQuantity")
      .first()
      .text()
  ).toBe("Quantity: 3");
});

it("When Decrease Quantity button is pressed quantity decreases", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click")
    .simulate("click");
  component
    .find(".decrementQuantity")
    .first()
    .simulate("click");
  expect(
    component
      .find(".basketProductQuantity")
      .first()
      .text()
  ).toBe("Quantity: 1");
});

it("When quantity is reduced to zero, then item doesn't appear in basket", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(component.find(".displayBasketProducts").exists()).toBe(true);
  component
    .find(".decrementQuantity")
    .first()
    .simulate("click");
  expect(
    component
      .find(".displayBasketProducts")
      .first()
      .exists()
  ).toBe(false);
});

it("When Remove from Cart button is clicked, then item doesn't appear in basket", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(component.find(".displayBasketProducts").exists()).toBe(true);
  component
    .find(".removeFromCart")
    .first()
    .simulate("click");
  expect(
    component
      .find(".displayBasketProducts")
      .first()
      .exists()
  ).toBe(false);
});

it("When first product is added to cart, the total basket cost equals £8.99", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  expect(component.find(".basketTotal").text()).toBe("Basket total is: £8.99");
});

it("When first & second products are added to cart, the total basket cost equals £23.98", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  component
    .find(".buttonAddToCart")
    .at(1)
    .simulate("click");
  expect(component.find(".basketTotal").text()).toBe("Basket total is: £23.98");
});

it("When first & second & third products are added to cart, the total basket cost equals £29.73", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  component
    .find(".buttonAddToCart")
    .at(1)
    .simulate("click");
  component
    .find(".buttonAddToCart")
    .at(2)
    .simulate("click");
  expect(component.find(".basketTotal").text()).toBe("Basket total is: £29.73");
});

it("It returns three DisplayProducts components", () => {
  const component = mount(<MooCheckout />);
  expect(component.find(".displayProducts")).toHaveLength(3);
});

it("It returns three DisplayBasketProducts components when buttonAddToCart is pressed on each DisplayProducts component", () => {
  const component = mount(<MooCheckout />);
  component
    .find(".buttonAddToCart")
    .first()
    .simulate("click");
  component
    .find(".buttonAddToCart")
    .at(1)
    .simulate("click");
  component
    .find(".buttonAddToCart")
    .at(2)
    .simulate("click");
  expect(component.find(".displayBasketProducts")).toHaveLength(3);
});
