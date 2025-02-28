const mongoose = require('mongoose');
const env = require('dotenv').config();

// for offine database 
// mongoose.connect('mongodb://127.0.0.1:27017/BakendPanel');

// for online Database 
mongoose.connect(process.env.MONGODB_CONNECT_URI);

const db = mongoose.connection;

db.once('open',err=>console.log(err?err:"Mongodb connected successfully.."));

module.exports = db;