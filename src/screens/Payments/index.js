import React, { Component } from 'react';
import {getPaymentMethods} from '../../api/index';

class Payments extends Component{
constructor(){
    super();
    this.state= {
        isLoading:true,
        paymentDetails :{}

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
      paymentDetails: data,
      isLoading: false,
    });
  };
}