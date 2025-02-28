const express = require('express');
const path = require('path');
const db =  require('./config/db');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config()

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join('assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/',require('./routes/AdminRoutes'));

app.listen(process.env.PORT,err=>console.log(err?err:"Server runing on http://localhost:"+process.env.PORT))