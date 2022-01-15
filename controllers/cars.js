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

const editCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();
    res.send("Car details updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carId });

    res.send("Car deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllCars, addCar, editCar, deleteCar };
