const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    ProductImage:{
        data:Buffer,
        contentType: String
    },
    Price:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Availability:{
        type: String,
        require:true
    },
  
} ,{timestamps:true})
exports.Products = mongoose.model('products',ProductSchema);


