import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemCard from './ItemCard';
import Container from '@material-ui/core/Container';
import LoadingSpinner from '../UI/LoadingSpinner';


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

  export default function AllItems({cardItems,isLoading}) {
         
      const classes = useStyles();
      
      if(isLoading)
        return <LoadingSpinner/>;
      
        const checkKeys = (item) => {
          if(Object.keys(item[1])[0] === 'Price')
            return Object.keys(item[1])[1];
          else
            return Object.keys(item[1])[0];
        }

        const checkValue= (item) => {
          if(Object.keys(item[1])[0] === 'Price')
            return Object.values(item[1])[1];
          else
            return Object.values(item[1])[0];
        }
      return (
        <Container className={classes.container}>
           <Grid container spacing={3}>
               {cardItems.map( item => (
                    <Grid item xs={6} md={6} lg={4} key={item[0]}>
                        <ItemCard id ={item[0]} itemId={item[0]} name = {checkKeys(item)} url={checkValue(item)} price={item[1]["Price"]} />
                    </Grid>
                ))}
            </Grid>
        </Container>
      )
  }
