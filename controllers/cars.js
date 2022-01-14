const Car = require("../models/carModel");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.send("Car added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllCars, addCar };
