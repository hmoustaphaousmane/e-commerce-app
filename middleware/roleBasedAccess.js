const roleBasedAccess = (role) => {
  console.log(role);
  
  return (req, res, next) => {
    console.log("role::", role, "decode role::", req.decoded.role);
    // console.log(req.decoded);
    // if (!req.decoded.role) {
    //   return res.send({
    //     message: "Role",
    //   });
    // }

    if (!role.includes(req.decoded.role)) {
      res.send({
        message: "You are not allowed to access this route.",
      });
      return;
    }
    next();
  };
};

module.exports = roleBasedAccess;
