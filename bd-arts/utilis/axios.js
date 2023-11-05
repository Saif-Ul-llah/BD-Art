// import axios from "axios";

// export const Axios = () => {
//     axios.create({
//         baseURL:"http://localhost:8080"
//     });
// }

// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // other configuration options
});

export default instance;