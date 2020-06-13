import axios from 'axios';
import {
  API_ALL_RESTAURANTS,
  API_FILTER_BY_NAME,
  API_GET_ALLADDRESS,
  API_GET_ALLSTATES,
  API_LOGIN,
  API_LOGOUT,
  API_PAYMENTS_OPTIONS,
  API_RESTAURANT_DETAIL,
  API_SAVE_ADDRESS,
  API_SAVE_ORDER,
  API_SIGNUP,
} from './constants';
import {getUserToken} from './../common/utils';

export const getRestaurantById = async (id) => {
  try {
    let api = `${API_RESTAURANT_DETAIL}/${id}`;
    let result = await axios.get(api);
    return result;
  } catch (e) {
    return e;
  }
};
export const filterRestaurantsByName = async (name) => {
  let api = `${API_FILTER_BY_NAME}${name}`;
  let results = await axios.get(api);
  return results;
};

export const getAllRestaurants = async () => {
  let api = `${API_ALL_RESTAURANTS}`;
  let results = await axios.get(api);
  return results;
};

export const login = async (payload) => {
  let api = `${API_LOGIN}`;
  try {
    let results = await axios.post(api, null, {
      headers: {
        Authorization: 'Basic ' + payload,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return results;
  } catch (e) {
    return e;
  }
};

export const registration = async (payload) => {
  let api = `${API_SIGNUP}`;
  //payload = JSON.stringify(payload);
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    let result = await axios.post(api, payload, config);
    return result;
  } catch (e) {
    return e;
  }
};

export const getAllStates = async () => {
  let api = `${API_GET_ALLSTATES}`;
  let results = await axios.get(api);
  return results;
};

export const getAllAddress = async () => {
  let token = getUserToken();
  let api = `${API_GET_ALLADDRESS}`;
  try {
    let results = await axios.get(api, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return results;
  } catch (e) {
    return e;
  }
};

export const logout = async () => {
  let token = getUserToken();
  let api = `${API_LOGOUT}`;
  try {
    let results = await axios.post(api, null, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return results;
  } catch (e) {
    return e;
  }
};

export const getAllPayments = async () => {
  try {
    let api = `${API_PAYMENTS_OPTIONS}`;
    let results = await axios.get(api);
    return results;
  } catch (e) {
    return e;
  }
};

export const saveOrder = async (payload) => {
  try {
    let token = getUserToken();
    let api = `${API_SAVE_ORDER}`;

    let results = await axios.post(api, payload, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return results;
  } catch (e) {
    return e;
  }
};

export const saveAddress = async (payload) => {

  try {
    let token = getUserToken();
    let api = `${API_SAVE_ADDRESS}`;

    return await axios.post(api, payload, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return e;
  }
};

export const getPaymentMethods = async () => {
  try {
    let api = `${API_PAYMENTS_OPTIONS}`;
    let result = await axios.get(api);
    return result;
  } catch (e) {
    return e;
  }
};
