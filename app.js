const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const router= require("./routes/pages");
const app = express();
const cookieParser = require('cookie-parser');
const public = path.join(__dirname,'./routes');
const db = require("./routes/connection");

dotenv.config({path: './.env'})

app.use(express.static(public));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json());

app.set('view engine', 'hbs');  

app.use('/', require('./routes/pages'));

app.use('/auth',require('./routes/auth'));

app.listen('4000', () =>{
    console.log('server started on port 4000');
});