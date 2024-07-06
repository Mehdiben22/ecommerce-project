const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://mehdip:mehdipp2@cluster0.11p19ym.mongodb.net/", {
    //the new conenction to mogodb is parsed correctly
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Error connecting mongodb", err);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send verificationemail to the user

const sendVerificationEmail = async (email, verificationToken) => {
  //create nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email service
    service: "gmail",
    auth: {
      user: "roxmaitre123@gmail.com",
      pass: "",
    },
  });

  //compose the email message
  const mailOption = {
    from: "amazon.com",
    to: email,
    subject: "Email verification",
    text: `Please click to the link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  //send the mail
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

//endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the email is already registred
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    //create new user
    const newUser = new User({ name, email, password });

    //generate and store the verificationtoken
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to the verifyemail
app.get("/verify/:token", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Email verification Failed" });
  }
});
