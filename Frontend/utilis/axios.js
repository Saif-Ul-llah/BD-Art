

import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'https://cute-cyan-lion-cape.cyclic.app/',
  baseURL:'https://node-on-vercel-nine.vercel.app/',

});

export default instance;  
