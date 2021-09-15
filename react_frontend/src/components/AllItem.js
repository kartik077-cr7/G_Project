import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from './UI/Card';
import Container from '@material-ui/core/Container';
import Car from '../Images/Car.jpg';
import Gun from '../Images/gun.jpg';
import Hairoil from '../Images/Hairoil.jpg';
import Missile from '../Images/missile.gif';
import Purse from '../Images/Purse.jpg';
import Shoe2 from '../Images/Nike_Shoes.jpg';
import Shoes from '../Images/Shoes.jpg';

const imagesUrl = [
         Car,Gun,Hairoil,Missile,Purse,Shoe2,Shoes
]

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

  export default function AllItems() {
      const classes = useStyles();
      console.log(Car);
      return (
        <Container className={classes.container}>
           <Grid container spacing={3}>
                {imagesUrl.map( url => (
                    <Grid item xs={6} md={6} lg={4} key={url}>
                        <Card id ={url} url={url} />
                    </Grid>
                ))}
            </Grid>
        </Container>
      )
  }