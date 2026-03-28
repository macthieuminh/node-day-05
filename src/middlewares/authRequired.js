const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");
const userModel = require("../models/user.model");

const authRequired = async (req, res, next) => {
    const accessToken = req.headers.authorization
        ?.replace("Bearer", "")
        ?.trim();
    const payload = jwt.verify(accessToken, secret);

    if (payload.exp < Date.now()) {
        return res.error("Unthorized", 401);
    }
    const currentUser = userModel.findOne(payload.sub);
    req.user = currentUser;

    next();
};
module.exports = authRequired;
