// import React from 'react';
// import { Typography } from '@material-ui/core';
// import StarIcon from '@material-ui/icons/Star';
// import '../RestaurantDetailsCard/styles.css';

// export default function RestaurantDetailsCard(props) {
//   let {
//     restaurant: {
//       photo_URL,
//       average_price,
//       categories,
//       number_customers_rated,
//       customer_rating,
//       restaurant_name,
//       address,
//     },
//   } = props;

//   function getCategories(categories) {
//     return categories.map(category => category.category_name).join(',')
//   }
//   return (

//     <div className="Restaurant-Main">
//       <div className="RestaurantDetails">
//         <div className="ImageLeft">
//           <img  src={photo_URL} alt={restaurant_name} />
//         </div>
//         <div className="detailsRight">
//           <Typography variant="h5"><span>{restaurant_name}</span></Typography>
//           {address !== null && address !== undefined ?
//             <Typography variant="h6"><span>{address.locality}</span></Typography> : ""}
//           {categories != null && categories !== undefined ?

//             <Typography variant="subtitle1"><span> {getCategories(categories)}
//             </span>
//             </Typography> : ""}
//             <br></br><br></br><br></br>
//             <div className="center">
//               <div className="left">
//           <Typography><span><StarIcon fontSize="small" />{customer_rating}</span></Typography>
//           <Typography variant="caption" className="caption"><span id="rating">AVERAGE RATING BY <b>{number_customers_rated}</b> CUSTOMERS</span>
//           </Typography>
//           </div>
//           <div className="right">
//           <Typography><span>₹{average_price}</span> </Typography>
//           <Typography variant="caption" className="caption"><span>AVERAGE COST FOR TWO PEOPLE</span></Typography>
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

// };
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import '../RestaurantDetailsCard/styles.css';

const useStyles = (theme) => ({
  containerpadding: {
    padding: '1rem',
    backgroundColor: 'lightgray',
  },
  image__container: {
    [theme.breakpoints.down('sm')]: {
      margin: '0px auto',
    },
  },
  textcontainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '1rem',
    },
  },
  customer_rating: {
    display: 'flex',
    alignItems: 'center',
  },
});

function RestaurantDetailsCard(props) {
  const { classes } = props;
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
    return categories.map((category) => category.category_name).join(',');
  }

  return (
    <div>
      <Grid container className={classes.containerpadding}>
        <Grid item xs={10} md={3} className={classes.image__container}>
          <img src={photo_URL} alt={restaurant_name} />
        </Grid>
        <Grid item xs={12} md={9} className={classes.textcontainer}>
          <Typography variant="h6" component="p">
            {restaurant_name}
          </Typography>
          <br />
          {address !== null && address !== undefined ?
          <Typography variant="caption" component="p">
            {address && address.locality.toUpperCase()}
          </Typography>:""
                    }          <br />
                       {categories != null && categories !== undefined ?
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ wordWrap: 'break-word' }}
          >
            {getCategories(categories)}
          </Typography>
          :""}
          <br />
          <Grid container>
            <Grid item xs={6} className={classes.customer_rating}>
              <Typography variant="body1" component="span">
                <StarIcon />
              </Typography>
              <Typography variant="body1" component="span">
                {customer_rating}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <b>₹ </b>
                {average_price}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1">
                AVERAGE RATING BY <br /> {number_customers_rated} CUSTOMERS
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                AVERAGE COST FOR <br />
                TWO PEOPLE
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(RestaurantDetailsCard);