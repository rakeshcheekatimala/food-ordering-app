import React, { Component } from 'react';
import {getPaymentMethods} from '../../api';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class PaymentOptions extends Component {
  constructor(){
    super();
    this.state= {
        isLoading:true,
        paymentDetails : [],
        value:{}

    }
  }
  componentDidMount(){
    this.getPaymentDetails();
   }
   
   getPaymentDetails = async (id) => {
       // get the restaurant details by id
       this.setState({
         isLoading: true,
       });
       let { data } = await getPaymentMethods();
       this.setState({
         paymentDetails: data.paymentMethods,
         isLoading: false,
       });
       console.log(this.state.paymentDetails);
     };
     
      handleChange = (event) => {
       
        let payment_name = event.target.value;
    this.setState({ value: payment_name });

    let paymentId = this.state.paymentDetails.filter((payment) => {
      return payment.payment_name === payment_name;
    });

    this.props.onClick(paymentId);
    };
    
 render(){
 return (<div>

  <FormControl component="fieldset">
  <FormLabel component="legend">Select Mode of Payment</FormLabel>
  <RadioGroup aria-label="payment" name="payment1" value={this.state.value} onChange={this.handleChange}>
  {this.state.paymentDetails && this.state.paymentDetails.map(payment =>
    <FormControlLabel value={payment.payment_name} control={<Radio />} label={payment.payment_name} />

  )
 }
 </RadioGroup>
</FormControl>
</div>
 );
 }
}
export default PaymentOptions;
