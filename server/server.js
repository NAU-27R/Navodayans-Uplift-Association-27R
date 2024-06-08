import express, { json } from "express";
import "dotenv/config";
import Razorpay from "razorpay";
import cors from 'cors';
import crypto from 'crypto';



import {authenticate} from './controller/authController.js'
import {createOrder, validateTransaction} from './controller/paymentController.js'
import { transactionList } from "./controller/transactionList.js";
import { memberList, isMember } from "./controller/memberController.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/isMember',authenticate,isMember)
app.get('/members',authenticate, memberList)
app.get('/transactions',authenticate,transactionList)

app.post('/order',authenticate, createOrder )
app.post('/validate',authenticate, validateTransaction)

app.listen(process.env.PORT | 3000, () => {
    console.log("Server Listening at Port: 3000");
});
