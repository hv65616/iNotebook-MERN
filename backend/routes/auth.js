// importing the express
const express = require("express");

// importing the router from express
const router = express.Router();

// importing the User model from models folder
const User = require("../models/User");

// importing the express validator which is used to check whether the things are valid or not
const { body, validationResult } = require("express-validator");

// importing of bcrypt
// it is used to crypt the password or any sensitive information that you dont want anybody to seen it basically generates its hash value which is called salt
const bcrypt = require("bcryptjs");

// importing of jwt
// it is used to setup an authentication by generating an auth token which is given to user whenever he or she tries to access any confidential information first this token get verified them it allows
const jwt = require("jsonwebtoken");
const JWT = "inotebookauthentication";
const fetchuser = require("../middleware/fetchuser");

//Create A User Using POST Request. No login required
// Post request take path from which it being called and the handlers
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
      // Check whether the user with this email already exists or not
      let user = await User.findOne({ email: req.body.email });

      // if the user with already present email if found then it return the error
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // below 2 lines is converting the password into its salt value
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // using User Schema create a json of which consists user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // it used the id generated when user json is created the id generated there is call back and used here
      const data = {
        user: {
          id: user.id,
        },
      };

      // here the jwt use the sign function which will sign the data along with JWT and this gives the authtoken
      const authToken = jwt.sign(data, JWT);
      // res.json({
      //   user,
      // });

      // console logging the authtoken
      res.json({ authToken });
    } catch (error) {
      // if any error found catch will run and execute this part of code
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Creating an authentication for the user when he/she tries to login/
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter valid email credentials" });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter valid password credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Get loggedin user details using post
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
