import React from 'react';
import { Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import '../RestaurantDetailsCard/styles.css';

export default function RestaurantDetailsCard(props) {
  let {
    restaurant: {
      photo_URL,
      average_price,
      categories,
      number_customers_rated,
      customer_rating,
      restaurant_name,
      address,
    },
  } = props;

  function getCategories(categories) {
    return categories.map(category => category.category_name).join(',')
  }
  return (

    <div className="Restaurant-Main">
      <div className="RestaurantDetails">
        <div className="ImageLeft">
          <img  src={photo_URL} alt={restaurant_name} />
        </div>
        <div className="detailsRight">
          <Typography variant="h5"><span>{restaurant_name}</span></Typography>
          {address !== null && address !== undefined ?
            <Typography variant="h6"><span>{address.locality}</span></Typography> : ""}
          {categories != null && categories !== undefined ?

            <Typography variant="subtitle1"><span> {getCategories(categories)}
            </span>
            </Typography> : ""}
            <br></br><br></br><br></br>
            <div className="center">
              <div className="left">
          <Typography><span><StarIcon fontSize="small" />{customer_rating}</span></Typography>
          <Typography variant="caption" className="caption"><span id="rating">AVERAGE RATING BY <b>{number_customers_rated}</b> CUSTOMERS</span>
          </Typography>
          </div>
          <div className="right">
          <Typography><span>₹{average_price}</span> </Typography>
          <Typography variant="caption" className="caption"><span>AVERAGE COST FOR TWO PEOPLE</span></Typography>
          </div>
          </div>
        </div>
      </div>
    </div>
  )

};
