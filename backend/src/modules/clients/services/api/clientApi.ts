import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8081/v1/clients',
});

export default client;
