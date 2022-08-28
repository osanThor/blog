import axios from '../../../node_modules/axios/index';

const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL = 'http://3.36.0.208:4000/';

export default client;
