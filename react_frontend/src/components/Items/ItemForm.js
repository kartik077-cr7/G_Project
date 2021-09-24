import React,{ useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import './ItemForm.css';

const ItemForm = (props) => {
   
   const [amountIsValid,setAmountIsValid] = useState(true);
   const amountInputRef = useRef();

   const submitHandler = (event) => {
        
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
        enteredAmount.trim().length === 0 ||
        enteredAmountNumber < 1
        ) {
        setAmountIsValid(false);
        return;
        }
        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber);
   }
   
   const id = 'amount_'+props.id;
   return (
    <div style={{position:"absolute",zIndex:1,top:"300px",left:"10px"}}>
       <form onSubmit = {submitHandler}>
           <input
             className="input"
             ref = {amountInputRef}
             id =  {id}
             label = "Amount"
             type = 'number'
             min  = "1"
             step = '1'
             default = '1'
           />
           <Button size="small" color="primary" variant="contained" type="submit">
            + Add
           </Button>
           {!amountIsValid && <p style={{color:'red'}}>Please enter a valid amount</p>}
       </form>
    </div>
   )
 
}

export default ItemForm;