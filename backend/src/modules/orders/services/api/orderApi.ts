import axios from 'axios';

const order = axios.create({
  baseURL: 'http://localhost:8082/v1/orders/',
});

export default order;
