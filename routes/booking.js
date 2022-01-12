const express = require("express");
const { booking, getAllBookings } = require("../controllers/booking");
const router = express.Router();

router.post("/bookcar", booking);
router.get("/getallbookings", getAllBookings);

module.exports = router;
