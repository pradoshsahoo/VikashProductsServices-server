const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const itemrouters = require('./ProductsAndServices');
const app = express();

app.use(express.json());
app.use(cors());
app.use(itemrouters);


app.listen(4001, ()=>{
    console.log("started at port 4000");
});