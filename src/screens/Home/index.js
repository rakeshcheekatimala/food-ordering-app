import React, { Component } from 'react';
import { Header, RestaurantCard } from './../../components';
import { filterRestaurantsByName, getAllRestaurants, login } from './../../api';
import {
  Grid,
  Container,
  withStyles,
  Tabs,
  Tab,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from '@material-ui/core';
import Modal from 'react-modal';
import './Home.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const useStyles = (theme) => ({
  root: {
    marginTop: '2rem',
  },
});

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      modalIsOpen: false,
      value: 0,
      contact_numberRequired: 'dispNone',
      contact_number: '',
      loginPasswordRequired: 'dispNone',
      loginPassword: '',
      firstnameRequired: 'dispNone',
      firstname: '',
      lastnameRequired: 'dispNone',
      lastname: '',
      emailRequired: 'dispNone',
      email: '',
      registerPasswordRequired: 'dispNone',
      registerPassword: '',
      contactRequired: 'dispNone',
      contact: '',
      registrationSuccess: false,
      loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
      loginApiErrors: {
        status: false,
        errors: {
          contactError: '',
          loginError: '',
        },
      },
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

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
      contact_numberRequired: 'dispNone',
      contact_number: '',
      loginPasswordRequired: 'dispNone',
      loginPassword: '',
      firstnameRequired: 'dispNone',
      firstname: '',
      lastnameRequired: 'dispNone',
      lastname: '',
      emailRequired: 'dispNone',
      email: '',
      registerPasswordRequired: 'dispNone',
      registerPassword: '',
      contactRequired: 'dispNone',
      contact: '',
      loginApiErrors: {
        status: false,
        errors: {
          contactError: '',
          loginError: '',
        },
      },
    });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  loginClickHandler = async () => {
    let { contact_number, loginPassword } = this.state;
    contact_number === ''
      ? this.setState({ contact_numberRequired: 'dispBlock' })
      : this.setState({ contact_numberRequired: 'dispNone' });
    loginPassword === ''
      ? this.setState({ loginPasswordRequired: 'dispBlock' })
      : this.setState({ loginPasswordRequired: 'dispNone' });

    if (contact_number !== '' && !contact_number.match(/^\d{10}$/g)) {
      this.setState({
        loginApiErrors: {
          status: true,
          errors: {
            contactError: 'Invalid Contact',
          },
        },
      });
    } else {
      this.setState({
        loginApiErrors: {
          status: false,
          errors: {
            contactError: '',
          },
        },
      });
    }
    let payload = window.btoa(contact_number + ':' + loginPassword);
    let result = await login(payload);
    if (result.isAxiosError) {
      let { message } = result.response.data;
      this.setState({
        loginApiErrors: {
          status: true,
          errors: {
            loginError: message,
          },
        },
      });
    }
  };

  contactNumberChangeHandler = (e) => {
    this.setState({ contact_number: e.target.value });
  };

  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  registerClickHandler = () => {
    this.state.firstname === ''
      ? this.setState({ firstnameRequired: 'dispBlock' })
      : this.setState({ firstnameRequired: 'dispNone' });
    this.state.lastname === ''
      ? this.setState({ lastnameRequired: 'dispBlock' })
      : this.setState({ lastnameRequired: 'dispNone' });
    this.state.email === ''
      ? this.setState({ emailRequired: 'dispBlock' })
      : this.setState({ emailRequired: 'dispNone' });
    this.state.registerPassword === ''
      ? this.setState({ registerPasswordRequired: 'dispBlock' })
      : this.setState({ registerPasswordRequired: 'dispNone' });
    this.state.contact === ''
      ? this.setState({ contactRequired: 'dispBlock' })
      : this.setState({ contactRequired: 'dispNone' });

    let dataSignup = JSON.stringify({
      email_address: this.state.email,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      mobile_number: this.state.contact,
      password: this.state.registerPassword,
    });
  };

  inputFirstNameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value });
  };

  inputLastNameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value });
  };

  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  inputRegisterPasswordChangeHandler = (e) => {
    this.setState({ registerPassword: e.target.value });
  };

  inputContactChangeHandler = (e) => {
    this.setState({ contact: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { loginApiErrors } = this.state;
    return (
      <>
        <Header
          onChangeHandler={this.onChangeHandler.bind(this)}
          onLoginClickHandler={this.openModalHandler.bind(this)}
        />
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
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.tabChangeHandler}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="contact_number">Contact No</InputLabel>
                <Input
                  id="contact_number"
                  type="text"
                  contact_number={this.state.contact_number}
                  onChange={this.contactNumberChangeHandler}
                />
                <FormHelperText className={this.state.contact_numberRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                {loginApiErrors.status && (
                  <FormHelperText className="dispBlock">
                    <span className="red">
                      <br />
                      {loginApiErrors.errors.contactError}
                    </span>
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  type="password"
                  loginpassword={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                {loginApiErrors.status && (
                  <FormHelperText className="dispBlock">
                    <br />
                    <span className="red">
                      {loginApiErrors.errors.loginError}
                    </span>
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              {this.state.loggedIn === true && (
                <FormControl>
                  <span className="successText">Login Successful!</span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}

          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  firstname={this.state.firstname}
                  onChange={this.inputFirstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  lastname={this.state.lastname}
                  onChange={this.inputLastNameChangeHandler}
                />
                <FormHelperText className={this.state.lastnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  email={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type="password"
                  registerpassword={this.state.registerPassword}
                  onChange={this.inputRegisterPasswordChangeHandler}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                <Input
                  id="contact"
                  type="text"
                  contact={this.state.contact}
                  onChange={this.inputContactChangeHandler}
                />
                <FormHelperText className={this.state.contactRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {this.state.registrationSuccess === true && (
                <FormControl>
                  <span className="successText">
                    Registration Successful. Please Login!
                  </span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.registerClickHandler}
              >
                REGISTER
              </Button>
            </TabContainer>
          )}
        </Modal>
      </>
    );
  }
}

export default withStyles(useStyles)(Home);
