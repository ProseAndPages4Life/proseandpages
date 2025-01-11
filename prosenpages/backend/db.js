import {createPool} from 'mysql2/promise'
import { database } from './config.js';

export const pool = new createPool({
    host: 'localhost',
    user: 'root',
    password: "danewpassword",
    database: database
})
