const User = require("../models/userModel");

//refactor later(JWT)
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(200).send(error);
  }
};

//refactor later(hash password)
const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { login, register };
