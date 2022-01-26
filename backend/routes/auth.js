const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create A User Using POST Request. No login required
router.post(
  "/createUser",
  body("name", "Enter a valid name").isLength({ min: 5 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 5 }),
  async (req, res) => {
    //If there are any error then return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({
        nice: "nice",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
module.exports = router;
