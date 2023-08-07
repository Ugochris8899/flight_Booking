// const express = require("express");


// const {bookFlight,getAllFlights,getOneFlight,flightUpdate, deleteFlight} = require("../controller/flightController");
// const router = require("./userRouter");

// const routers = express.Router();

// router.post("/flight", bookFlight);
// router.get("/flight", getAllFlights);
// router.get("/flight/:id", getOneFlight);
// router.put("/flight/:id", flightUpdate);
// router.delete("/flight/:id", deleteFlight);

// module.exports = router;

const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const {
  createFlight,
  findFlights,
  findOneFlight,
  deleteFlight,
} = require("../controller/flightController");

const router = express.Router();

router.post("/create-flight", userAuth, isAdmin, createFlight);
router.get("/find-flights", findFlights);
router.get("/flight/:flightId", findOneFlight);
router.delete("/delete-flight/:flightId", userAuth, isAdmin, deleteFlight);

module.exports = router;