
import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  makeOrder: false,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  showCartItems: false,
  setMakeOrder: () => {},
  setShowCartItems: () => {},
  removeAllItems: (id) => {},
});

export default CartContext;
