import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProductsPage from './pages/Products';
import ShopContext from  './context/shop-context';
import CartPage from './pages/Cart';
import './App.css';

class App extends Component {
  state= {
    products: [
      { id: 'p1', title: 'Mountain Bike', price: 29.99 },
      { id: 'p2', title: 'Road Bike', price: 9.99 },
      { id: 'p3', title: 'Aero Bike', price: 0.99 },
      { id: 'p4', title: 'Time Trial Bike', price: 2.99 }
    ],
    cart: [],


  };

  addProductToCart= product => {
    const updatedCart = [...this.state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        item => item.id === product
      );

      if (updatedItemIndex < 0) {
        updatedCart.push({ ...product, quantity: 1 });
      } else {
        const updatedItem = {
          ...updatedCart[updatedItemIndex]
        };
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
      }
      this.setState({cart:updatedCart});
  };
  removeProductFromCart = productId=> {
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === productId
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }

    this.setState({cart:updatedCart});

  };

  render() {
    return (
      <ShopContext.Provider
      value={{
        products: this.state.products,
        cart: this.state.cart,
        addProductToCart:this.addProductToCart,
        removeProductFromCart:this.removeProductFromCart
      }}
      >
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ProductsPage} exact />
          <Route path="/cart" component={CartPage} exact />
        </Switch>
      </BrowserRouter>
      </ShopContext.Provider>
    );
  }
}

export default App;
