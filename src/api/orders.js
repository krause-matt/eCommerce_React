import axios from "axios";

const port = process.env.PORT;

export default axios.create({
  baseURL: `https://ecommerce-pizza-place-default-rtdb.firebaseio.com/`,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});