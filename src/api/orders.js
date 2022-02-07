import axios from "axios";

const port = process.env.PORT;

export default axios.create({
  baseURL: `https://my-json-server.typicode.com/krause-matt/eCommerce_React`
});