import axios from 'axios';

export default axios.create({
  baseURL: 'https://1c6uf2sudb.execute-api.us-east-1.amazonaws.com/dev/shopping-list',
  // baseURL: 'http://localhost:3000/dev/shopping-list',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
