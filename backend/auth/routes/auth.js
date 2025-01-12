const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("./verifyToken");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const router = require("express").Router();

router.post("/register", async (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
      const savedUser=await user.save();
      res.send({'user':user._id});
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/login", async (req, res) => {
  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email Not Found");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Incorrect Password");
  }
  const token = jwt.sign({ _id: user._id }, process.env.Token_Secret);
  res.header("auth_token", token).send({ token: token,user:user });
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = User.findById(req.user._id);
    res.json({ response: "Success" });
  } catch (e) {
    res.send({ message: "Error in fetching User" });
  }
});

module.exports = router;
