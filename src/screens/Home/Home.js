import React, { Component } from 'react';
import { RestaurantCard } from '../../components';
import { filterRestaurantsByName, getAllRestaurants } from '../../api';
import HeaderLayout from '../HeaderLayout';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Container, withStyles, Typography } from '@material-ui/core';
import './Home.css';

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
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.loadAllRestaurants();
  }

  loadAllRestaurants = async () => {
    let {
      data: { restaurants },
    } = await getAllRestaurants();
    this.setState({
      restaurants,
      isLoading: false,
    });
  };

  onChangeHandler = async (e) => {
    if (e.target.value === '') {
      this.loadAllRestaurants();
    } else {
      this.setState({
        isLoading: true,
      });
      let { data } = await filterRestaurantsByName(e.target.value);
      this.setState({
        restaurants: data.restaurants || [],
      });
      this.setState({
        isLoading: false,
      });
    }
  };

  onRestaurantClick = (id) => {
    this.props.history.push('/restaurant/' + id);
  };

  render() {
    const { classes, history } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <HeaderLayout
          onChangeHandler={this.onChangeHandler.bind(this)}
          history={history}
          showSearch={true}
        />
        <Container className={classes.root}>
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          )}

          <Grid container spacing={3}>
            {!isLoading &&
              this.state.restaurants.map((item) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    key={item.id}
                    onClick={this.onRestaurantClick.bind(this, item.id)}
                  >
                    <RestaurantCard key={item.id} restaurant={item} />
                  </Grid>
                );
              })}
            {!isLoading && this.state.restaurants.length === 0 && (
              <Typography variant="body1">
                No restaurants with the given name
              </Typography>
            )}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(Home);
