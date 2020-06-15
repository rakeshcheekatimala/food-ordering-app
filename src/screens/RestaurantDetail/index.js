import React, { Component } from 'react';
import { getRestaurantById } from '../../api';
import RestaurantDetailsCard from '../../components/RestaurantDetailsCard';
import HeaderLayout from '../HeaderLayout';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Card,
  Button,
  CardContent,
  IconButton,
  Badge,
  withStyles,
} from '@material-ui/core';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import { addSelectedItems, addRestaurantDetail } from './../../common/utils';
import {
  Adjust as AdjustIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  FiberManualRecord,
} from '@material-ui/icons/';
import { MessageSnackbar } from './../../components';
import joinClassNames from 'classnames';
import { isUserLoggedIn } from './../../common/utils';

const useStyles = (theme) => ({
  qty: {
    margin: '0 10px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px',
    },
  },
  m15: {
    marginLeft: '15px',
  },
  mt15: {
    marginTop: '1rem',
  },
  fullbtn: {
    width: '100%',
  },
  mb15: {
    marginBottom: '1rem',
  },
  totalAmount: {
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '20px',
    },
  },
});

class RestaurantDetail extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      isLoading: false,
      selectedItems: new Map(),
      qtyCount: 0,
      totalAmount: 0,
      showAddItemMessage: false,
      addItemSuccessful: false,
      showLoginMessage: false,
      errorKey: false,
      openSnackbar: false,
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    this.loadRestaurantDetails(id);
  }

  loadRestaurantDetails = async (id) => {
    // get the restaurant details by id
    this.setState({
      isLoading: true,
    });
    let { data } = await getRestaurantById(id);
    this.setState({
      restaurant: data,
      isLoading: false,
    });
  };

  addItem = (item) => {
    // iterate the map check the item exists in the map
    // if it exits then assign to selectedItem , increment the qty
    // if the value does not exist add the item to map.
    // if the value exists in the map , update the qty
    // and price of the item to the totalAmount

    let { selectedItems, qtyCount, totalAmount } = this.state;
    qtyCount = qtyCount + 1;
    let selectedItem = { ...item };
    if (selectedItems.has(item.id)) {
      selectedItem = selectedItems.get(item.id);
      selectedItem.qty += 1;
      selectedItems.set(item.id, selectedItem);
    } else {
      selectedItem.qty = 1;
      selectedItems.set(item.id, selectedItem);
    }
    totalAmount += selectedItem.price;
    this.setState({
      selectedItems,
      qtyCount,
      totalAmount,
      showAddItemMessage: false,
      showLoginMessage: false,
      addItemSuccessful: true,
      errorKey: uuidv4(),
      openSnackbar: true,
    });
  };

  deleteItem = (item) => {
    // iterate the map check the item exists in the map
    // if it exits then assign to selectedItem , decrement the qty
    // if the qty is 1 then delete from the map and update the setState with the latest map

    let { selectedItems, qtyCount, totalAmount } = this.state;
    qtyCount = qtyCount - 1; // total count decrement value by 1
    let selectedItem = { ...item };
    if (selectedItems.has(item.id)) {
      selectedItem = selectedItems.get(item.id);
    }

    if (selectedItem.qty === 1) {
      selectedItems.delete(item.id); // delete from the map
    }

    selectedItem.qty -= 1; // decrement the qty
    totalAmount -= selectedItem.price; // decrement the totalAmount
    this.setState({
      selectedItems,
      qtyCount,
      totalAmount,
    });
  };

  onClose = () => {
    this.setState({ openSnackbar: false }); // close the snackbar
  };

  onCheckout = (e) => {
    //e.preventDefault();
    let { qtyCount, totalAmount, restaurant } = this.state;
    // first condition to show the error message
    if (qtyCount === 0) {
      this.setState({
        addItemSuccessful: false,
        showLoginMessage: false,
        showAddItemMessage: true,
        errorKey: uuidv4(),
        openSnackbar: true,
      });
    }
    let isLoggedIn = isUserLoggedIn();
    // if the user is not logged in show the error message
    if (!isLoggedIn && qtyCount) {
      this.setState({
        addItemSuccessful: false,
        showAddItemMessage: true,
        showLoginMessage: true,
        errorKey: uuidv4(),
        openSnackbar: true,
      });
    }
    if (isLoggedIn && qtyCount) {
      addSelectedItems(this.state.selectedItems);
      let restaurantSessionObj = {};
      restaurantSessionObj.totalAmount = totalAmount;
      restaurantSessionObj.id = restaurant.id;
      restaurantSessionObj.name = restaurant.restaurant_name;
      addRestaurantDetail(restaurantSessionObj);
      this.props.history.push('/checkout'); // navigate to the checkout page
    }
  };

  render() {
    let {
      restaurant: { categories },
      isLoading,
      qtyCount,
      selectedItems,
      showAddItemMessage,
      showLoginMessage,
      errorKey,
      addItemSuccessful,
      totalAmount,
      restaurant,
      openSnackbar,
    } = this.state; // destruct all the variables from state that are used in JSX
    let { classes } = this.props;
    return (
      <div>
        <HeaderLayout />
        {!isLoading && (
          <RestaurantDetailsCard
            restaurant={restaurant}
          ></RestaurantDetailsCard>
        )}
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Container className={classes.mt15}>
            <Grid container>
              <Grid item xs={12} md={6}>
                {categories &&
                  categories.map((item) => {
                    return (
                      <div key={item.id}>
                        <Typography variant="subtitle1">
                          {item.category_name.toUpperCase()}
                        </Typography>
                        <hr />
                        {item.item_list.map((item_list) => {
                          return (
                            <div className="item__list" key={item_list.id}>
                              <div className="item__category">
                                <FiberManualRecord
                                  className="circle"
                                  style={
                                    item_list.item_type === 'VEG'
                                      ? { color: 'green' }
                                      : { color: 'crimson' }
                                  }
                                />
                                <Typography
                                  component="span"
                                  variant="subtitle2"
                                >
                                  {item_list.item_name}
                                </Typography>
                              </div>
                              <div className="item__price">
                                <Typography
                                  component="span"
                                  variant="subtitle2"
                                >
                                  <b>₹</b> {item_list.price}
                                </Typography>
                                <AddIcon
                                  className="plusicon"
                                  onClick={this.addItem.bind(this, item_list)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={4} xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <IconButton
                      aria-label="items added to cart"
                      color="inherit"
                    >
                      <Badge
                        badgeContent={qtyCount ? qtyCount : '0'}
                        color="primary"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                    <br />
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
                              <Typography
                                variant="subtitle1"
                                component="span"
                                className={classes.m15}
                              >
                                {item[1].item_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={3} className="alignCenter">
                              <AddIcon
                                onClick={this.addItem.bind(this, item[1])}
                              />
                              <Typography
                                variant="body1"
                                component="span"
                                className={classes.qty}
                              >
                                {item[1].qty}
                              </Typography>
                              <RemoveIcon
                                onClick={this.deleteItem.bind(this, item[1])}
                              />
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
                    <Grid
                      container
                      className={joinClassNames(
                        'justify-between',
                        classes.mt15
                      )}
                    >
                      <Typography variant="subtitle2" component="span">
                        <b>Total Amount</b>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="span"
                        className={classes.totalAmount}
                      >
                        <b>₹ {totalAmount}</b>
                      </Typography>
                    </Grid>
                    <div
                      className={joinClassNames(
                        'alignCenter',
                        classes.mb15,
                        classes.mt15
                      )}
                    >
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        className={classes.fullbtn}
                        onClick={this.onCheckout.bind(this)}
                      >
                        CHECK OUT
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {showAddItemMessage && (
              <MessageSnackbar
                message="Please add an item to your cart! "
                messagekey={errorKey}
                open={openSnackbar}
                onClose={this.onClose.bind(this)}
              />
            )}
            {showLoginMessage && (
              <MessageSnackbar
                message="Please login first!"
                messagekey={errorKey}
                onClose={this.onClose.bind(this)}
                open={openSnackbar}
              />
            )}
            {addItemSuccessful && (
              <MessageSnackbar
                open={openSnackbar}
                message="Item added to cart!"
                messagekey={errorKey}
                onClose={this.onClose.bind(this)}
              />
            )}
          </Container>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(RestaurantDetail));
