const express = require("express");
const protect = require("../middleware/authMiddleWare");

const {
  createTodo,
  getAllTodos,
  editTodo,
  deleteATodo,
  deleteAllTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.route("/create").post(protect, createTodo);
router.route("/fetchalltodos").get(protect, getAllTodos);
router.put("/edit/:todoId", protect, editTodo);
router.delete("/delete/:todoId", protect, deleteATodo);
router.delete("/deleteAll/", protect, deleteAllTodo);

module.exports = router;
