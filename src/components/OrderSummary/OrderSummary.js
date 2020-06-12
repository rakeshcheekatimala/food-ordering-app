import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Adjust as AdjustIcon } from '@material-ui/icons/';
import './OrderSummary.css';

const useStyles = makeStyles((theme) => ({
  ml15: {
    marginLeft: '1rem',
  },
  fullwidth: {
    width: '100%',
    marginTop: '1rem',
  },
  ordersummary: {
    marginTop: '24px',

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 48px)',
      margin: '0px 24px',
    },
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 24px)',
    },
  },
  spaceAround: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '16px',
  },
}));

const OrderSummary = (props) => {
  let {
    selectedItems,
    restaurant: { name, totalAmount },
    onOrderClickHandler,
  } = props;
  const classes = useStyles();

  return (
    <>
      <Card className={classes.ordersummary}>
        <CardContent>
          <Typography variant="h3">Summary</Typography>
          <br />
          <Typography variant="h3">{name}</Typography>
          <br />
          <Grid container>
            {[...selectedItems].map((item, index) => {
              return (
                <React.Fragment key={'checkout' + item[1].id}>
                  <Grid item xs={7} className="alignCenter">
                    <AdjustIcon
                      className="adjusticon"
                      style={
                        item[1].item_type === 'VEG'
                          ? { color: 'green' }
                          : { color: 'crimson' }
                      }
                    />
                    <Typography
                      variant="subtitle1"
                      component="span"
                      className={classes.ml15}
                    >
                      {item[1].item_name}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      className={classes.ml15}
                    >
                      {item[1].qty}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} className="alignCenter"></Grid>
                  <Grid item xs={2} className="alignCenter">
                    <Typography variant="subtitle2" component="span">
                      <b>₹</b>
                      {item[1].price}
                    </Typography>
                  </Grid>
                  <br />
                  <br />
                  {parseInt(index + 1) === selectedItems.size && (
                    <>
                      <hr className={classes.fullwidth} />
                      <Grid item xs={12} className={classes.spaceAround}>
                        <Typography variant="body1">Net Amount</Typography>
                        <Typography variant="subtitle2">
                          <b>₹</b>
                          {totalAmount}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.fullwidth}
                          onClick={onOrderClickHandler}
                        >
                          PLACE ORDER
                        </Button>
                      </Grid>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderSummary;
