require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../schema/user");

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    res.status(409).send({
      message: "Email already used",
    });
    return;
  }

  // hash the password before saving it
  const hashedPassword = bcrypt.hashSync(password, 10);
  // console.log(fullName, email, hashedPassword, role);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).send({
    message: "User created successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userDetails = await User.findOne({ email });
  console.log(userDetails);

  if (!userDetails) {
    res.status(400).send({
      message: "Invalid credentials",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: userDetails.id,
      email: userDetails.email,
      role: userDetails.role,
    },
    process.env.JWT_KEY
  );

  res.send({
    message: "User logged in successfully",
    userDetail: {
      fullName: userDetails.fullName,
      email: userDetails.emil,
    },
    token,
  });
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.decoded.userId).select(
      "-_id fullName email role"
    );
    console.log(user);

    if (!user || user.email !== req.decoded.email) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    res.send(user);
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  profile,
};
