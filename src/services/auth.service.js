const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");
const userModel = require("../models/user.model");

const AuthService = {
  async register(email, password) {
    // Kiểm tra email đã tồn tại
    const existing = await userModel.findByEmail(email);
    if (existing) {
      throw { status: 409, message: "Email already exists" };
    }

    // Tạo user
    const user = await userModel.create(email, password);

    // Tạo JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secret);

    return { user, token };
  },

  async login(email, password) {
    // Tìm user
    const user = await userModel.findByEmailAndPassword(email, password);
    if (!user) {
      throw { status: 401, message: "Invalid email or password" };
    }

    // Tạo JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secret);

    // Không trả password về client
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },
};

module.exports = AuthService;
