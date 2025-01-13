import axios1 from './axios';
import axios from 'axios';


//import { idBook } from '../pages/books/ProductDisplay.jsx';
export const verifyTokenClientReq = () => axios1.get('/auth/verify/client')
export const verifyTokenAdminReq = () => axios1.get('/auth/verify/admin')
export const verifyTokenInvReq = () => axios1.get('/auth/verify/inv')

export const getAdminProfile = user => axios1.get(`admin/profile`, user);
export const getClientProfile = user => axios1.get(`profile`, user);
export const getInvProfile = user => axios1.get(`inv/profile`, user);
//Login Register
//admin
export const loginAdminReq = user => axios1.post(`admin/login`, user);
//export const regisAdminReq = user => axios1.post(`admin/register`, user);

export const loginClientReq = user => axios1.post(`login`, user);
export const regisClientReq = user => axios1.post(`register`, user);

export const loginInvReq = user => axios1.post(`inv/login`, user);
//export const regisInvReq = user => axios1.post(`inv/register`, user);

//Post
export const createBookReq = user => axios1.post(`admin/books`, user);
export const createUserReq = user => axios1.post(`admin/login`, user);

export const getAdminBookReq = user => axios1.get(`admin/books`);
export const getClientaBookReq = (id) => axios1.get(`/books/${id}`);
export const getClientBookReq = user => axios1.get(`books/`);

export const createCarrito = form => axios1.post(`carrito`, form);

export const loginReq = user => axios1.post(`admin/login`, user);
/* 
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

export const getAdminBookReq = user => axios.get(`${ipBack}/admin/books`);
export const getClientaBookReq = (id) => axios.get(`${ipBack}/books/${id}`);
export const getClientBookReq = user => axios.get(`${ipBack}/books/`);

export const createCarrito = form => axios.post(`${ipBack}/carrito`, form);

export const loginReq = user => axios.post(`${ipBack}/admin/login`, user); */

