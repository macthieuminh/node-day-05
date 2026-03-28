const converModel = require("../models/conversation.model");
const userModel = require("../models/user.model");

const findAll = async (user) => {
  const conversations = await converModel.findAll(user);
  return conversations;
};
const createConversation = async (name, type, participant_ids) => {
  const conversation = await converModel.create({
    name,
    type,
    participant_ids,
  });

  return conversation;
};

const addUser = async (converId, userId) => {
  const isGroup = await converModel.isGroup(converId);
  const isUser = await converModel.findOne(userId);

  if (isGroup && isUser) {
    const conversation = await userModel.addUser(converId, userId);
    return conversation;
  }

  return null;
};

module.exports = {
  findAll,
  createConversation,
  addUser,
};
