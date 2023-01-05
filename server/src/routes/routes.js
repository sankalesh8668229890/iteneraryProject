const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
const itineraryController = require("../controller/itineraryController")
const {authorization,authentication} = require("../middleware/auth")

// User APIs
router.post("/register", userController.registerUser)

router.post("/login", userController.login)

// Itinerary APIs
router.post("/createItinerary",authentication, itineraryController.createItinerary)

router.put("/updateItinerary/:id",authentication,authorization, itineraryController.updateItinerary)

router.get("/getItinerary/:id", itineraryController.getItinerary)

router.get("/getSummary/:id", authentication,itineraryController.getSummary)

router.put("/addActivity/:id", itineraryController.addActivity)

module.exports = router