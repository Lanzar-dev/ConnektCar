require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const carRoutes = require("./routes/cars");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/booking");
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Api running");
//   });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
