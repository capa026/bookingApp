import jwt from "jsonwebtoken";
import { createError } from "./errors.js";

export const verifyToken = (req, res, next) => {
  const cookie = req.cookies.access_token; //Get the acces token from the request cookie

  if (!cookie) return next(createError(401, "You are not authenticated")); //If the cookie doesn't exist the show the error message

  //Verify the cookie and compare it with the token created in the dotenv file
  jwt.verify(cookie, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is invalid")); //If there's and error return it
    //If not, assign the user to the req.user variable to let the app access to it
    req.user = user;
    //Execute the next middleware
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
