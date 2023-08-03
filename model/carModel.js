const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    carName: 
    {
        type:String,
        required: true
    },
    personsPerCar: 
    {
        type:Number,
        required: true
    },
    transmission: 
    {
        type:String,
        required: true
    },
    ac: 
    {
        type:Boolean,
        required: true
    },
    price: 
    {
        type:Number,
        required: true
    },
    carImage: 
    {
        type:String,
        required: true
    }
   
    
})

const carModel = mongoose.model("Car", carSchema);

module.exports = carModel;