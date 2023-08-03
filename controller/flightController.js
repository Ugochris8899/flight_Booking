const flightModel = require("../model/flightModel");
const cloudinary = require('../utilities/cloudinary')
const fs = require("fs");
const validator = require('fastest-validator')


const bookFlight = async (req, res) => {
    try {
        const { priceStandard, priceFlex,duration,airlineName, } = req.body;
        const imageUrls = []
        const publicIds = []
        // checks if the user is passing an image 
        if (req.files && req.files.airlineLogo.length > 1) {
            // iterates over the images being uploaded and get their paths
            for (const image of req.files.airlineLogo) {
                // uploads the images to the cloudinary storage
                const file = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'Trippy' });
                //   pushes the image urls and public ids into the arrays created above
                imageUrls.push(file.secure_url);
                publicIds.push(file.public_id);
            }
        } else {
            const file = await cloudinary.uploader.upload(
                req.files.airlineLogo.tempFilePath
            )
            imageUrls.push(file.secure_url);
                publicIds.push(file.public_id);
        }
        const flight = new flightModel({
            priceStandard,
            priceFlex,
            duration,
            airlineName,
            airlineLogo: imageUrls,
            public_id: publicIds
        })

        // validate users input using the fastest-validtor
        const validateSchema = {
            priceStandard: { type: "number", optional: false, min: 3, max: 9999000000 },
            priceFlex: { type: "number", optional: false, min: 3, max: 9999000000 },
            duration: { type: "number", optional: false, min: 3, max: 9999000000 },
            airlineName: { type: "string", optional: false, min: 4, max: 50 },
            airlineLogo: { type: "array", items: "string", optional: false }
        }
        const v = new validator();
        const validation = v.validate(req.body, validateSchema)
        if (!validation) {
            res.status(400).json({
                message: 'Error trying to validate',
                Error: validation[0].message
            })
            return;
        }

        // save  the corresponding input into the database
        const savedFlight = await flight.save()
        if (!savedFlight) {
            res.status(400).json({
                message: 'flight not created'
            })
        } else {
            res.status(201).json({
                message: 'flight created successfully',
                data: savedFlight
            })
        }
    } catch (error) {
        res.status(500).json({
            Error: error.message
        })
    }
}




// Get all flights
const getAllFlights = async (req, res) => {
    try {
        const allFlights = await flightModel.find()
        if (allFlights.length === null) {
            res.status(200).json({
                message: 'There are no flights in this databse'
            })
        } else {
            res.status(200).json({
                message: `List of all flights in this database`,
                data: allFlights,
                totalFlights: `The total number of flights are ${allFlights.length}`
            })
        }
    } catch (error) {
        res.status(500).json({
            Error: error.message
        })
    }
}

// get a flight
const getOneFlight = async(req, res) =>{
    try {
        const flight = await flightModel.findById(req.params.id);
        if(!flight) {
            res.status(400).json({
                message: "No user found with this id."
            })
        } else{
            res.status(200).json({
                message: "Flight Information displaying",
                data: flight
            })
        }
       
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



// const flightUpdate = async (req, res) => {
//     try {
//       const flightId = req.params.id;
//       const flight = await flightModel.findById(flightId);
  
//       if (!flight) {
//         return res.status(404).json({
//           message: `flight with id: ${flightId} not found`,
//         });
//       }
  
//       const { airlineName, priceStandard,priceFlex,duration  } = req.body;
//       const data = {
//         airlineName: airlineName || flight.airlineName,
//         priceStandard: priceStandard || flight.priceStandard,
//         priceFlex: priceFlex || flight.priceFlex,
//         duration: duration || flight.duration
//       };
  
//       // Handle image update
//       if (req.files && req.files.airlineLogo) {
//         const updatedImageUrls = [];
//         const updatedPublicIds = [];
  
//         // Delete existing images in Cloudinary
//         for (const publicId of flight.public_id) {
//           await cloudinary.uploader.destroy(publicId);
//         }
  
//         // Upload new images and store their URLs and public IDs
//         for (const image of req.files.airlineLogo) {
//             const file = await cloudinary.uploader.upload(image.tempFilePath, { folder: 'Trippy' });
//           updatedImageUrls.push(file.secure_url);
//           updatedPublicIds.push(file.public_id)

//         }
  
//         // Replace the image URLs and public IDs with the updated ones
//         data.images = updatedImageUrls;
//         data.public_id = updatedPublicIds;
//       }
  
//       const updatedFlight = await flightModel.findByIdAndUpdate(flightId, data, { new: true });
  
//       if (updatedFlight) {
//         res.status(200).json({
//           message: `flight successfully updated`,
//           data: updatedFlight,
//         });
//       } else {
//         res.status(400).json({
//           message: 'Can not update flight',
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         Error: error.message,
//       });
//     }
//   };


const deleteFlight = async (req, res) => {
    try {
        const flightId = req.params.id
        const flight = await flightModel.findById(flightId)
        if (!flight) {
            res.status(404).json({
                message: `flight with id: ${flightId} not found`
            })
        } else {
            for (const publicId of flight.public_id) {
                await cloudinary.uploader.destroy(flightId);
              }
            const deletedFlight = await flightModel.findByIdAndDelete(flightId)
            if (deletedFlight) {
                res.status(200).json({
                    message: `flight successfully deleted`,
                    data: deletedFlight
                })
            } else {
                res.status(400).json({
                    message: 'Can not delete flight'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            Error: error.message
        })
    }
}







module.exports = {
    bookFlight,
    getAllFlights,
    getOneFlight,
    flightUpdate,
    deleteFlight
}