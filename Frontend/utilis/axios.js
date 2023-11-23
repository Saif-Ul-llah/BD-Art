

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cute-cyan-lion-cape.cyclic.app'||'http://localhost:8080',
});

export default instance; 