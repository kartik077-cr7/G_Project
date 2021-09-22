import React,{ useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from './components/appBar';
import AllItem from './components/AllItem';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';


import useStyles from './styles';
const alanKey = 'be29007f7c4834e87c36a5037f65cb9a2e956eca572e1d8b807a3e2338fdd0dc/stage';

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
function App() {
  
  const [objectType,setObjectType] = useState('Normal_Products');

  useEffect(() => {
     
    alanBtn({
       key: alanKey,
       onCommand:({command,articles,number}) => {
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
