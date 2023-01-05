const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("../validator/validations");
const userModel = require("../models/userModel")

//====================================================================

const authentication = function (req, res, next) {
  const authHeader = req.headers.token || req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

      if (err)
        return res.status(401).json({ status: false, message: "Token is not valid!" });

      req.user = user;
      next();
    });
  }
  else {
    return res.status(401).json({ status: false, message: "You are not authenticated!" });
  }
};

//====================================================================

const authorization = async (req, res, next) => {
  if (!isValidObjectId(req.params.userId))
    return res.status(400).send({ status: false, message: "userId is not valid" });


  let user = await userModel.findById(req.params.userId);

  if (!user) {
    return res.status(404).send({ status: false, message: "user does not exists" });
  }

  verifyToken(req, res, () => {
    if (req.user.userId === req.params.userId) {
      next();
    } else {
      return res.status(403).json({ status: false, message: "You are not authorized!" });
    }
  });
};

//====================================================================

module.exports = { authentication, authorization };