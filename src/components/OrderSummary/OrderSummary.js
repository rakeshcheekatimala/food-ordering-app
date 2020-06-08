import React from 'react';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import { Adjust as AdjustIcon } from '@material-ui/icons/';

const OrderSummary = (props) => {
  let { selectedItems } = props;
  console.log('ordersummary..');
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4">SUMMARY</Typography>
          <Grid container>
            {[...selectedItems].map((item) => {
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
                    <Typography variant="subtitle1" component="span">
                      {item[1].item_name}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} className="alignCenter">
                    <Typography variant="subtitle2" component="span">
                      <b>₹</b>
                      {item[1].price}
                    </Typography>
                  </Grid>
                  <br />
                  <br />
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
