const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    hotelName: 
    {
        type:String,
        required: true
    },
    hotelRatings: 
    {
        type:Number,
        required: true
    },
    hotelReviews: 
    {
        type:Number,
        required: true
    },
    hotelCheckin: 
    {
        type:String,
        required: true
    },
    hotelCheckout: 
    {
        type:String,
        required: true
    },
    hotelLocation: 
    {
        type:String,
        required: true
    },
    price: 
    {
        type:Number,
        required: true
    },
    features: [ String],
    personsPerRoom: 
    {
        type:Number,
        required: true
    },
    
})

const hotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = hotelModel;