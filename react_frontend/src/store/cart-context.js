
import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  showCartItems: false,
  setShowCartItems: () => {},
  removeAllItems: (id) => {},
});

export default CartContext;
