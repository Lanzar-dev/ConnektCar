const express = require("express");
const {
  getAllCars,
  addCar,
  editCar,
  deleteCar,
} = require("../controllers/cars");
const router = express.Router();

router.get("/getallcars", getAllCars);
router.post("/addcar", addCar);
router.put("/editcar", editCar);
router.post("/deletecar", deleteCar);

module.exports = router;
