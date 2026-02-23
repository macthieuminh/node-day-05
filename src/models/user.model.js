const pool = require("../config/database");

const userModel = {
    async create(email, password) {
        let query = "insert into users (email,password) values (?,?)";
        const values = [];
        values.push(email, password);

        const [{ insertId }] = await pool.query(query, values);
        return insertId;
    },
    async findByEmailAndPassword(email, password) {
        let query = "select * from users where email = ? password = ?";
        const values = [];
        values.push(email, password);

        const [rows] = await pool.query(query, values);
        return rows[0];
    },
};

module.exports = userModel;
