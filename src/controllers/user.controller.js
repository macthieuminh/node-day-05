const userModel = require("../models/user.model");

const getAll = (_, res) => {
    const users = userModel.findAll();
    res.send(users);
};

const getOne = (req, res) => {
    const id = +req.params.id;
    const user = userModel.findOne(id);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send("Comment not found");
    }
};
const create = async (req, res) => {
    const { email, password } = req.body;
    const insertId = await userModel.create(email, password);

    const user = {
        id: insertId,
    };
    res.success(user, 201);
};
module.exports = { getAll, getOne, create };
