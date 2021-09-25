import React,{ useReducer,useState } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  
  if (action.type === 'ADD') {

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  else if( action.type === "REMOVE_ALL")
  {
     const existingItems = state.items.findIndex((item) => item.id === action.id);
     const existimgItemscost = state.items.reduce(function( previousValue,currentValue){
       if(currentValue.id === action.id)
         previousValue+= currentValue.amount*currentValue.price;

        return previousValue;
     },[]);
     
     const updatedAmount = state.totalAmount-existimgItemscost;
     const updatedItem = state.items.filter((item) => item.id !== action.id);

     return{
       items: updatedItem,
       totalAmount:updatedAmount
     }
  }
  return defaultCartState;
};

const CartProvider = (props) => {

  const [showCartItems,setShowCartItems] = useState(false);
  const [makeOrder,setMakeOrder] = useState(1);

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () =>{
    dispatchCartAction({type:'CLEAR'});
  }

  const removeAllItemFromCartHandler = (id) => {
       dispatchCartAction({type:'REMOVE_ALL',id:id});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    showCartItems,
    setShowCartItems,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartHandler,
    removeAllItem: removeAllItemFromCartHandler,
    makeOrder,
    setMakeOrder,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;