require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const carRoutes = require("./routes/cars");
const app = express();

connectDB();

app.use(express.json());

app.use("/api/cars", carRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
