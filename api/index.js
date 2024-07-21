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
  .connect(
    "mongodb://mehdip:mehdipp2@ac-vst1tpj-shard-00-00.11p19ym.mongodb.net:27017,ac-vst1tpj-shard-00-01.11p19ym.mongodb.net:27017,ac-vst1tpj-shard-00-02.11p19ym.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-2bfnmi-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",
    {
      //the new conenction to mogodb is parsed correctly
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
      pass: "dmdj nyzb rfbk ovod",
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
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to the verifyemail
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //check if password exist
    if (user.password !== password) {
      return res.status(401).json({ message: "Inalid password" });
    }
    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
