const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: 
    {
        type:String,
        required: true
    },
    city: 
    {
        type:String,
        required: true
    },
    country: 
    {
        type:String,
        required: true
    },
    images: 
    [{
        type:String,
        required: true
    }],
    ratings: 
    {
        type:Number,
        required: true
    },
    information: 
    {
        type:String,
        required: true
    },
    review: 
    {
        type:String,
        required: true
    },
    amenities: [ String]
   
    
})

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;