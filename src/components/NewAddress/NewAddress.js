import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import {getAllStates, saveAddress} from "../../api";

const styles = theme => ({
  root: {
    width: '90%',
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 200,
    width: 200
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
});

class NewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      newFlatNo: "",
      newLocality: "",
      newCity: "",
      newState: "",
      newPincode: "",
      flatNoRequired: "dispNone",
      localityRequired: "dispNone",
      cityRequired: "dispNone",
      stateRequired: "dispNone",
      pincodeRequired: "dispNone",
      pincodeValidationMessage: "",
      newAddressAdded: false
    };
  }

  componentWillMount() {
    // Loading all states
    this.getStates();
  }

  /**
   * @description - Loading all states to fill details of new address
   */
  getStates = async () => {
    let {data} = await getAllStates();
    this.setState({
      states: data.states
    });
  };

  /**
   * @description - FlatNo change handler and update component state
   */
  inputFlatNoChangeHandler = (e) => {
    this.setState({newFlatNo: e.target.value});
  }

  /**
   * @description - Locality change handler and update component state
   */
  inputLocalityChangeHandler = (e) => {
    this.setState({newLocality: e.target.value});
  }

  /**
   * @description - City change handler and update component state
   */
  inputCityChangeHandler = (e) => {
    this.setState({newCity: e.target.value});
  }

  /**
   * @description - State change handler and update component state
   */
  inputStateChangeHandler = (e) => {
    this.setState({newState: e.target.value});
  }

  /**
   * @description - Pincode change handler and update component state
   */
  inputPincodeChangeHandler = (e) => {
    this.setState({newPincode: e.target.value});
  }

  /**
   * @description - Get details from user and save new address through Rest API
   */
  saveNewAddress = () => {
    let pincodePattern = /^\d{6}$/;

    // Validating Fields
    this.state.newFlatNo === "" ? this.setState({flatNoRequired: "dispBlock"}) : this.setState({flatNoRequired: "dispNone"});
    this.state.newLocality === "" ? this.setState({localityRequired: "dispBlock"}) : this.setState({localityRequired: "dispNone"});
    this.state.newCity === "" ? this.setState({cityRequired: "dispBlock"}) : this.setState({cityRequired: "dispNone"});
    this.state.newState === "" ? this.setState({stateRequired: "dispBlock"}) : this.setState({stateRequired: "dispNone"});
    if (this.state.newPincode === "") {
      this.setState({pincodeRequired: "dispBlock"});
      this.setState({pincodeValidationMessage: "Required"});
    } else if (!pincodePattern.test(this.state.newPincode)) {
      this.setState({pincodeRequired: "dispBlock"});
      this.setState({pincodeValidationMessage: "Pincode must contain only numbers and must be 6 digits long"});
    } else {
      this.setState({pincodeRequired: "dispNone"});
      this.setState({pincodeValidationMessage: ""});
    }

    // Return if any fields not filled or not in right pattern
    if (this.state.newFlatNo === "" ||
      this.state.newLocality === "" ||
      this.state.newCity === "" ||
      this.state.newState === "" ||
      this.state.newPincode === "" ||
      !pincodePattern.test(this.state.newPincode)) {
      return;
    }

    // Filling temp address object with values to push to server
    let dataNewAddress = JSON.stringify({
      "city": this.state.newCity,
      "flat_building_name": this.state.newFlatNo,
      "locality": this.state.newLocality,
      "pincode": this.state.newPincode,
      "state_uuid": this.state.newState
    });

    saveAddress(dataNewAddress);
  }

  /**
   * @description - Method to reset address related state after success
   */
  resetNewAddress = () => {
    this.setState({
      newCity: '',
      newFlatNo: '',
      newLocality: '',
      newPincode: '',
      newState: '',
      flatNoRequired: "dispNone",
      localityRequired: "dispNone",
      cityRequired: "dispNone",
      stateRequired: "dispNone",
      pincodeRequired: "dispNone",
      pincodeValidationMessage: ""
    });
  }


  render() {
    const {classes} = this.props;
    return (
      <div>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="flatNo">Flat / Building No</InputLabel>
          <Input id="flatNo" type="text" newflatno={this.state.newFlatNo} onChange={this.inputFlatNoChangeHandler}/>
          <FormHelperText className={this.state.flatNoRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br/>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="locality">Locality</InputLabel>
          <Input id="locality" type="text" newlocality={this.state.newLocality}
                 onChange={this.inputLocalityChangeHandler}/>
          <FormHelperText className={this.state.localityRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br/>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="city">City</InputLabel>
          <Input id="city" type="text" newcity={this.state.newCity} onChange={this.inputCityChangeHandler}/>
          <FormHelperText className={this.state.cityRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br/>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select value={this.state.newState} onChange={this.inputStateChangeHandler}
                  input={<Input name="state" id="state"/>} className="stateSelect">
            {(this.state.states || []).map((state, index) => (
              <MenuItem key={state.id} value={state.id}>{state.state_name}</MenuItem>
            ))}
          </Select>
          <FormHelperText className={this.state.stateRequired}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br/>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="pincode">Pincode</InputLabel>
          <Input id="pincode" type="text" newcity={this.state.newPincode} onChange={this.inputPincodeChangeHandler}/>
          <FormHelperText className={this.state.pincodeRequired}>
            <span className="red">{this.state.pincodeValidationMessage}</span>
          </FormHelperText>
        </FormControl>
        <br/>
        <Button variant="contained" color="secondary" style={{marginBottom: 20, marginTop: 20}}
                onClick={this.saveNewAddress.bind(this)}
        >
          SAVE ADDRESS
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(NewAddress);
