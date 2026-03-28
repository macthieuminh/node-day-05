const pool = require("../config/database");

const userModel = {
  async findAll() {
    const [rows] = await pool.execute("select * from users");
    return rows;
  },
  async findOne(id) {
    const [rows] = await pool.execute("select * from users where id = ?", [id]);
    return rows[0];
  },
  async findByEmailAndPassword(email, password) {
    let query = "select * from users where email = ? and password = ?";

    const [rows] = await pool.execute(query, [email, password]);
    return rows[0];
  },
  async findByEmail(email) {
    let query = "select * from users where email = ?";

    const [rows] = await pool.execute(query, [email]);
    return rows[0] || null;
  },
  async create(email, password) {
    let query = "insert into users (email,password) values (?,?)";

    const [{ insertId }] = await pool.execute(query, [email, password]);
    return insertId;
  },
};

module.exports = userModel;
