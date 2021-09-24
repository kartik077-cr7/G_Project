import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CartContext from '../../store/cart-context';
import ItemForm from './ItemForm';

const useStyles = makeStyles({
  top: {
    position:'relative',
  },
  root: {
    width:"100%"
  },
  media: {
    height: 140,
  },
  action:{
    height:120,
  }
});

const imageUrl = 'images/';
export default function MediaCard({name,url,itemId,price}) {
  
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
      cartCtx.addItem({
          id: itemId,
          name:name,
          amount:amount,
          price:price,
      });
  }

  const classes = useStyles();
  
  const newUrl = `${imageUrl}${url}`;
  var x=price;
  x=x.toString();
  var lastThree = x.substring(x.length-3);
  var otherNumbers = x.substring(0,x.length-3);
  if(otherNumbers != '')
      lastThree = ',' + lastThree;
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  
  return (
  <div className={classes.top}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className = {classes.media}
          //image={url}
          image = {newUrl}
          style={{height:'200px'}}
          title="Flipkart Item"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button size="small" color="primary" style={{fontSize:'15px',position:"absolute",top:"218px",right:"10px"}}>
         {itemId}
        </Button>
        <Button size="small" color="primary" style={{fontSize:'17px',position:"absolute",top:"250px"}}>
         ₹{res}
        </Button>
      </CardActions>
    </Card>
    <ItemForm id = {itemId} onAddToCart = {addToCartHandler}/>
  </div>
  );
}