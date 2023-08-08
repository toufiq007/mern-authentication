import asyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import generateToken from "../utlis/generateToken.js";
// registerUser--> post request
// route --> /register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(401).json({
      success: false,
      message: "Email already registerd!!",
    });
  } else {
    const user = await User.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(202).json({
        success: true,
        message: "User created successfully!!",
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(204).json({
        message: "something went wrong.user not created",
      });
    }
  }
});

// authUser--> post request
// route --> /auth

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.checkPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      success: true,
      message: "user logged in successfully!!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid Email or password!!!",
    });
  }
});

// logoutUser--> post request
// route --> /logout

const logOutUser = asyncHandler(async (req, res) => {
  // one way to destrow cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({
    success: true,
    message: "logged out successfully",
  });
});

// getUserProfile--> get request
// route --> /getUser
const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.status(201).json({
    success: true,
    message: "Users Profile",
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
});

// updateUser--> put request
// route --> /updateUser

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(201).json({
      success: true,
      message: "Update user data successfully!!",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid user.Please login first",
    });
  }
});

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
