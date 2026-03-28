const express = require("express");
const router = express.Router();

const converController = require("../controllers/conversation.controller");
const authRequired = require("../middlewares/authRequired");

router.post("/", authRequired, converController.create);
router.get("/", authRequired, converController.getAll);

router.post(
  "/:id/participants",
  authRequired,
  converController.addUserToConversation,
);

router.post("/:id/messages", converController.sendMessages);
router.get("/:id/messages", converController.getMessages);

module.exports = router;
