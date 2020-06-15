import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  AddressLayout,
  PaymentOptions,
  OrderSummary,
} from './../../components';
import { getSelectedItems, getRestaurantInfo } from './../../common/utils';
import HeaderLayout from './../HeaderLayout';
import { saveOrder } from './../../api';
import { MessageSnackbar } from '../../components';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Delivery', 'Payment'];
}

function getStepContent(step, setCheckout, checkout) {
  const onClickHandler = (address) => {
    setCheckout({
      ...checkout,
      selectedAddress: address,
    });
  };
  const paymentHandler = (payment) => {
    setCheckout({
      ...checkout,
      selectedPaymentOption: payment[0],
    });
  };

  switch (step) {
    case 0:
      return (
        <AddressLayout
          onClick={onClickHandler}
          addressSelected={checkout.selectedAddress.id}
        />
      );
    case 1:
      return (
        <PaymentOptions
          onClick={paymentHandler}
          paymentSelected={checkout.selectedPaymentOption}
        />
      ); // @Sowdharya will update your component here ex:
    default:
      return 'Unknown step';
  }
}

function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [checkout, setCheckout] = React.useState({
    selectedAddress: { id: '' },
    selectedPaymentOption: { id: '', payment_name: '' },
    openSnackbar: false,
    orderItemSuccessful: false,
  }); // initial state

  const steps = getSteps();
  let selectedItems = getSelectedItems();
  selectedItems = new Map(Object.entries(selectedItems));
  let selectedRestaurnt = getRestaurantInfo();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onOrderClickHandler = async () => {
    let checkoutData = checkout;
    let itemList = [...selectedItems].map((item) => {
      return {
        item_id: item[1].id,
        price: item[1].price,
        quantity: item[1].qty,
      };
    });
    let payload = {
      address_id: checkoutData.selectedAddress.id,
      bill: selectedRestaurnt.totalAmount,
      payment_id: checkoutData.selectedPaymentOption.id,
      item_quantities: itemList,
      restaurant_id: selectedRestaurnt.id,
    };
    let results = await saveOrder(JSON.stringify(payload));
    if (results.data) {
      setCheckout({
        ...checkout,
        openSnackbar: true,
        orderItemSuccessful: true,
      });
    }
  };

  return (
    <div className={classes.root}>
      <HeaderLayout />
      <Grid container>
        <Grid item xs={12} md={9}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index, setCheckout, checkout)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} md={3} className={classes.ordersummary__container}>
          <OrderSummary
           selectedAddress={checkout.selectedAddress.id}
           selectedPaymentOption= {checkout.selectedPaymentOption.id}
            selectedItems={selectedItems}
            restaurant={selectedRestaurnt}
            onOrderClickHandler={onOrderClickHandler}
          />
        </Grid>
      </Grid>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>View the summary and place your order now!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Change
          </Button>
        </Paper>
      )}
      {checkout.orderItemSuccessful && (
        <MessageSnackbar
          open={checkout.openSnackbar}
          message="Order placed successfully"
          onClose={() => {
            setCheckout({ ...checkout, openSnackbar: false });
          }}
        />
      )}
    </div>
  );
}

export default Checkout;
