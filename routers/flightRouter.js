const express = require("express");


const {bookFlight,getAllFlights,getOneFlight,flightUpdate, deleteFlight} = require("../controller/flightController");
const router = require("./userRouter");

const routers = express.Router();

router.post("/flight", bookFlight);
router.get("/flight", getAllFlights);
router.get("/flight/:id", getOneFlight);
router.put("/flight/:id", flightUpdate);
router.delete("/flight/:id", deleteFlight);

module.exports = router;