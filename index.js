import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const port = 5000
console.log(port);
import { db } from './config/db_connection.js';
import router from './routes/api/indexAPI.js';

const app = express(); // instance of express server

//middlewares
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routing
app.use('/', router);

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Server in listening on ${port}`);
  })


