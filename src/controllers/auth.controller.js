const AuthService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.register(email, password);
    res.success({ ...user, accessToken: token }, 201);
  } catch (error) {
    res.error(error.message, error.status || 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    res.success({ ...user, accessToken: token }, 200);
  } catch (error) {
    res.error(error.message, error.status || 401);
  }
};
module.exports = { register, login };
