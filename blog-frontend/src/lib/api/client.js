import axios from '../../../node_modules/axios/index';

const client = axios.create();
client.defaults.withCredentials = true;

export default client;
