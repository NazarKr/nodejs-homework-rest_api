const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { SECRET_KEY, BASE_URL } = process.env;

const { HttpError, sendEmail } = require("../helpers/index");
const { ctrlWrapper } = require("../utils");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/auth/verify/${verificationToken}" >Click here to verify your email</a>`,
  };

try {
  await sendEmail(verifyEmail);
} catch (error) {
  console.log(error);
  throw HttpError(500, "Failed to send verification email");
}

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    message: "<h1>Open Email for verify</h1>",
  });
};

const verify = async(req, res) => {
  const { verificationToken } = req.params;

  // console.log("verificationToken:", verificationToken);
  
  const user = await User.findOne({ verificationToken });

  // console.log("User:", user);
  
  if (!user) {
    console.log("User not found:", verificationToken);//
    throw HttpError(404, "Email not found");
  }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
  
  res.json({
    message: "Email verify success"
  })
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email alredy verify")
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Email resend success"
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });


  res.json({
    user,
    email,
  });

  console.log(user);
}; 

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    massage: "Logout success!"
  })
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, { subscription }, {new: true,});

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);

  console.log(subscription);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).write(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatar", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};