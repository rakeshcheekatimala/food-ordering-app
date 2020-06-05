import React, { Component } from 'react';
import { Header, RestaurantCard } from './../../components';
import { filterRestaurantsByName, getAllRestaurants } from './../../api';
import { Grid, Container, withStyles } from '@material-ui/core';

const useStyles = (theme) => ({
  root: {
    marginTop: '2rem',
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
    };
  }

  componentDidMount() {
    this.loadAllRestaurants();
  }

  loadAllRestaurants = async () => {
    let {
      data: { restaurants },
    } = await getAllRestaurants();
    this.setState({
      restaurants,
    });
  };
  onChangeHandler = async (e) => {
    let {
      data: { restaurants },
    } = await filterRestaurantsByName(e.target.value);
    this.setState({
      restaurants,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Header onChangeHandler={this.onChangeHandler.bind(this)} />
        <Container className={classes.root}>
          <Grid container spacing={3}>
            {this.state.restaurants.map((item) => {
              return (
                <Grid item xs={12} md={3} key={item.id}>
                  <RestaurantCard key={item.id} restaurant={item} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(Home);
