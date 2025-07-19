const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
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
      const value = jwt.verify(token, process.env.JWT_KEY);
      // console.log("value", value);

      if (value.role == "admin") {
        req.decode = value;
        next();
      } else {
        res.status(422).send({
          message: "Must be an Admin"
        });
      }
    } else {
      res.status(422).send({
        message: "Invalid authentication scheme",
      });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = isAdmin;
