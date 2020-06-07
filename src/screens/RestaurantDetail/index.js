import React, { Component } from 'react';
import {getRestaurantById} from '../../api';
import  RestaurantDetailsCard from '../../components/RestaurantDetailsCard';
import HeaderLayout from '../HeaderLayout';

class RestaurantDetail extends Component {
  constructor(){
    super();
    this.state={
      restaurant : {}
    }
  }

  componentDidMount(){
    this.GetRestaurantById();
 
  }

   GetRestaurantById = async()=>{
    let results = await getRestaurantById('246165d2-a238-11e8-9077-720006ceb890');
    console.log(results);
    this.setState({restaurant : results.data})
    
  }

  render() {
    return <div><HeaderLayout />
    {this.state.restaurant &&
    <RestaurantDetailsCard restaurant= {this.state.restaurant}></RestaurantDetailsCard>
    }
        
    </div>
    
  }
}

export default RestaurantDetail;
