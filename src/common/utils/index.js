export const isUserLoggedIn = () => {
  return getUserToken() ? true : false;
};

export const userLogout = () => {
  sessionStorage.clear(); //remove all the keys stored
};

export const getUserToken = () => {
  return sessionStorage.getItem('access-token');
};

export const isValidPassword = (password) => {
  let lowerCase = false;
  let upperCase = false;
  let number = false;
  let specialCharacter = false;

  if (password.length < 8) {
    return false;
  }

  if (password.match('(?=.*[0-9]).*')) {
    number = true;
  }

  if (password.match('(?=.*[a-z]).*')) {
    lowerCase = true;
  }
  if (password.match('(?=.*[A-Z]).*')) {
    upperCase = true;
  }
  if (password.match('(?=.*[#@$%&*!^]).*')) {
    specialCharacter = true;
  }

  if (lowerCase && upperCase) {
    if (specialCharacter && number) {
      return true;
    }
  } else {
    return false;
  }
  return false;
};

export const isValidContact = (contact_number) => {
  if (contact_number !== '' && !contact_number.match(/^\d{10}$/g)) {
    return false;
  }
  return true;
};

export const getUserName = () => {
  return sessionStorage.getItem('username');
};

export const addSelectedItems = (selectedItems) => {
  let cartitems = {};
  for (let [key, value] of selectedItems) {
    cartitems[key] = value;
  }
  cartitems = JSON.stringify(cartitems);
  sessionStorage.setItem('cartitems', cartitems);
};

export const getSelectedItems = () => {
  let items = sessionStorage.getItem('cartitems');
  return JSON.parse(items);
};

export const addRestaurantDetail = (restaurant) => {
  sessionStorage.setItem('restaurant', JSON.stringify(restaurant));
};

export const getRestaurantInfo = () => {
  let items = sessionStorage.getItem('restaurant');
  return JSON.parse(items);
};
