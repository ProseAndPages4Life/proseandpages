import axios from 'axios';
import { ipBack } from '../../src/api/config.js';

//import { idBook } from '../pages/books/ProductDisplay.jsx';


export const getAdminProfile = user => axios.get(`${ipBack}/admin/profile`, user);
export const getClientProfile = user => axios.get(`${ipBack}/profile`, user);
export const getInvProfile = user => axios.get(`${ipBack}/inv/profile`, user);
//Login Register
//admin
export const loginAdminReq = user => axios.post(`${ipBack}/admin/login`, user);
//export const regisAdminReq = user => axios.post(`${ipBack}/admin/register`, user);

export const loginClientReq = user => axios.post(`${ipBack}/login`, user);
export const regisClientReq = user => axios.post(`${ipBack}/register`, user);

export const loginInvReq = user => axios.post(`${ipBack}/inv/login`, user);
//export const regisInvReq = user => axios.post(`${ipBack}/inv/register`, user);

//Post
export const createBookReq = user => axios.post(`${ipBack}/admin/books`, user);
export const createUserReq = user => axios.post(`${ipBack}/admin/login`, user);

export const getAdminBookReq = user =>axios.get(`${ipBack}/admin/books`)
export const getClientaBookReq = user =>axios.get(`${ipBack}/books/`,{
    id: 1,
})
export const getClientBookReq = user =>axios.get(`${ipBack}/books/`)
/* 
export const getAdminBookReq = axios.get(`${ipBack}/admin/books/`).then(function (response) {
    console.log(response);
})
    .catch(function (error) {
        if (error.response) {
            console.log('Server responded with status code:', error.response.status);
            console.log('Response data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error creating request:', error.message);
        }
    }); */


export const loginReq = user => axios.post(`${ipBack}/admin/login`, user);

