import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import constants from "../constants/index.js";

export const register = async (req, res) => {
  const { email, password, firstName, lastName, companyName } = req.body;
  const { file } = req;
  if (!email) {
    return res.json({ status: 400, message: "Email is required!" });
  }

  if (!password) {
    return res.json({ status: 400, message: "Password is required!" });
  }

  if (!firstName) {
    return res.json({ status: 400, message: "First name is required!" });
  }

  if (!lastName) {
    return res.json({ status: 400, message: "Last name is required!" });
  }

  const user = await db.User.findOne({
    where: { email },
  }).catch((err) => {
    console.log(constants.ERR.DEFAULT, err);
  });

  if (user) {
    return res.json({ status: 200, message: "Email already exists!" });
  }

  const hashedPassword = await bcrypt
    .hash(password, parseInt(constants.BCRYPT_SALT_ROUND))
    .catch((err) => console.log(constants.ERR.DEFAULT, err));

  const newUser = new db.User({ email, password: hashedPassword });

  const savedUser = await newUser.save().catch((err) => {
    console.log(constants.ERR.DEFAULT, err);
  });

  if (savedUser) {
    const newUserProfile = new db.UserProfile({
      firstName,
      lastName,
      companyName,
      userId: savedUser.id,
    });

    const savedUserProfile = await newUserProfile.save().catch((err) => {
      console.log(constants.ERR.DEFAULT, err);
    });

    if (savedUserProfile)
      return res.json({ status: 200, message: "Thank for registering user!" });
    else {
      return res.json({
        status: 500,
        message: "Can not register user at the moment!",
      });
    }
  } else {
    return res.json({
      status: 500,
      message: "Can not register user at the moment!",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({ status: 400, message: "Email is required!" });
  }
  if (!password) {
    return res.json({ status: 400, message: "Password is required!" });
  }
  const user = await db.User.findOne({ where: { email } }).catch((err) => {
    console.log(constants.ERR.DEFAULT, err);
  });
  if (!user) {
    return res.json({
      status: 403,
      message: "Email or password does not match!",
    });
  }
  const userProfile = await db.UserProfile.findOne({
    where: { userId: user.id },
  }).catch((err) => {
    console.log(constants.ERR.DEFAULT, err);
  });
  bcrypt.compare(password, user.password, (err, isSame) => {
    if (err) {
      return res.json({ status: 500, error: constants.ERR.DEFAULT + err });
    }
    if (isSame) {
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        constants.JWT_SECRET
      );
      if (userProfile) {
        return res.json({
          status: 200,
          message: "Welcome back!",
          token: jwtToken,
          userData: userProfile,
        });
      }
    } else {
      return res.json({
        status: 403,
        message: "Email or password does not match!",
      });
    }
  });
};

export const getProfile = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const accessToken = authorizationHeader.split(" ")[1];
  const decodedUser = jwt.verify(accessToken, constants.JWT_SECRET);
  const userProfile = await db.UserProfile.findOne({
    where: { userId: decodedUser.id },
  }).catch((err) => {
    console.log(constants.ERR.DEFAULT, err);
  });
  if (!userProfile) {
    res.json({
      status: 403,
      message: "Unauthorized!",
    });
  } else {
    res.json({
      status: 200,
      message: "Successfully!",
      userData: userProfile,
    });
  }
};
