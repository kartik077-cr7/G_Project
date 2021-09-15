import React,{ useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from './components/appBar';
import AllItem from './components/AllItem';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import useStyles from './styles';
const alanKey = 'a5f32de9ffe131c4fff7ec942bfbe7ad2e956eca572e1d8b807a3e2338fdd0dc/stage';

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


function App() {
  
  useEffect(() => {
     
    alanBtn({
       key: alanKey,
       onCommand:({command,articles,number}) => {
             if(command === 'testing'){
              alanBtn().playText('Testing Successfull...');
             }         
       }
    })
  },[])

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
       <AppBar/>
       <AllItem/>
    </ThemeProvider>
  );
}

export default App;
