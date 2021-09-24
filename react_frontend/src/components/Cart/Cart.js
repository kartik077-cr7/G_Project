import React,{useContext,useState} from 'react';
import './Cart.css';
import Modal from '../Modal/Modal';
import CartItem from '../CartItem/CartItem';
import CartContext from '../../store/cart-context';

const userData = {
  'id':102,
  'name':"Kartik",
  'pin':263139,
  'adress':"TrilokNagar Do Nahariya Haldwani"
}
const Cart = (props) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };


  const submitOrderHandler = async () => {
    setIsSubmitting(true);
    await fetch('https://react-http-6093d-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  console.log("isSubmitting",isSubmitting);
  console.log("didSubmit",didSubmit);

  const cartItems = (
    <ul className='cart-items'>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className='actions'>
      <button className='button--alt' onClick={props.onClose}>
        Close
      </button>
      <br/>
      {hasItems && (
        <button className='button' onClick={submitOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className='total'>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <br/>
      {modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className='actions'>
      <button className='button' onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
