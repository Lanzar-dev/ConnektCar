const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

//refactor later(JWT)
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(200).send(error);
  }
};

//refactor later(token)
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { login, register };
