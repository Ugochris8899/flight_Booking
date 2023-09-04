// const mongoose = require("mongoose");

// const flightSchema = new mongoose.Schema({
//     priceStandard: 
//     {
//         type:Number,
//         required: true,
//         // positive: true
//     },
//     priceFlex: 
//     {
//         type:Number,
//         required: true,
//         // positive: true
//     },
//     duration: 
//     {
//         type:String,
//         required: true,
//         // min: 1
//     },
//     airlineName: 
//     {
//         type:String,
//         required: true,
//         // min: 1
//     },
//     airlineLogo: 
//     [{
//         type:String,
//         required: true
//     }],
//     public_id: [{
//         type: String
//     }]
    
// }, {timestamps: true})

// const flightModel = mongoose.model("Flight", flightSchema);

// module.exports = flightModel;

const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: [true, "take off city is required."],
      lowercase: true,
    },
    to: {
      type: String,
      required: [true, "landing city is required."],
      lowercase: true,
    },
    depatureTime: {
      type: String,
      required: [true, "depature time is required."],
      lowercase: true,
    },
    arrivalTime: {
      type: String,
      required: [true, "arrival time is required."],
      lowercase: true,
    },
    priceStandard: {
      type: Number,
      required: [true, "Standard price is required."],
    },
    priceFlex: {
      type: Number,
      required: [true, "Flex price is required."],
    },
    airlineName: {
      type: String,
      required: [true, "airline name is required."],
    },
    airlineLogo: {
      type: String,
    },
  },
  { timestamps: true }
);

const flightModel = mongoose.model("Flight", flightSchema);

module.exports = flightModel;