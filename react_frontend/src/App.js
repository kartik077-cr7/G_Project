import React,{ useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from './components/appBar';
import AllItem from './components/AllItem';

import useStyles from './styles';
const alanKey = 'a5f32de9ffe131c4fff7ec942bfbe7ad2e956eca572e1d8b807a3e2338fdd0dc/stage';


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
     <React.Fragment>
       <AppBar/>
       <AllItem/>
     </React.Fragment>
  );
}

export default App;
