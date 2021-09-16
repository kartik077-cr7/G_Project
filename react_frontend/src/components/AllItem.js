import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from './UI/Card';
import Container from '@material-ui/core/Container';
import LoadingSpinner from './UI/LoadingSpinner';
const firebaseBackend = 'https://flipgrid-71382-default-rtdb.asia-southeast1.firebasedatabase.app/';


const useStyles = makeStyles({
    container:{
        marginTop: '30px',
    },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  export default function AllItems({objectType}) {
      
  
      const [cardItems,setCardItems] = useState([]);
      const [isLoading,setIsLoading] = useState(true);
      
      useEffect(()=>{
        
        const fetchItems = async (objectType) =>{
           setIsLoading(true);
           const response = await fetch(`${firebaseBackend}/${objectType}.json`)
           const items = await response.json();
           const savedItems = Object.keys(items).map((key)=>[key,items[key]]);
           setCardItems(savedItems);
           setIsLoading(false);
        };
        fetchItems(objectType);
      },[objectType])
      
      const classes = useStyles();
      
      if(isLoading)
        return <LoadingSpinner/>;
      
      return (
        <Container className={classes.container}>
           <Grid container spacing={3}>
               {cardItems.map( item => (
                    <Grid item xs={6} md={6} lg={4} key={item[0]}>
                        <Card id ={item[0]} name = {item[0]} url={item[1]} />
                    </Grid>
                ))}
            </Grid>
        </Container>
      )
  }
