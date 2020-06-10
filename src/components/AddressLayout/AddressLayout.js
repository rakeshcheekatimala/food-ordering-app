import React, { Component } from 'react';
import {
  Typography,
  GridListTile,
  Tabs,
  Tab,
  AppBar,
  GridList,
  withStyles,
} from '@material-ui/core';
import { getAllAddress } from './../../api';
import AddressCard from '../AddressCard/AddressCard';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridListTitle: {
    //margin: '1rem 0px',
  },
});

class AddressTabs extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      addresses: [],
    };
  }

  componentDidMount() {
    this.loadAllAddress();
  }

  loadAllAddress = async () => {
    let { data } = await getAllAddress();
    console.log('the result is...', data);
    if (data && data.addresses) {
      this.setState({
        addresses: data.addresses,
      });
    }
  };
  handleChange = (newValue) => {
    console.log('the newvalue', newValue);
    this.setState({
      value: newValue,
    });
  };
  renderAddressCards = () => {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {this.state.addresses.map((address) => {
            return (
              <GridListTile key={address.id} className={classes.gridListTitle}>
                <AddressCard address={address} key={address.id} />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  };
  render() {
    let { value } = this.state;

    return (
      <>
        <AppBar position="static">
          <Tabs value={value} aria-label="address tabs">
            <Tab
              label="EXISTING ADDRESS"
              {...a11yProps(0)}
              onClick={this.handleChange.bind(this, 0)}
            />
            <Tab
              label="NEW ADDRESS"
              {...a11yProps(1)}
              onClick={this.handleChange.bind(this, 1)}
            />
          </Tabs>
        </AppBar>
        {value === 0 && this.renderAddressCards()}
        {value === 1 && <Typography>ADDRESS</Typography>}
      </>
    );
  }
}

export default withStyles(useStyles)(AddressTabs);
