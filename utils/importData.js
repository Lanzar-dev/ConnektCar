require("dotenv").config();
const fs = require("fs");
const Car = require("../models/carModel");
const connectDB = require("../config/db");

connectDB();

const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, "utf-8"));

const importData = async () => {
  try {
    await Car.create(cars);
    console.log("Data successfully imported");
    process.exit();
  } catch (error) {
    console.log(`ERROR ${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Car.deleteMany({});
    console.log("Data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(`ERROR ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
