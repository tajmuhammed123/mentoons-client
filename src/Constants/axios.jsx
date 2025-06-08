import axios from "axios";
export const axiosUserInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_ROUTE,
});