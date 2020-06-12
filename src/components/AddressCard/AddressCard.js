import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import joinClassNames from 'classnames';
const useStyles = makeStyles({
  root: {
    //width: 275,
    marginLeft: '1rem',
    //minHeight: '400px',
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
    boxShadow: '2px 1px 3px 3px deeppink',
    border: '2px solid deeppink',
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
  let active = props.active ? classes.active : '';
  return (
    <Card className={joinClassNames(classes.root, active)}>
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
