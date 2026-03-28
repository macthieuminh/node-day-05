const converService = require("../services/conversation.service");

const getAll = (req, res) => {
  const user = req.user;

  const conversations = converService.findAll(user);
  res.send(conversations);
};

const create = async (req, res) => {
  try {
    const { name, type, participant_ids } = req.body;
    if (type !== "group" && type !== "direct") {
      return res.status(400).send("Type is invalid");
    }
    if (!Array.isArray(participant_ids)) {
      return res.status(400).send("Participant Ids not Array");
    }
    const insertId = await converService.create(name, type, participant_ids);
    const conversation = { id: insertId };
    res.success(conversation, 201);
  } catch (error) {
    res.error(error.message);
  }
};
const addUserToConversation = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const insertId = await converService.addUser(id, user_id);
    const conversation = {
      id: insertId,
      params: id,
    };
    res.success(conversation, 201);
  } catch (err) {
    res.error(err);
  }
};
const sendMessages = async (req, res) => {
  const { email, password } = req.body;
  const insertId = await converService.create(email, password);

  const conversation = {
    id: insertId,
  };
  res.success(conversation, 201);
};
const getMessages = async (req, res) => {
  const { email, password } = req.body;
  const insertId = await converService.create(email, password);

  const conversation = {
    id: insertId,
  };
  res.success(conversation, 201);
};

module.exports = {
  getAll,
  create,
  addUserToConversation,
  sendMessages,
  getMessages,
};
