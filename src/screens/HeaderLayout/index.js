import React, { Component } from 'react';
import { Header, MessageSnackbar } from './../../components';
import { login, registration } from './../../api';
import { isValidContact, isValidPassword } from './../../common/utils';
import { userLogout } from './../../common/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import { isUserLoggedIn as userLoogedIn } from './../../common/utils';
import {
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
import './styles.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2',
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

class HeaderLayout extends Component {
  constructor() {
    super();
    this.state = {
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
      loginApiErrors: {
        status: false,
        errors: {
          contactError: '',
          loginError: '',
        },
      },
      registrationErrors: {
        status: false,
        errors: {
          contactError: '',
        },
      },
      isLoading: true,
      isUserLoggedIn: false,
      isRegistrationSuccess: false,
    };
  }

  componentDidMount() {
    this.setState({
      isUserLoggedIn: userLoogedIn(),
    });
  }
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
      openSnackbar: false,
      loginApiErrors: {
        status: false,
        errors: {
          contactError: '',
          loginError: '',
        },
      },
      registrationErrors: {
        status: false,
        errors: {
          contactError: '',
          passwordError: '',
          apiError: '',
          emailError: '',
        },
      },
      isRegistrationSuccess: false,
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
    if (isValidContact(contact_number) && loginPassword) {
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

      if (result.headers && result.headers['access-token']) {
        sessionStorage.setItem('access-token', result.headers['access-token']);
        this.setState({
          isUserLoggedIn: true,
          modalIsOpen: false,
          openSnackbar: true,
        });
        sessionStorage.setItem('username', result.data.first_name);
      }
    }
  };

  contactNumberChangeHandler = (e) => {
    this.setState({ contact_number: e.target.value });
  };

  inputLoginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  registerClickHandler = () => {
    let { contact, firstname, lastname, email, registerPassword } = this.state;
    let isErrors = false,
      errors = {};
    firstname === ''
      ? this.setState({ firstnameRequired: 'dispBlock' })
      : this.setState({ firstnameRequired: 'dispNone' });
    lastname === ''
      ? this.setState({ lastnameRequired: 'dispBlock' })
      : this.setState({ lastnameRequired: 'dispNone' });
    email === ''
      ? this.setState({ emailRequired: 'dispBlock' })
      : this.setState({ emailRequired: 'dispNone' });
    registerPassword === ''
      ? this.setState({ registerPasswordRequired: 'dispBlock' })
      : this.setState({ registerPasswordRequired: 'dispNone' });
    contact === ''
      ? this.setState({ contactRequired: 'dispBlock' })
      : this.setState({ contactRequired: 'dispNone' });

    if (
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      registerPassword === '' ||
      contact === ''
    ) {
      isErrors = true;
      return;
    }
    if (contact && isValidContact(contact)) {
      errors.contactError = null;
    } else {
      errors.contactError =
        'Contact No. must contain only numbers and must be 10 digits long';
      isErrors = true;
    }
    if (registerPassword && isValidPassword(registerPassword)) {
      errors.passwordError = '';
    } else {
      errors.passwordError =
        'Password must contain at least one capital letter, one small letter, one number, and one special character';
      isErrors = true;
    }
    if (EmailValidator.validate(email)) {
      errors.emailError = '';
    } else {
      errors.emailError = 'Invalid Email';
    }
    console.log(EmailValidator.validate(email), 'isValid email');
    if (!isErrors) {
      let registrationPayload = JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        email_address: email,
        contact_number: contact,
        password: registerPassword,
      });
      this.registerCustomer(registrationPayload);
    } else {
      this.setState({
        registrationErrors: {
          status: true,
          errors,
        },
      });
    }
  };

  registerCustomer = async (payload) => {
    let result = await registration(payload);
    if (result.status === 201) {
      this.setState({
        isRegistrationSuccess: true,
        openSnackbar: true,
        modalIsOpen: false,
      });
    }
    if (result.code) {
      this.setState({
        registrationErrors: {
          status: true,
          errors: {
            passwordError: null,
            contactError: null,
            apiError: result.message,
          },
        },
      });
    }
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

  userLogout = () => {
    this.setState({
      isUserLoggedIn: false,
    });
    userLogout();
  };

  onClose = () => {
    this.setState({ openSnackbar: false }); // close the snackbar
  };

  render() {
    const { classes, history, showSearch } = this.props;
    const {
      loginApiErrors,
      isUserLoggedIn,
      openSnackbar,
      isRegistrationSuccess,
      registrationErrors,
    } = this.state;
    return (
      <>
        <Header
          onChangeHandler={this.props.onChangeHandler}
          onLoginClickHandler={this.openModalHandler.bind(this)}
          isUserLoggedIn={isUserLoggedIn}
          history={history}
          userLogout={this.userLogout.bind(this)}
          showSearch={showSearch}
        />

        <Modal
          zIndex="modal"
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
            <TabContainer className={classes.loginTab}>
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
                  <FormHelperText className="errorMessage">
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
                  <FormHelperText className="errorMessage">
                    <br />
                    <span className="red">
                      {loginApiErrors.errors.loginError}
                    </span>
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              {this.state.isUserLoggedIn === true && (
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
                {registrationErrors.status && (
                  <FormHelperText className="errorMessage">
                    <span className="red">
                      {registrationErrors.errors.emailError}
                    </span>
                  </FormHelperText>
                )}
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
                {registrationErrors.status && (
                  <FormHelperText className="errorMessage">
                    <span className="red">
                      {registrationErrors.errors.passwordError}
                    </span>
                  </FormHelperText>
                )}
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
                {registrationErrors.status && (
                  <FormHelperText className="errorMessage">
                    <span className="red">
                      {registrationErrors.errors.contactError}
                    </span>
                  </FormHelperText>
                )}
              </FormControl>
              <br />
              <br />
              {registrationErrors.status && (
                <FormHelperText className="errorMessage">
                  <span className="red">
                    {registrationErrors.errors.apiError}
                  </span>
                </FormHelperText>
              )}
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
        {isUserLoggedIn && (
          <MessageSnackbar
            message="User is Logged Succesfully!"
            open={openSnackbar}
            onClose={this.onClose.bind(this)}
          />
        )}
        {isRegistrationSuccess && (
          <MessageSnackbar
            message="Customer is Registered Succesfully!"
            open={openSnackbar}
            onClose={this.onClose.bind(this)}
          />
        )}
      </>
    );
  }
}

export default withStyles(useStyles)(withRouter(HeaderLayout));

HeaderLayout.defaultProps = {
  onChangeHandler: () => {},
};

HeaderLayout.propTypes = {
  onChangeHandler: PropTypes.func,
};
