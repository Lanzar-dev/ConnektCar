const express = require("express");
const { getAllCars, addCar } = require("../controllers/cars");
const router = express.Router();

router.get("/getallcars", getAllCars);
router.post("/addcar", addCar);

module.exports = router;
