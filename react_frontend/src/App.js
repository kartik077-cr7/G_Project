import React,{ useEffect,useState,useContext,useRef} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from './components/appBar';
import AllItem from './components/Items/AllItem';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import wordsToNumbers from 'words-to-numbers';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import CartContext from './store/cart-context';
import storeItems from './items.json';
import Modal from './components/Modal/Modal';
import { submitOrderHandler } from './service';
import './index.css';

import useStyles from './styles';
import CartItem from './components/CartItem/CartItem';
const alanKey = 'a5f32de9ffe131c4fff7ec942bfbe7ad2e956eca572e1d8b807a3e2338fdd0dc/stage';
const firebaseBackend = 'https://flipgrid-71382-default-rtdb.asia-southeast1.firebasedatabase.app/';

const userId = 10123;
const name = "ANONYMOUS";
var adress;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback,setFeedback] = useState(' ');
  const [issue,setIssue] = useState(' ');
  const [searchResult, setSearchResult] = useState('');
  const alanBtnInstance = useRef(null);

  const cartCtx = useContext(CartContext);
  const {items,setShowCartItems,showCartItems,removeAllItem,totalAmount} = useContext(CartContext);

  const [helperCartItems,setHelperCartItems] = useState(items);

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

    if(typeof(item) === undefined)
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
    
    const existingCartItemIndex = helperCartItems.findIndex(
      (item) => item.id === sId
    );

    removeAllItem(id);
    alanBtn().playText(`Removed all items with ID ${id} from cart...`);
    
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
      const url = "http://127.0.0.1:8000/storeIssue";
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
  
  useEffect(()=>{
     if(cartCtx.makeOrder !== 1)
     {
       if(cartCtx.items.length < 1)
       {
         alanBtn().playText(`Your Cart is empty...`);
       }
       else 
       {
           submitOrderHandler(adress,cartCtx.items);
           alanBtnInstance.current.setVisualState({"value":cartCtx.items})
           alanBtn().callProjectApi("setClientData", {
            data: cartCtx.items
            }, function(error, result) {});

           alanBtn().playText(`Your Order has been placed...`);
           cartCtx.clearCart();
       }
     }
  },[cartCtx.makeOrder])
  

  const checkKeys = (item) => {
    if(Object.keys(item[1])[0] === 'Price')
      return Object.keys(item[1])[1];
    else
      return Object.keys(item[1])[0];
  }
  
  useEffect(()=>{
    if (searchTerm !== '') {
      const newCardItems = cardItems.filter((item) => {
          const val = checkKeys(item).toLowerCase();
          return val.includes(searchTerm.toLowerCase());
      });
      setSearchResult(newCardItems);
  } else {
      setSearchResult(cardItems);
    }
  },[searchTerm])

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  }
 
  useEffect(() => {
      
    if(!alanBtnInstance.current)
    {
     alanBtnInstance.current = alanBtn({
        key: alanKey,
        onCommand:({command,value,id,quantity}) => {
              if(command === 'testing'){
                alanBtn().playText('Testing Successfull...');
              }        
              else if(command === 'trending_products') 
              {
                setObjectType('Trending_Product');
                setSearchTerm('');
              }
              else if(command === 'go_back')
              {
                setObjectType('Normal_Products')
                setSearchTerm('');
              }
              else if(command === "feedback")
              {
                parsedNumber = id.length > 3 ? wordsToNumbers((id), { fuzzy: true }) : id;
                setFeedback(value);
              }
              else if(command === "add-item")
              {
                addToCart(id,quantity);
              }
              else if(command === "remove-item")
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
              else if(command === 'search')
              {
                searchHandler(value);
              }
              else if(command === 'checkout')
              {
                  adress = value;
                  cartCtx.setMakeOrder(prevstate=> prevstate+1);
              }
        }
      })
    }
  },[])

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
       {showCartItems && <Cart onClose = {hideCartHandler}/>}
       <AppBar onChange = {showCartHandler} term={searchTerm} searchKeyword={searchHandler}/>
       <AllItem cardItems = {searchTerm.length < 1 ? cardItems : searchResult} isLoading = {isLoading}/>
    </ThemeProvider>
  );
}

export default App;
