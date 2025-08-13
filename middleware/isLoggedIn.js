const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).send({
        message: "No token supplied",
      });
      return;
    }

    const [scheme, token] = req.headers.authorization.split(" ");
    // console.log(scheme, token);

    if (scheme.toLowerCase() == "bearer") {
      const decodeValue = jwt.verify(token, process.env.JWT_KEY);
      // console.log("Decode value", decodeValue);

      req.decoded = decodeValue;
      next();
    } else {
      res.status(422).send({
        message: "Invalid authentication scheme",
      });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = isLoggedIn;
