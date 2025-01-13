import axios from 'axios';
import { ipBack } from '../../src/api/config.js';

const axios1 = axios.create({
    withCredentials: true,
    baseURL: ipBack,
    //baseURL: 'http://127.0.0.1:4999/',
    //baseURL: '',
    //withCredentials: true
})
export default axios1;