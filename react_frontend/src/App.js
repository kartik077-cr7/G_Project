import React,{ useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from './components/appBar';
import AllItem from './components/AllItem';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles';
const alanKey = 'be29007f7c4834e87c36a5037f65cb9a2e956eca572e1d8b807a3e2338fdd0dc/stage';

const customers = [
  {
    name:'Arnab',id:'101'
  },
  {
    name:'Harshal',id:'102'
  },
  {
    name:'Kartik',id:'103'
  }
]

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

const weather_api = 'http://api.weatherstack.com/current?access_key=90b60d9e553235c8066d59ae8e979e28&query=37.8267,-122.4233';
let count_isuue = 0;
let count_feedback = 0;
let parsedNumber;
function App() {
  
  const [objectType,setObjectType] = useState('Normal_Products');
  const [feedback,setFeedback] = useState(' ');
  const [issue,setIssue] = useState(' ');
  
  console.log("feedback is ",feedback);
  const userId = 102;
  const name = "Kartik";
 
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
       onCommand:({command,value,id}) => {
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
       }
    })
  },[])

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
       <AppBar/>
       <AllItem objectType = {objectType}/>
    </ThemeProvider>
  );
}

export default App;
