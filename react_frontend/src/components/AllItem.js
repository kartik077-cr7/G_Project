import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from './UI/Card';
import Container from '@material-ui/core/Container';

const imagesUrl = [
          'adsasdasdasd/asd/a/sd',
          'as/asd/a/sda/ds',
          'asdadssadsad/'
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

      return (
        <Container className={classes.container}>
           <Grid container spacing={3}>
                {imagesUrl.map( url => (
                    <Grid item xs={12} md={6} lg={4} key={url}>
                        <Card id ={url} url={url} />
                    </Grid>
                ))}
            </Grid>
        </Container>
      )
  }