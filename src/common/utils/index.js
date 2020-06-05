export const isUserLoggedIn = () => {
  return getUserToken() ? true : false;
};

export const userLogout = () => {
  sessionStorage.clear(); //remove all the keys stored
};

export const getUserToken = () => {
  return sessionStorage.getItem('access-token');
};
