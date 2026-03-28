const pool = require("../config/database");

const converModel = {
  async findAll(user) {
    const query = "select * from conversations where participant_ids = ? ";

    const [rows] = await pool.execute(query, user);
    return rows;
  },
  async findOne(id) {
    const [rows] = await pool.execute(
      "select * from conversations where id = ?",
      [id],
    );
    return rows[0];
  },
  async create(name, type, participant_ids) {
    let query =
      "insert into conversations (created_by, name, type) values (?,?,?)";
    const values = [];
    values.push(participant_ids, name, type);

    const [{ insertId }] = await pool.execute(query, values);
    return insertId;
  },
  async addUser(conversation_id, user_id) {
    let query =
      "insert into conversation_participants (conversation_id, user_id) values (?,?)";
    const values = [];
    values.push(conversation_id, user_id);

    const [{ insertId }] = await pool.execute(query, values);
    return insertId;
  },
  async isGroup(conversation_id) {
    const [rows] = await pool.execute(
      "select * from conversations where id = ? and type = 'group'",
      [conversation_id],
    );
    return rows.length > 0;
  },
};

module.exports = converModel;
