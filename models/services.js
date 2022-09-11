const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    TypeOfService:{
        type: String,
        required: true
    },
    serviceImage:{
        data:Buffer,
        contentType: String
    },
    Cost:{
        type: String,
        required: true
    },
    Servicedescription:{
        type: String,
        required: true
    },
    Availability:{
        type: String,
        require:true
    },
} ,{timestamps:true})
exports.Services = mongoose.model('services',ServiceSchema);
