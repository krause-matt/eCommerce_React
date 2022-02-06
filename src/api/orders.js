import axios from "axios";

const port = process.env.PORT;

export default axios.create({
  baseURL: `http://ecommerce-pizza-place.herokuapp.com:${port}`
});