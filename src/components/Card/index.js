import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  rating: {
    backgroundColor: 'gold',
    color: '#fff',
  },
  cardaction: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function RestaurantCard(props) {
  const classes = useStyles();
  let {
    restaurant: {
      photo_URL,
      average_price,
      number_customers_rated,
      categories,
      customer_rating,
      restaurant_name,
    },
  } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={photo_URL}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {restaurant_name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ wordWrap: 'break-word' }}
          >
            {categories.split(' ').join(', ')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardaction}>
        <Button
          variant="contained"
          className={classes.rating}
          startIcon={<StarIcon />}
        >
          {customer_rating}({number_customers_rated})
        </Button>
        <Typography variant="caption">₹{average_price} for two</Typography>
      </CardActions>
    </Card>
  );
}

