const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const booking = async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;

      const newBooking = new Booking(req.body);
      await newBooking.save();

      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();

      res.send("Your booking is successful");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { booking, getAllBookings };
