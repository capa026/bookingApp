import User from "../models/User.js"; //Import the model of the user
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/errors.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10); //Create a salt string
    const hash = bcrypt.hashSync(req.body.password, salt); //Hash de password with the salt

    //Create a new User, passing the parameters
    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });

    //Save the user
    await newUser.save();
    res.status(200).send("User created successfully"); //Send a message
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    //Get the user from the database
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not Found")); //If the user is not found, throw an error

    //Verify that the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if the password is wrong, throw an error
    if (!isPasswordCorrect)
      return next(createError(400, "Password or Username incorrect"));

    //Create a token to store it in a coockie
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    //Destructure the user data to separate the sensitive information. (password and isAdmin)
    const { password, isAdmin, ...props } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true }) //Create the cookie
      .status(200) //On status success
      .json({ ...props }); //Send the rest of the destructured data of the user, to the app
  } catch (error) {
    next(error);
  }
};
