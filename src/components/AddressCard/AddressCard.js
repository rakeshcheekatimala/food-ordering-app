import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    //width: 275,
    marginLeft: '1rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardContent: {
    padding: '12px',
  },
  active: {
    boxShadow: '5px 10px 8px 10px deeppink',
  },
});

export default function AddressCard(props) {
  let {
    flat_building_name,
    locality,
    city,
    pincode,
    state: { state_name },
  } = props.address;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.title}
          color="textSecondary"
          component="p"
        >
          {flat_building_name}
        </Typography>
        <Typography variant="body2" component="p">
          {locality}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {city}
        </Typography>
        <Typography variant="body2" component="p">
          {pincode}
          <br />
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {state_name}
        </Typography>
      </CardContent>
    </Card>
  );
}
