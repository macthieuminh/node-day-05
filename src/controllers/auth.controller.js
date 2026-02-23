const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const register = async (req, res) => {
    const { email, password } = req.body;
    const insertId = await userModel.create(email, password);

    const newUser = {
        id: insertId,
        email,
    };
    res.success(newUser, 201);
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findByEmailAndPassword(email, password);
    if (!user) {
        return res.error("Unauthorized", 401);
    }
    res.success(user, 201);
};

module.exports = { register, login };
