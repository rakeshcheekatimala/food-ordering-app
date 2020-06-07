import axios from 'axios';
import {
  API_FILTER_BY_NAME,
  API_ALL_RESTAURANTS,
  API_LOGIN,
  API_SIGNUP,
  API_RESTAURANT_DETAIL,
} from './constants';


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
      headers: { Authorization: 'Basic ' + payload },
    });
    return results;
  } catch (e) {
    return e;
  }
};

export const registration = async (payload) => {
  let api = `${API_SIGNUP}`;
  try {
    let result = await axios.post(api, payload);
    console.log('the result in registration api', result);
    return result;
  } catch (e) {
    return e;
  }
};
