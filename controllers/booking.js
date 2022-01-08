const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");

const booking = async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const car = await Car.findOne({ _id: req.body.car });
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);
    await car.save();

    res.send("Your booking is successful");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = booking;
