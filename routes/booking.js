const express = require("express");
const booking = require("../controllers/booking");
const router = express.Router();

router.post("/bookcar", booking);

module.exports = router;
