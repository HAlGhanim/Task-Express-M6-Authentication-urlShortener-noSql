const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = await passHash(password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
