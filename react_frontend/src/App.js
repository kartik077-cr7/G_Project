import React,{ useEffect,useState,useContext} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from './components/appBar';
import AllItem from './components/Items/AllItem';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import wordsToNumbers from 'words-to-numbers';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import CartContext from './store/cart-context';
import storeItems from './items.json';
import './index.css';

import useStyles from './styles';
import CartItem from './components/CartItem/CartItem';
const alanKey = 'a5f32de9ffe131c4fff7ec942bfbe7ad2e956eca572e1d8b807a3e2338fdd0dc/stage';
const firebaseBackend = 'https://flipgrid-71382-default-rtdb.asia-southeast1.firebasedatabase.app/';

const userId = 102;
const name = "Kartik";

const breakpointValues = {
  xs: 0,
  sm: 660,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = createTheme({
  breakpoints: {
    values: breakpointValues,
  },
});

let count_isuue = 0;
let count_feedback = 0;
let parsedNumber;
function App() {
  
  const [isLoading,setIsLoading] = useState(true); 
  const [cardItems,setCardItems] = useState([]);
  const [objectType,setObjectType] = useState('Normal_Products');
  const [feedback,setFeedback] = useState(' ');
  const [issue,setIssue] = useState(' ');
  

  const cartCtx = useContext(CartContext);
  
  const {items,setShowCartItems,showCartItems,removeAllItem} = useContext(CartContext);
  
  var [helperCartItems,setHelperCartItems] = useState(items);

  console.log("items  outside are ",helperCartItems);

 const showCartHandler = () => {
      setShowCartItems(true);
  }

  const hideCartHandler = () =>{
      setShowCartItems(false);
  }

  useEffect(()=>{
    setHelperCartItems(items);
  },[items]);

  const addToCart = (id,quantity) => {
   
    const sId = id.toString();
    const item = storeItems.find( i => i.id === sId);

    if(typeof(item) === 'undefined')
      {
        alanBtn().playText("Sorry couldn't add please try again");
        return;
      }

     cartCtx.addItem({
        id:sId,
        name:item.name,
        amount:Math.ceil(quantity),
        price:item.price
     })
     alanBtn().playText(`added ${Math.ceil(quantity)} ${item.name} to cart...`);
  }

  const removeFromCart = (id) => {

    const sId = id.toString();
    
    console.log("items inside are  ",helperCartItems);
    const existingCartItemIndex = helperCartItems.findIndex(
      (item) => item.id === sId
    );

    console.log("item is ",existingCartItemIndex);
    removeAllItem(id);
    alanBtn().playText(`Remove all items with ID ${id} from cart...`);
    
  }
  
  useEffect(()=>{
        
    const fetchItems = async (objectType) =>{
       setIsLoading(true);
       const response = await fetch(`${firebaseBackend}/${objectType}.json`)
       const items2 = await response.json();
       const savedItems = Object.keys(items2).map((key)=>[key,items2[key]]);
       setCardItems(savedItems);
       setIsLoading(false);
    };
    fetchItems(objectType);
  },[objectType])


  useEffect(()=>{
   
    if(count_feedback == 0)
    {
      count_feedback+=1;
    }
    else 
    {
      console.log("Feedback is ",feedback);
      console.log("under handling feedback");
      const url="http://localhost:8000/storeReview";
      
      const bodyData=JSON.stringify({
        "Feedback":feedback,
        "UserId":userId,
        "CustomerName":name,
        "OrderNo":parsedNumber
      });

      const reqOpt = {method:"POST",headers:{"Content-type":"application/json"},body:bodyData};

      fetch(url,reqOpt)
      .then(response=> console.log(response))
      .catch(error=> console.log("error is ",error));
   }
  },[feedback])

  useEffect(()=>{
    
    if(count_isuue == 0)
    {
      count_isuue+=1;
    }
    else
    {
      console.log("Issue is ",issue);
      console.log("under handling issue");
      const url = "http://127.0.0.1:8000/storeReview";
      

      const bodyData = JSON.stringify({
        "UserId":userId,
        "Issue":feedback
      });

      const reqOpt = {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body :bodyData,
        redirect: 'follow'};


      fetch(url,reqOpt)
      .then(response=> response.text)
      .then(result => console.log("result is" ,result))
      .catch(error=> console.log("error is ",error));
    }
    
  },[issue])

  useEffect(() => {
      
    alanBtn({
       key: alanKey,
       onCommand:({command,value,id,quantity}) => {
             
             console.log("command ",command," value ",value," id ",id," quantity ",quantity);
            
             if(command === 'testing'){
              alanBtn().playText('Testing Successfull...');
             }        
             else if(command === 'trending_products') 
             {
               setObjectType('Trending_Product')
             }
             else if(command === 'go_back')
             {
               setObjectType('Normal_Products')
             }
             else if(command == "feedback")
             {
               parsedNumber = id.length > 3 ? wordsToNumbers((id), { fuzzy: true }) : id;
               setFeedback(value);
             }
             else if(command == "add-item")
             {
               addToCart(id,quantity);
             }
             else if(command == "remove-item")
             {
                removeFromCart(id,quantity);
             }
             else if(command === 'open-cart')
             {
                  alanBtn().playText('Opening Cart...');
                  setShowCartItems(true);
             }
             else if(command === 'close-cart')
             {
               
                   alanBtn().playText('Closing cart...');
                   setShowCartItems(false);
                
             }
       }
    })
  },[])

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
       {showCartItems && <Cart onClose = {hideCartHandler}/>}
       <AppBar onChange = {showCartHandler}/>
       <AllItem cardItems = {cardItems} isLoading = {isLoading}/>
    </ThemeProvider>
  );
}

export default App;
